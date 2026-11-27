// 파일명: public/assets/js/markdown-viewer.js
/**
 * moduai-pr 사업·개발 기록 마크다운 뷰어 모듈
 * 기준: docs/스타일-가이드.md (ChatGPT 라이트 모드 디자인 시스템)
 * 1) content/navigation.json 기반 사이드바 자동 구성
 * 2) 사이드바 접기/펼치기(토글) 및 localStorage 상태 저장
 * 3) Marked.js 파싱 및 highlight.js 코드 문법 강조
 * 4) 코드 블록 상단 언어 헤더 및 원클릭 복사(Copy) 기능 탑재
 * 5) DiagramRenderer 라이트 테마 다이어그램 렌더링
 * 6) 본문 H2, H3 헤딩 기반 우측 TOC 생성 및 스크롤 감지
 */

class MarkdownViewer {
  constructor() {
    this.navData = null;
    this.allDocsList = [];
    this.currentDocPath = '';
    
    this.sidebarElement = document.querySelector('.docs-sidebar');
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
    this.setupSidebarToggle();

    await this.loadNavigation();

    window.addEventListener('hashchange', () => this.handleHashChange());
    this.handleHashChange();
  }

  /**
   * 사이드바 접기/펼치기 및 로컬 스토리지 상태 복원
   */
  setupSidebarToggle() {
    const toggle = document.querySelector('.sidebar-toggle-btn');
    const backdrop = document.getElementById('docs-backdrop');
    if (!this.sidebarElement || !toggle) return;

    const mobile = () => window.matchMedia('(max-width: 768px)').matches;
    const setOpen = (open) => {
      this.sidebarElement.classList.toggle('collapsed', !open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? '사이드바 닫기' : '사이드바 열기');
      toggle.title = open ? '사이드바 닫기' : '사이드바 열기';
      if (backdrop) backdrop.classList.toggle('visible', open && mobile());
      document.body.classList.toggle('sidebar-open', open && mobile());
      if (!mobile()) localStorage.setItem('moduai-sidebar-collapsed', String(!open));
    };

    setOpen(mobile() ? false : localStorage.getItem('moduai-sidebar-collapsed') !== 'true');
    toggle.addEventListener('click', () => {
      setOpen(this.sidebarElement.classList.contains('collapsed'));
    });
    backdrop?.addEventListener('click', () => setOpen(false));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && mobile()) setOpen(false);
    });
    this.sidebarContainer?.addEventListener('click', (event) => {
      if (event.target.closest('.sidebar-link') && mobile()) setOpen(false);
    });
    window.addEventListener('resize', () => {
      setOpen(mobile() ? false : localStorage.getItem('moduai-sidebar-collapsed') !== 'true');
    });
  }

  /**
   * Marked.js 파서 설정
   */
  setupMarked() {
    if (typeof marked === 'undefined') return;

    marked.setOptions({
      gfm: true,
      breaks: true,
      highlight: (code, lang) => {
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
   * navigation.json 로드
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
        this.sidebarContainer.innerHTML = `<li style="color:#ef4444; padding: 10px;">설정 로드 실패</li>`;
      }
    }
  }

  /**
   * 사이드바 메뉴 렌더링
   * @param {Object} navData 
   */
  renderSidebar(navData) {
    if (!this.sidebarContainer) return;
    this.sidebarContainer.innerHTML = '';
    this.allDocsList = [];

    navData.categories.forEach(cat => {
      const titleEl = document.createElement('div');
      titleEl.className = 'sidebar-title';
      titleEl.textContent = cat.title;
      this.sidebarContainer.appendChild(titleEl);

      const ulEl = document.createElement('ul');
      ulEl.className = 'sidebar-menu';

      cat.items.forEach(item => {
        this.allDocsList.push(item);

        const li = document.createElement('li');
        const a = document.createElement('a');
        a.className = 'sidebar-link';
        a.href = `#${item.path}`;
        a.dataset.path = item.path;
        a.textContent = item.title;
        
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
    
    if (!hash && this.allDocsList.length > 0) {
      hash = this.allDocsList[0].path;
      window.location.hash = `#${hash}`;
      return;
    }

    if (hash) {
      this.loadDocument(hash);
      
      if (window.innerWidth <= 768 && this.sidebarElement) {
        this.sidebarElement.classList.add('collapsed');
      }
    }
  }

  /**
   * 마크다운 문서 비동기 로드 및 화면 렌더링
   * @param {string} docPath 
   */
  async loadDocument(docPath) {
    if (!this.contentContainer) return;

    const filePath = docPath.endsWith('.md') ? docPath : `${docPath}.md`;
    const fullUrl = `content/${filePath}`;

    this.currentDocPath = docPath;
    this.updateActiveSidebarLink(docPath);

    this.contentContainer.innerHTML = `
      <div class="docs-loader">
        <div class="spinner"></div>
        <p style="font-size: 0.88rem; color: var(--text-dim);">문서를 불러오는 중입니다...</p>
      </div>
    `;

    try {
      const res = await fetch(fullUrl);
      if (!res.ok) throw new Error(`문서를 불러올 수 없습니다. (${res.status})`);
      const markdownText = await res.text();

      // 문서 관리용 메타데이터는 원본 Markdown에 유지하되 웹 화면에서는 숨깁니다.
      const displayMarkdown = markdownText
        .replace(/^>\s*(?:파일명|최종 수정일|분류):.*(?:\r?\n|$)/gm, '')
        .replace(/^\s+/, '');
      const parsedHtml = marked.parse(displayMarkdown);
      this.contentContainer.innerHTML = parsedHtml;

      // 1. 코드 블록에 헤더 바 및 복사 버튼 부착
      this.enhanceCodeBlocks();

      // 2. 우측 온페이지 목차(TOC) 생성
      this.generateTableOfContents();

      // 3. Mermaid 다이어그램 렌더링
      await DiagramRenderer.renderAll(this.contentContainer);

      // 4. 하단 이전/다음 문서 네비게이션 생성
      this.renderPagination(docPath);

      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err) {
      this.contentContainer.innerHTML = `
        <div style="padding: 24px 28px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px;">
          <h2 style="color: #b91c1c; font-size: 1.15rem; margin-bottom: 8px;">문서 로드 실패</h2>
          <p style="color: #7f1d1d; font-size: 0.92rem;">${err.message}</p>
          <p style="margin-top: 8px; color: #991b1b; font-size: 0.82rem;">요청 경로: <code>${fullUrl}</code></p>
        </div>
      `;
    }
  }

  /**
   * 코드 블록 고도화: 상단 언어 라벨 및 복사 버튼 래핑
   */
  enhanceCodeBlocks() {
    const preBlocks = this.contentContainer.querySelectorAll('pre');

    preBlocks.forEach((pre) => {
      const code = pre.querySelector('code');
      if (!code) return;

      // mermaid는 제외
      if (code.classList.contains('language-mermaid')) return;

      // 언어 클래스 감지 (예: language-python -> python)
      let language = 'text';
      code.classList.forEach(cls => {
        if (cls.startsWith('language-')) {
          language = cls.replace('language-', '');
        }
      });

      // 래퍼 컨테이너 생성
      const wrapper = document.createElement('div');
      wrapper.className = 'code-block-wrapper';

      // 상단 헤더 (언어 + 복사 버튼)
      const header = document.createElement('div');
      header.className = 'code-block-header';
      header.innerHTML = `
        <span>${language.toUpperCase()}</span>
        <button class="copy-code-btn" type="button">복사</button>
      `;

      // 복사 이벤트 연결
      const copyBtn = header.querySelector('.copy-code-btn');
      copyBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(code.textContent);
          copyBtn.textContent = '복사됨!';
          copyBtn.style.color = '#38bdf8';
          setTimeout(() => {
            copyBtn.textContent = '복사';
            copyBtn.style.color = '';
          }, 2000);
        } catch (err) {
          console.error('클립보드 복사 실패:', err);
        }
      });

      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(header);
      wrapper.appendChild(pre);
    });
  }

  /**
   * 활성 사이드바 링크 스타일 적용
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
   * 우측 온페이지 목차(TOC) 생성
   */
  generateTableOfContents() {
    if (!this.tocContainer) return;
    this.tocContainer.innerHTML = '';

    const headings = this.contentContainer.querySelectorAll('h2, h3');
    if (headings.length === 0) {
      this.tocContainer.innerHTML = '<li style="color: var(--text-dim); font-size: 0.8rem;">목차 없음</li>';
      return;
    }

    headings.forEach((heading, idx) => {
      const anchorId = `section-${idx}-${heading.textContent.trim().toLowerCase().replace(/[^a-zA-Z0-9가-힣]/g, '-')}`;
      heading.id = anchorId;

      const li = document.createElement('li');
      li.className = `toc-item ${heading.tagName.toLowerCase() === 'h3' ? 'level-3' : 'level-2'}`;
      
      const a = document.createElement('a');
      a.href = `#${this.currentDocPath}`;
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
   * 이전/다음 문서 네비게이션 카드 생성
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
        <span class="doc-pagination-label">이전 문서</span>
        <span class="doc-pagination-title">← ${prevDoc.title}</span>
      `;
      this.paginationContainer.appendChild(prevBtn);
    } else {
      const emptyDiv = document.createElement('div');
      emptyDiv.style.flex = '1';
      this.paginationContainer.appendChild(emptyDiv);
    }

    if (nextDoc) {
      const nextBtn = document.createElement('a');
      nextBtn.className = 'doc-pagination-btn next';
      nextBtn.href = `#${nextDoc.path}`;
      nextBtn.innerHTML = `
        <span class="doc-pagination-label">다음 문서</span>
        <span class="doc-pagination-title">${nextDoc.title} →</span>
      `;
      this.paginationContainer.appendChild(nextBtn);
    }
  }
}

window.MarkdownViewer = MarkdownViewer;
