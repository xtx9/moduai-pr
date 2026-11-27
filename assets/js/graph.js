<!-- 파일명: assets/js/graph.js -->
/*
 * Chart.js 를 이용한 그래프 초기화 스크립트
 * 각 마크다운 내에 <canvas data-chart='jsonData'> 형태로 데이터를 넣으면 자동으로 차트가 그려짐
 */

export function initGraphs() {
  // 페이지 내 모든 캔버스 요소 탐색
  const canvases = document.querySelectorAll('canvas[data-chart]');
  canvases.forEach(canvas => {
    try {
      const raw = canvas.getAttribute('data-chart');
      const cfg = JSON.parse(raw);
      // Chart.js 초기화 (cdn 로드된 전역 Chart 객체 사용)
      new Chart(canvas.getContext('2d'), cfg);
    } catch (e) {
      console.error('그래프 초기화 실패:', e);
    }
  });
}
