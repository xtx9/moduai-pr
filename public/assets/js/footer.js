/* 파일명: public/assets/js/footer.js */
/**
 * moduai 공통 푸터
 * 메인 페이지는 브랜드·탐색 푸터, 문서 페이지는 간결한 저작권 푸터를 표시합니다.
 */
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('site-footer-root');
  if (!root) return;

  const isDocsPage = /(?:^|\/)docs\.html$/.test(window.location.pathname);

  if (isDocsPage) {
    root.innerHTML = `
      <footer class="site-footer docs-compact-footer">
        <div class="docs-footer-bottom">
          <p>© 2026 moduai (모두의 AI)</p>
          <p>세상과 함께 만들고, 모두와 나눕니다.</p>
        </div>
      </footer>
    `;
    return;
  }

  root.innerHTML = `
    <footer class="site-footer" aria-labelledby="footer-brand-title">
      <div class="footer-container">
        <div class="footer-main">
          <a class="footer-brand" href="index.html" aria-label="moduai 첫 화면">
            <img src="assets/images/symbol.svg" alt="" width="30" height="30">
            <span id="footer-brand-title">moduai</span>
          </a>
          <p class="footer-manifesto">The World Belongs to Everyone.</p>
          <p class="footer-subline">Built Together, Open to All.</p>
          <p class="footer-korean">함께 만들고, 모두에게 열려 있습니다.</p>
        </div>

        <nav class="footer-navigation" aria-label="푸터 메뉴">
          <div class="footer-nav-group">
            <span class="footer-nav-heading">EXPLORE</span>
            <a href="index.html">모두의 AI 소개</a>
            <a href="docs.html">사업 · 개발 문서</a>
          </div>
          <div class="footer-nav-group">
            <span class="footer-nav-heading">PLATFORM</span>
            <a href="https://moduai.smartflex.org" target="_blank" rel="noopener noreferrer">
              개발 플랫폼 열기 <span aria-hidden="true">↗</span>
            </a>
          </div>
        </nav>
      </div>
      <div class="footer-bottom">
        <p>© 2026 moduai (모두의 AI)</p>
        <p>세상과 함께 만들고, 모두와 나눕니다.</p>
      </div>
    </footer>
  `;
});
