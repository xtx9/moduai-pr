# 변경 기록 — 2026-11-27 04:38:45 UTC 웹 루트 보안 격리를 위한 public/ 디렉토리 분리

// 파일명: docs/CHANGELOG/20261127043845-public-directory-isolation.md
// 목적: 웹 자산을 public/ 하위로 완전 격리하여 루트 내부 파일 노출을 차단한 내역을 기록한다.
// 작성 일시: 2026-11-27 04:38:45 UTC (KST 2026-11-27 13:38:45)
// 관련 로그: docs/askLogs/ask-20261127043845.md

---

## 1. 변경 요약

저장소 루트 서빙 시의 내부 설정 및 기록 문서 노출 위험을 원천 방지하기 위해, 웹 서비스 파일 일체를 `public/` 디렉터리로 이동 격리하고, 소스 파일 헤더 주석 갱신 및 GitHub Pages `public/` 배포 가이드를 보강했다.

## 2. 변경 파일 목록

| 파일 | 내용 |
|---|---|
| `public/` | 웹 자산 격리 폴더 (`index.html`, `docs.html`, `assets/`, `content/`, `.nojekyll`) |
| `public/index.html` 외 6건 | 소스 파일 헤더 주석을 `public/...` 경로로 갱신 |
| `docs/Platforms/서버-설정/moduai-pr 깃헙 페이지설정.md` | GitHub Actions 기반 `public/` 배포 가이드 추가 |
| `docs/ask.md` | 질문 원문 및 완료 상태 기록 |
| `docs/todo.md` | 작업 완료 항목 정리 |
| `docs/todo.history.md` | 완료 이력 아카이브 추가 |
| `docs/askLogs/ask-20261127043845.md` | 작업 수행 로그 |
| `docs/CHANGELOG/20261127043845-public-directory-isolation.md` | 본 변경 기록 문서 |
