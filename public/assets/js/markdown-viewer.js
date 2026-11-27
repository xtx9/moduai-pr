// 파일명: public/assets/js/markdown-viewer.js
/**
 * moduai-pr 마크다운 문서 & 강의 뷰어 모듈
 * 1) content/navigation.json을 읽어 좌측 사이드바 자동 구성
 * 2) URL Hash(#경로)를 감지하여 비동기로 .md 파일 Fetch
 * 3) Marked.js를 통해 HTML로 실시간 파싱 및 highlight.js 문법 강조
 * 4) DiagramRenderer를 호출해 Mermaid 다이어그램 렌더링
 * 5) 본문 H2, H3 헤딩을 수집하여 우측 온페이지 목차(TOC) 자동 생성
 * 6) 이전/다음 문서 네비게이션 버튼 연동
 */

class MarkdownViewer {
  constructor() {
    this.navData = null;
    this.allDocsList = []; // 순차 네비게이션(이전/다음)을 위한 플랫 목록
    this.currentDocPath = '';
    
    this.sidebarContainer = document.getElementById('docs-sidebar-menu');
    this.contentContainer = document.getElementById('docs-markdown-body');
    this.tocContainer = document.getElementById('docs-toc-list');
    this.paginationContainer = document.getElementById('docs-pagination');
  }

  /**
   * 뷰어 초기화
   */
  async init() {
    this.setupMarked();
    DiagramRenderer.init();

    // 1. 사이드바 네비게이션 데이터 로드
    await this.loadNavigation();

    // 2. 브라우저 해시 변경 리스너 등록
    window.addEventListener('hashchange', () => this.handleHashChange());

    // 3. 첫 페이지 로드 (해시가 있으면 해당 문서, 없으면 첫 번째 문서)
    this.handleHashChange();
  }

  /**
   * Marked.js 파서 커스텀 옵션 설정
   */
  setupMarked() {
    if (typeof marked === 'undefined') return;

    marked.setOptions({
      gfm: true,
      breaks: true,
      highlight: (code, lang) => {
        // mermaid는 diagram-renderer에서 따로 파싱하므로 코드 원형 보존
        if (lang === 'mermaid') {
          return code;
        }
        if (typeof hljs !== 'undefined' && lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(code, { language: lang }).value;
          } catch (e) {
            console.error('hljs highlight error:', e);
          }
        }
        return code;
      }
    });
  }

  /**
   * content/navigation.json 로드 및 사이드바 렌더링
   */
  async loadNavigation() {
    try {
      const res = await fetch('content/navigation.json');
      if (!res.ok) throw new Error('네비게이션 설정 파일을 찾을 수 없습니다.');
      this.navData = await res.json();
      
      this.renderSidebar(this.navData);
    } catch (err) {
      console.error('네비게이션 로드 실패:', err);
      if (this.sidebarContainer) {
        this.sidebarContainer.innerHTML = `<li style="color:#f87171; padding: 10px;">설정 로드 실패</li>`;
      }
    }
  }

  /**
   * 좌측 사이드바 DOM 생성
   * @param {Object} navData - 네비게이션 카테고리 데이터
   */
  renderSidebar(navData) {
    if (!this.sidebarContainer) return;
    this.sidebarContainer.innerHTML = '';
    this.allDocsList = [];

    navData.categories.forEach(cat => {
      // 카테고리 제목
      const titleEl = document.createElement('div');
      titleEl.className = 'sidebar-title';
      titleEl.textContent = cat.title;
      this.sidebarContainer.appendChild(titleEl);

      // 카테고리 항목 리스트
      const ulEl = document.createElement('ul');
      ulEl.className = 'sidebar-menu';

      cat.items.forEach(item => {
        this.allDocsList.push(item);

        const li = document.createElement('li');
        const a = document.createElement('a');
        a.className = 'sidebar-link';
        a.href = `#${item.path}`;
        a.dataset.path = item.path;
        a.innerHTML = `<span class="icon">${item.icon || '📄'}</span> <span>${item.title}</span>`;
        
        li.appendChild(a);
        ulEl.appendChild(li);
      });

      this.sidebarContainer.appendChild(ulEl);
    });
  }

  /**
   * 해시 변경 처리 (라우팅)
   */
  handleHashChange() {
    let hash = window.location.hash.replace(/^#/, '').trim();
    
    // 해시가 비어있으면 목록의 첫 번째 문서로 이동
    if (!hash && this.allDocsList.length > 0) {
      hash = this.allDocsList[0].path;
      window.location.hash = `#${hash}`;
      return;
    }

    if (hash) {
      this.loadDocument(hash);
    }
  }

  /**
   * 마크다운 파일 비동기 Fetch 및 렌더링
   * @param {string} docPath - content/ 하위의 상대 경로 (확장자 .md 생략 가능)
   */
  async loadDocument(docPath) {
    if (!this.contentContainer) return;

    // 경로 정규화 (.md 추가)
    const filePath = docPath.endsWith('.md') ? docPath : `${docPath}.md`;
    const fullUrl = `content/${filePath}`;

    this.currentDocPath = docPath;
    this.updateActiveSidebarLink(docPath);

    // 로딩 인디케이터 표시
    this.contentContainer.innerHTML = `
      <div class="docs-loader">
        <div class="spinner"></div>
        <p>문서를 불러오는 중입니다...</p>
      </div>
    `;

    try {
      const res = await fetch(fullUrl);
      if (!res.ok) throw new Error(`문서를 불러올 수 없습니다. (${res.status})`);
      const markdownText = await res.text();

      // 마크다운 파싱 및 본문 삽입
      const parsedHtml = marked.parse(markdownText);
      this.contentContainer.innerHTML = parsedHtml;

      // 헤딩 태그에 ID 부여 및 온페이지 목차(TOC) 생성
      this.generateTableOfContents();

      // Mermaid 다이어그램 렌더링
      await DiagramRenderer.renderAll(this.contentContainer);

      // 하단 이전/다음 문서 네비게이션 렌더링
      this.renderPagination(docPath);

      // 본문 상단으로 스크롤 이동
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err) {
      this.contentContainer.innerHTML = `
        <div style="padding: 40px; background: rgba(239,68,68,0.1); border: 1px solid #ef4444; border-radius: 8px;">
          <h2 style="color: #f87171; margin-bottom: 12px;">문서 로드 실패</h2>
          <p>${err.message}</p>
          <p style="margin-top: 10px; color: var(--text-dim);">요청 경로: <code>${fullUrl}</code></p>
        </div>
      `;
    }
  }

  /**
   * 활성화된 사이드바 링크 스타일 적용
   * @param {string} docPath 
   */
  updateActiveSidebarLink(docPath) {
    const allLinks = document.querySelectorAll('.sidebar-link');
    allLinks.forEach(link => {
      if (link.dataset.path === docPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /**
   * 본문의 H2, H3 헤딩을 수집하여 우측 목차(TOC) 구성
   */
  generateTableOfContents() {
    if (!this.tocContainer) return;
    this.tocContainer.innerHTML = '';

    const headings = this.contentContainer.querySelectorAll('h2, h3');
    if (headings.length === 0) {
      this.tocContainer.innerHTML = '<li style="color: var(--text-dim);">목차 없음</li>';
      return;
    }

    headings.forEach((heading, idx) => {
      // 앵커 ID 생성
      const anchorId = `section-${idx}-${heading.textContent.trim().toLowerCase().replace(/[^a-zA-Z0-9가-힣]/g, '-')}`;
      heading.id = anchorId;

      const li = document.createElement('li');
      li.className = `toc-item ${heading.tagName.toLowerCase() === 'h3' ? 'level-3' : 'level-2'}`;
      
      const a = document.createElement('a');
      a.href = `#${this.currentDocPath}`; // 해시 유지하면서 스크롤
      a.textContent = heading.textContent;
      a.addEventListener('click', (e) => {
        e.preventDefault();
        heading.scrollIntoView({ behavior: 'smooth' });
      });

      li.appendChild(a);
      this.tocContainer.appendChild(li);
    });
  }

  /**
   * 하단 이전 문서 / 다음 문서 네비게이션 버튼 생성
   * @param {string} currentPath 
   */
  renderPagination(currentPath) {
    if (!this.paginationContainer) return;
    this.paginationContainer.innerHTML = '';

    const currentIndex = this.allDocsList.findIndex(item => item.path === currentPath);
    if (currentIndex === -1) return;

    const prevDoc = currentIndex > 0 ? this.allDocsList[currentIndex - 1] : null;
    const nextDoc = currentIndex < this.allDocsList.length - 1 ? this.allDocsList[currentIndex + 1] : null;

    if (prevDoc) {
      const prevBtn = document.createElement('a');
      prevBtn.className = 'doc-pagination-btn prev';
      prevBtn.href = `#${prevDoc.path}`;
      prevBtn.innerHTML = `
        <span class="doc-pagination-label">이전 강의</span>
        <span class="doc-pagination-title">← ${prevDoc.title}</span>
      `;
      this.paginationContainer.appendChild(prevBtn);
    } else {
      // 빈 공간 보존용
      const emptyDiv = document.createElement('div');
      emptyDiv.style.flex = '1';
      this.paginationContainer.appendChild(emptyDiv);
    }

    if (nextDoc) {
      const nextBtn = document.createElement('a');
      nextBtn.className = 'doc-pagination-btn next';
      nextBtn.href = `#${nextDoc.path}`;
      nextBtn.innerHTML = `
        <span class="doc-pagination-label">다음 강의</span>
        <span class="doc-pagination-title">${nextDoc.title} →</span>
      `;
      this.paginationContainer.appendChild(nextBtn);
    }
  }
}

// 전역 인스턴스화
window.MarkdownViewer = MarkdownViewer;
