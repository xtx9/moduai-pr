# 변경 기록 — 2026-11-27 04:35:00 UTC GitHub Pages 구조화 및 Zero-Build 랜딩/강의 뷰어 구축

// 파일명: docs/CHANGELOG/20261127043500-github-pages-structure-and-viewer.md
// 목적: moduai-pr 저장소의 GitHub Pages 전용 구조 개편 및 모던 랜딩/강의 뷰어 플랫폼 구축 내역을 기록한다.
// 작성 일시: 2026-11-27 04:35:00 UTC (KST 2026-11-27 13:35:00)
// 관련 로그: docs/askLogs/ask-20261127043500.md

---

## 1. 변경 요약

`moduai-pr` 저장소를 GitHub Pages에서 별도 빌드 없이 바로 서비스 가능한 정적 웹 구조로 개편했다. 모던 랜딩 소개 페이지(`index.html`), 좌측 사이드바와 본문 강의 뷰어(`docs.html`), Marked.js 기반 MD->HTML 자동 파서, Mermaid 다이어그램 렌더러, 분리된 CSS/JS, 그리고 JSON 기반 사이드바 네비게이션과 샘플 강의 마크다운 문서군을 신규 구축했다.

## 2. 신규 생성된 파일 목록

| 파일 경로 | 설명 |
|---|---|
| `.nojekyll` | GitHub Pages Jekyll 처리 비활성화 |
| `index.html` | 모던 랜딩 소개 페이지 (Hero, 비전, 특징 3개, CTA) |
| `docs.html` | 강의/문서 뷰어 페이지 (좌측 사이드바, 본문 뷰어, 우측 TOC) |
| `assets/css/style.css` | 공통 테마, 네비게이션, 푸터, 랜딩 스타일 |
| `assets/css/docs.css` | 문서 뷰어, 사이드바, 마크다운 본문, 코드 하이라이트 스타일 |
| `assets/js/app.js` | 모바일 메뉴 토글 및 기본 UI 상호작용 |
| `assets/js/diagram-renderer.js` | Mermaid.js 연동 SVG 다이어그램 렌더러 |
| `assets/js/markdown-viewer.js` | 마크다운 Fetch, 실시간 HTML 파싱, TOC 생성, 네비게이션 라우터 |
| `content/navigation.json` | 사이드바 카테고리 및 문서 목록 정의 설정 |
| `content/intro/01-overview.md` | 모두의 AI 개요 마크다운 문서 |
| `content/intro/02-architecture.md` | 시스템 아키텍처 및 Mermaid 다이어그램 문서 |
| `content/lectures/chapter-01.md` | 제1강: 모두의 AI 시작하기 강의 마크다운 |
| `content/lectures/chapter-02.md` | 제2강: 소버린 모델 구축법 강의 마크다운 |
| `docs/askLogs/ask-20261127043500.md` | 작업 수행 로그 |
| `docs/CHANGELOG/20261127043500-github-pages-structure-and-viewer.md` | 본 변경 기록 문서 |
