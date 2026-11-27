// 파일명: public/assets/js/markdown-viewer.js
/**
 * moduai-pr 마크다운 문서 & 강의 뷰어 모듈
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

    const savedCollapsed = localStorage.getItem('moduai-sidebar-collapsed') === 'true';
    setOpen(mobile() ? false : !savedCollapsed);
    toggle.addEventListener('click', () => {
      const isOpen = !this.sidebarElement.classList.contains('collapsed');
      setOpen(!isOpen);
    });
    if (backdrop) backdrop.addEventListener('click', () => setOpen(false));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && mobile() && !this.sidebarElement.classList.contains('collapsed')) setOpen(false);
    });
    this.sidebarContainer?.addEventListener('click', (event) => {
      if (event.target.closest('.sidebar-link') && mobile()) setOpen(false);
    });
    window.addEventListener('resize', () => {
      if (!mobile()) {
        setOpen(localStorage.getItem('moduai-sidebar-collapsed') !== 'true');
      } else {
        setOpen(false);
      }
    });
  }

