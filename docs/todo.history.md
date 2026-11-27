# TODO 완료 이력 — moduai-pr

## 2026-11-27 — 디자인 시스템 수립 및 강의/문서 뷰어 전면 리팩토링

- [x] docs/스타일-가이드.md (디자인 시스템 규격서: 컬러, 폰트, 여백, 컴포넌트) 작성 — 완료: 2026-11-27
- [x] public/assets/css/docs.css 전면 리팩토링 (1400px 컨테이너, 본문 타이포그래피 극대화) — 완료: 2026-11-27
- [x] public/docs.html 레이아웃 일체감 및 클래스 구조 보강 — 완료: 2026-11-27
- [x] markdown-viewer.js 코드 블록 원클릭 복사(Copy) 버튼 탑재 — 완료: 2026-11-27
- [x] GitHub 원격 커밋 & 푸시(a99de38) 완료 — 완료: 2026-11-27

관련 로그: `docs/askLogs/ask-20261127053600.md` / 변경 기록: `docs/CHANGELOG/20261127053600-docs-viewer-redesign.md`

## 2026-11-27 — Actions 배포 완료 및 public/CNAME 영구 적용

- [x] Actions 일시 실패 감지 및 gh run rerun을 통한 배포 성공(✓) 완료 — 완료: 2026-11-27
- [x] public/CNAME 생성 및 origin/main 푸시(f26f6f5) — 완료: 2026-11-27
- [x] 라이브 서버 curl 검증 (index.html, docs.html, symbol.svg 200 OK 확인) — 완료: 2026-11-27

관련 로그: `docs/askLogs/ask-20261127053000.md` / 변경 기록: `docs/CHANGELOG/20261127053000-actions-deployment-success-and-cname.md`

## 2026-11-27 — 원격 워크플로우 커밋 Rebase 및 푸시 완료

- [x] 원격 신규 커밋(static.yml) 확인 및 git pull --rebase origin main 실행 — 완료: 2026-11-27
- [x] 최신 커밋(d352ce4) origin/main 푸시 성공 — 완료: 2026-11-27

관련 로그: `docs/askLogs/ask-20261127052600.md` / 변경 기록: `docs/CHANGELOG/20261127052600-git-rebase-and-push.md`

## 2026-11-27 — 심볼 적용·사이드바 토글·이모티콘 정돈·ChatGPT 라이트 모드 개편

- [x] 심볼 SVG 복사 및 자산 배치 (`public/assets/images/symbol.svg`) — 완료: 2026-11-27
- [x] ChatGPT 라이트 모드 CSS 전면 개편 (`style.css`, `docs.css`) — 완료: 2026-11-27
- [x] 사이드바 접기/펼치기(토글) 및 localStorage 상태 저장 구현 (`markdown-viewer.js`) — 완료: 2026-11-27
- [x] 이모티콘 전면 제거 및 텍스트/마크다운 정돈 (`navigation.json`, `content/*`, `index.html`) — 완료: 2026-11-27
- [x] HTML 헤더 심볼 SVG 및 파비콘 적용 (`index.html`, `docs.html`) — 완료: 2026-11-27
- [x] 검증 및 작업 이력 아카이브 — 완료: 2026-11-27

관련 로그: `docs/askLogs/ask-20261127052300.md` / 변경 기록: `docs/CHANGELOG/20261127052300-chatgpt-light-theme-and-symbol.md`

## 2026-11-27 — GitHub Pages 웹 UI Actions 배포 및 도메인 설정 안내

- [x] GitHub 원격 푸시 상태 확인 (`ae6dc68` origin/main 확인 완료) — 완료: 2026-11-27
- [x] Settings → Pages → GitHub Actions (Static HTML, path: './public') 설정 절차 안내 — 완료: 2026-11-27
- [x] Custom domain(`moduai-pr.smartflex.org`) 및 Enforce HTTPS 설정 안내 — 완료: 2026-11-27
- [x] 작업 이력 기록 및 답변 제공 — 완료: 2026-11-27

관련 로그: `docs/askLogs/ask-20261127044600.md` / 변경 기록: `docs/CHANGELOG/20261127044600-github-actions-pages-setup-guide.md`

## 2026-11-27 — 웹 루트 보안 격리를 위한 public/ 디렉토리 분리

- [x] `public/` 디렉터리 생성 및 웹 자산(`index.html`, `docs.html`, `assets/`, `content/`, `.nojekyll`) 이동 — 완료: 2026-11-27
- [x] 소스 코드 상대 경로 주석 헤더 7건 갱신 — 완료: 2026-11-27
- [x] `moduai-pr 깃헙 페이지설정.md` 가이드에 `public/` 배포 설정 반영 — 완료: 2026-11-27
- [x] 작업 이력 기록 및 답변 제공 — 완료: 2026-11-27

관련 로그: `docs/askLogs/ask-20261127043845.md` / 변경 기록: `docs/CHANGELOG/20261127043845-public-directory-isolation.md`

## 2026-11-27 — GitHub Pages 구조화 및 Zero-Build 랜딩/강의 뷰어 구축

- [x] 디렉토리 구조 생성 (`assets/css`, `assets/js`, `content/intro`, `content/lectures`) — 완료: 2026-11-27
- [x] 스타일시트 모듈 분리 (`assets/css/style.css`, `assets/css/docs.css`) — 완료: 2026-11-27
- [x] JS 스크립트 모듈 분리 (`assets/js/app.js`, `assets/js/markdown-viewer.js`, `assets/js/diagram-renderer.js`) — 완료: 2026-11-27
- [x] 랜딩 소개 페이지 구현 (`index.html`) — 완료: 2026-11-27
- [x] 강의/문서 뷰어 페이지 구현 (`docs.html` - 좌측 사이드바, 본문 뷰어, 우측 TOC) — 완료: 2026-11-27
- [x] 사이드바 네비게이션 JSON 및 샘플 마크다운 작성 (`content/navigation.json`, `content/intro/*`, `content/lectures/*`) — 완료: 2026-11-27
- [x] `.nojekyll` 파일 생성 — 완료: 2026-11-27
- [x] 파일 무결성 및 JSON 검증 — 완료: 2026-11-27

관련 로그: `docs/askLogs/ask-20261127043500.md` / 변경 기록: `docs/CHANGELOG/20261127043500-github-pages-structure-and-viewer.md`

## 2026-11-05 — AI 에이전트 로컬 격리·권한 설정

- [x] `.opencode/opencode.json` 생성 — `share: disabled`, 읽기/쓰기/삭제·외부 접근 권한 매트릭스, `autoupdate: false`
- [x] 에이전트 정의 — `mm-agents`(설정 전담), `mm-pr`(도메인 작업), `mm-reviewer`(읽기 전용 검토)
- [x] `.opencode/plugin/worklog.ts` — 대화·도구 실행 JSONL 기록 및 시크릿 마스킹
- [x] `.opencode/command/asklog.md`, `todoupdate.md` — 기록 커맨드
- [x] `scripts/run-opencode.ps1` — XDG 격리, `.env` 주입, 기본 포트 39741
- [x] `.env.example`, `.gitignore` — 키·런타임 로그 커밋 차단
- [x] `AGENTS.md`, `docs/rule/R-00109`, `docs/rule/R-00110` — 격리·권한 규격 문서화
- [x] 공용 문서 `doc/AI/모두의ai/`에 저장소 역할·에이전트 목록·권한 매트릭스·작업 이력 기록
- 변경 파일: `.opencode/`, `scripts/run-opencode.ps1`, `AGENTS.md`, `README.md`, `.gitignore`, `.env.example`, `docs/` 신규
- 검증: JSON 문법, 런처 `-Check` 경로, 문서 링크 확인 (상세는 `docs/askLogs/` 참조)

## 2026-11-05 — `.env`·격리·로컬 바이너리 검증 완료
- [x] `.env` 생성 및 `OPENCODE_API_KEY` 입력 — 완료: 2026-11-05, 파일: `.env` (gitignore·미추적)
- [x] 런처 `-Check`로 격리 경로(Config/Data/Cache/State)와 포트 39741 확인 — 완료: 2026-11-05
- [x] `.opencode/node_modules` 로컬 설치(opencode 1.19.5) 확인 — 완료: 2026-11-05
- [x] 기본 모델 `opencode/big-pickle` 고정 — 완료: 2026-11-05, 파일: `.opencode/opencode.json`
- 비고: `CLINE_API_KEY`·`MISTRAL_API_KEY`는 공란(사용 시 입력)

## 2026-11-26 — GitHub Pages 대비 리포지토리 위생 정리
- [x] 추적 파일 시크릿 스캔 — 매칭 0건, `.env` 등 런타임 무시·미추적 확인 — 완료: 2026-11-26
- [x] 개인 식별/환경 경로 정리 — `.env.example`(이메일 주석 제거), `.clinerules`(절대경로 일반화) — 완료: 2026-11-26

