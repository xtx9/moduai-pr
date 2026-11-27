# 변경 기록 — 2026-11-27 05:36:00 UTC 디자인 시스템 수립 및 강의/문서 뷰어 전면 리팩토링

// 파일명: docs/CHANGELOG/20261127053600-docs-viewer-redesign.md
// 목적: 디자인 시스템 가이드 수립 및 강의/문서 뷰어(docs.html/docs.css) 전면 개편 내역을 기록한다.
// 작성 일시: 2026-11-27 05:36:00 UTC (KST 2026-11-27 14:36:00)
// 관련 로그: docs/askLogs/ask-20261127053600.md

---

## 1. 변경 요약

강의 가이드 페이지의 디자인 완성도를 최고 수준으로 끌어올리기 위해 `docs/스타일-가이드.md` 디자인 시스템 규격서를 제정하고, 1400px 중앙 정렬 컨테이너, 고도화된 마크다운 타이포그래피, 코드 블록 언어 라벨 및 복사 버튼, 세련된 사이드바 및 TOC 레이아웃으로 전면 리팩토링하여 푸시 완료했다.

## 2. 변경 파일 목록

| 파일 | 내용 |
|---|---|
| `docs/스타일-가이드.md` | ChatGPT 라이트 모드 기반 디자인 시스템 규격서 신설 |
| `public/assets/css/docs.css` | 1400px 그리드, 타이포그래피, 코드블록 래퍼, TOC 전면 개편 |
| `public/docs.html` | docs-page-wrapper 적용 및 글로벌 헤더/푸터 폭 일체화 |
| `public/assets/js/markdown-viewer.js` | 코드 블록 자동 래핑 및 원클릭 복사(Copy) 기능 탑재 |
| `docs/ask.md` | 질문 원문 및 완료 상태 기록 |
| `docs/todo.history.md` | 완료 이력 아카이브 추가 |
| `docs/askLogs/ask-20261127053600.md` | 작업 수행 로그 |
| `docs/CHANGELOG/20261127053600-docs-viewer-redesign.md` | 본 변경 기록 문서 |
