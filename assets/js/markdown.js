<!-- 파일명: assets/js/markdown.js -->
/*
 * 마크다운 파서 및 렌더링 스크립트
 * 사용 라이브러리: marked (CDN 로드된 전역 객체)
 */

// 지정된 마크다운 파일을 로드하고 HTML 로 변환 후 #content 에 삽입
export async function loadMarkdown(path) {
  const res = await fetch(path);
  if (!res.ok) {
    console.error('마크다운 파일 로드 실패:', path);
    return;
  }
  const txt = await res.text();
  const html = marked.parse(txt);
  document.getElementById('content').innerHTML = html;
  // 그래프 초기화 (graph.js 에서 정의된 initGraphs 함수를 호출)
  if (typeof initGraphs === 'function') initGraphs();
}

// 사이드바에 마크다운 파일 리스트 자동 생성 (간단 구현)
export async function generateSidebar(basePath = 'docs/') {
  const nav = document.getElementById('navMenu');
  // 현재는 고정된 파일 목록, 필요 시 API 로 동적 생성 가능
  const files = ['README.md', 'guide.md', 'lecture.md'];
  files.forEach(f => {
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = f.replace('.md', '');
    link.addEventListener('click', e => {
      e.preventDefault();
      loadMarkdown(basePath + f);
    });
    const li = document.createElement('div');
    li.appendChild(link);
    nav.appendChild(li);
  });
}

// 초기 실행
document.addEventListener('DOMContentLoaded', () => {
  generateSidebar();
  // 기본 페이지 로드 (README.md)
  loadMarkdown('README.md');
});
