# TODO 완료 이력 — moduai-pr

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
