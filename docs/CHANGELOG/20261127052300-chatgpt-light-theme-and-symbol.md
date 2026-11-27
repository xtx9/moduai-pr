# 변경 기록 — 2026-11-27 05:23:00 UTC 심볼 적용·사이드바 토글·이모티콘 정돈·ChatGPT 라이트 모드 전환

// 파일명: docs/CHANGELOG/20261127052300-chatgpt-light-theme-and-symbol.md
// 목적: 심볼 SVG 적용, 사이드바 토글, 이모티콘 제거 및 ChatGPT 라이트 모드 개편 내역을 기록한다.
// 작성 일시: 2026-11-27 05:23:00 UTC (KST 2026-11-27 14:23:00)
// 관련 로그: docs/askLogs/ask-20261127052300.md

---

## 1. 변경 요약

사이트 심볼(`심볼.svg`)을 파비콘 및 헤더 로고로 적용하고, 좌측 사이드바 접기/펼치기(토글) 및 상태 저장 기능을 구현했다. 또한 과도한 이모티콘을 모두 배제하고 텍스트와 미니멀 SVG 아이콘으로 정돈했으며, ChatGPT 라이트 모드 특유의 클린 화이트/소프트 그레이 테마로 전체 디자인을 전면 개편했다.

## 2. 변경 파일 목록

| 파일 | 내용 |
|---|---|
| `public/assets/images/symbol.svg` | 원본 심볼 SVG 복사 및 파비콘/로고 자산 배치 |
| `public/assets/css/style.css` | ChatGPT 라이트 모드 변수, 미니멀 네비게이션, Hero, 카드 스타일 |
| `public/assets/css/docs.css` | 라이트 모드 사이드바, 토글(.collapsed) 애니메이션, 본문 타이포그래피 |
| `public/assets/js/markdown-viewer.js` | 사이드바 토글 리스너, localStorage 상태 저장, 텍스트 목차 렌더링 |
| `public/assets/js/diagram-renderer.js` | 라이트 모드 Mermaid(theme: 'neutral', bg: #fff) 렌더링 |
| `public/index.html` | 심볼 SVG 파비콘/로고 적용, 이모티콘 제거 및 미니멀 SVG 아이콘 교체 |
| `public/docs.html` | 심볼 SVG 적용, 상단 사이드바 토글 버튼 배치, github.min.css 연동 |
| `public/content/navigation.json` | 이모티콘 제거 및 순수 텍스트 카테고리 구성 |
| `public/content/intro/*` | 마크다운 문서 내 장식용 이모티콘 제거 및 서술 정돈 |
| `public/content/lectures/*` | 강의 마크다운 문서 내 이모티콘 제거 및 코드 블록 정돈 |
| `docs/askLogs/ask-20261127052300.md` | 작업 수행 로그 |
| `docs/CHANGELOG/20261127052300-chatgpt-light-theme-and-symbol.md` | 본 변경 기록 문서 |
