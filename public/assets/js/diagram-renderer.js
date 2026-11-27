// 파일명: public/assets/js/diagram-renderer.js
/**
 * moduai-pr 다이어그램 렌더러 모듈
 * Mermaid.js를 활용하여 ChatGPT 라이트 모드에 최적화된 SVG 다이어그램 렌더링
 */

const DiagramRenderer = {
  /**
   * Mermaid 라이브러리 초기화 (라이트 모드 테마)
   */
  init() {
    if (typeof mermaid !== 'undefined') {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'neutral',
        themeVariables: {
          darkMode: false,
          background: '#ffffff',
          primaryColor: '#f8fafc',
          primaryTextColor: '#0d0d0d',
          primaryBorderColor: '#0284c7',
          lineColor: '#64748b',
          secondaryColor: '#f1f5f9',
          tertiaryColor: '#ffffff',
          fontFamily: '-apple-system, BlinkMacSystemFont, Pretendard, "Segoe UI", Roboto, sans-serif'
        },
        securityLevel: 'loose'
      });
    }
  },

  /**
   * 지정된 DOM 컨테이너 내부의 ```mermaid 블록들을 SVG로 렌더링
   * @param {HTMLElement} containerElement - 마크다운 본문 컨테이너
   */
  async renderAll(containerElement) {
    if (!containerElement || typeof mermaid === 'undefined') return;

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
        
        const targetNode = el.tagName.toLowerCase() === 'code' ? el.parentElement : el;
        targetNode.parentNode.replaceChild(wrapper, targetNode);
      } catch (err) {
        console.error('Mermaid 다이어그램 렌더링 오류:', err);
        wrapper.innerHTML = `<p style="color: #ef4444; font-size: 0.88rem;">다이어그램 렌더링 실패: ${err.message}</p>`;
      }
    }
  }
};

window.DiagramRenderer = DiagramRenderer;
