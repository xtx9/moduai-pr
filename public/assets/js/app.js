// 파일명: public/assets/js/app.js
/**
 * moduai-pr 전역 인터랙션 스크립트
 * 모바일 메뉴 토글 및 기본 UI 상호작용 관리
 */

document.addEventListener('DOMContentLoaded', () => {
  // 모바일 네비게이션 토글 버튼
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  // 외부 링크에 target="_blank" 및 rel="noopener noreferrer" 자동 부여
  const links = document.querySelectorAll('a[href^="http://"], a[href^="https://"]');
  links.forEach(link => {
    if (!link.href.includes(window.location.hostname)) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
});
