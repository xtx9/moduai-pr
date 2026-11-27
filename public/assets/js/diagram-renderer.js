// 파일명: public/assets/js/diagram-renderer.js
/**
 * moduai-pr 다이어그램 렌더러 모듈
 * Mermaid.js를 활용하여 마크다운 내 mermaid 코드 블록을 SVG 다이어그램으로 변환
 */

const DiagramRenderer = {
  /**
   * Mermaid 라이브러리 초기화
   */
  init() {
    if (typeof mermaid !== 'undefined') {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        themeVariables: {
          darkMode: true,
          background: '#0b1120',
          primaryColor: '#1e293b',
          primaryTextColor: '#f8fafc',
          primaryBorderColor: '#38bdf8',
          lineColor: '#818cf8',
          secondaryColor: '#334155',
          tertiaryColor: '#0f172a'
        },
        securityLevel: 'loose',
        fontFamily: '-apple-system, BlinkMacSystemFont, Pretendard, sans-serif'
      });
    }
  },

  /**
   * 지정된 DOM 컨테이너 내부의 ```mermaid 블록들을 SVG로 렌더링
   * @param {HTMLElement} containerElement - 마크다운 본문 컨테이너
   */
  async renderAll(containerElement) {
    if (!containerElement || typeof mermaid === 'undefined') return;

    // pre code.language-mermaid 또는 .mermaid 요소 탐색
    const mermaidElements = containerElement.querySelectorAll('pre code.language-mermaid, div.mermaid');
    
    for (let i = 0; i < mermaidElements.length; i++) {
      const el = mermaidElements[i];
      const code = el.textContent.trim();
      const id = `mermaid-svg-${Date.now()}-${i}`;
      
      const wrapper = document.createElement('div');
      wrapper.className = 'mermaid-diagram-wrap';
      
      try {
        const { svg } = await mermaid.render(id, code);
        wrapper.innerHTML = svg;
        
        // 부모 pre 태그가 있다면 pre 태그 자체를 wrapper로 교체
        const targetNode = el.tagName.toLowerCase() === 'code' ? el.parentElement : el;
        targetNode.parentNode.replaceChild(wrapper, targetNode);
      } catch (err) {
        console.error('Mermaid 다이어그램 렌더링 오류:', err);
        wrapper.innerHTML = `<p style="color: #f87171; font-size: 0.9rem;">⚠️ 다이어그램 렌더링 실패: ${err.message}</p>`;
      }
    }
  }
};

window.DiagramRenderer = DiagramRenderer;
