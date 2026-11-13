# moduai-pr — AI 에이전트 통합 지침 (AGENTS.md)

> 버전: 1.0.0
> 작성일: 2026-11-05
> 작성자: 사용자 & AI 에이전트
> 프로젝트: moduai-pr — 프레젠테이션·프론트엔드·GitHub Pages 저장소
> 주요 내용:
>   1) 모두의 AI 저장소 전용 **프로젝트 로컬 AI 격리** 규격
>   2) 에이전트별 **디렉토리 읽기/쓰기·수정/삭제 권한 매트릭스**
>   3) ask·todo·askLogs·CHANGELOG 기록 의무
>   4) 공용 기록 저장소(`doc/AI/모두의ai`) 연동
> 관련 문서: `docs/rule/R-00109 ai-agent-local-config.md`, `docs/rule/R-00110 directory-permissions.md`
> Breaking Change 여부: 없음(신규 저장소 설정)

---

## 0. 문서 계층

```
AGENTS.md                    최상위 절대 규칙 (본 문서)
        ↓
docs/rule/*.md               실무 규칙 (R-00109 격리, R-00110 권한)
        ↓
docs/ask.md                  사용자 요청 원문
        ↓
docs/todo.md                 실행 계획 및 TODO
        ↓
docs/todo.history.md         완료 이력 아카이브
        ↓
docs/askLogs/                작업 단위 이력 (쓰기 전용)
        ↓
docs/CHANGELOG/              변경 상세 기록
```

- 규칙·가이드 문서는 프로젝트 루트의 `AGENTS.md`, `README.md`를 제외하고 `docs/` 하위에만 만든다.
- 공용(모두의 AI 전역) 기록은 `E:/up/0-project/git/xtx9999/doc/AI/모두의ai/`에 남긴다.

---

## 1. 최상위 규칙 (예외 없음)

### 1.1 언어·소스 작성
- 모든 답변·주석·문서·커밋 메시지는 **한글**로 작성한다. 식별자만 영문을 허용한다.
- 모든 소스 파일 최상단 1열에 상대 경로 헤더를 둔다.
  - 예: `# 파일명: scripts/run-opencode.ps1`, `// 파일명: src/app.ts`, `<!-- 파일명: public/index.html -->`
- 주요 함수·클래스·설정에는 한글 주석(매개변수·반환값 포함)을 작성한다.

### 1.2 기록 의무
1. 요청 원문은 `docs/ask.md`에 보관한다.
2. 계획은 `docs/todo.md`에 체크리스트로 기록한다.
3. 작업 종료 시 `docs/askLogs/ask-YYYYMMDDHHMMSS.md`를 새 파일로 만든다(기존 로그 수정 금지).
4. 완료 항목은 `docs/todo.history.md`와 `docs/CHANGELOG/`에 남긴 뒤 `docs/todo.md`에서 삭제한다.
5. askLogs에는 절차·결과·Q&A(`RESOLVED`/`FOLLOWUP`)·화면 출력 메시지를 포함한다.

### 1.3 격리 원칙
- API 키는 프로젝트 루트 `.env`에만 저장한다(gitignored). `.env.example`만 커밋한다.
- OpenCode 데이터·캐시·상태·로그는 `.opencode/{data,cache,state,logs}`에만 기록한다.
- 전역(`~/.config/opencode`, `~/.local/share/opencode`) 설정·키·대화 로그를 새로 만들지 않는다.
- 다른 저장소 파일은 기본적으로 접근 `ask`다. 공용 문서 `doc/AI/**`만 허용한다.

---

## 2. 에이전트 구성 및 권한 매트릭스

| 에이전트 | 모드 | 읽기 | 쓰기·수정 | 삭제 |
|---|---|---|---|---|
| `mm-agents` | primary | 프로젝트 전체(비밀 제외) | 프로젝트 전체(`.opencode` 설정 포함, 보호 구역 제외) | 금지 |
| `mm-pr` | primary | 프로젝트 전체(비밀 제외) | 프로젝트 전체(보호 구역, `.github/workflows/`, `.opencode` 설정 제외) | 금지 |
| `mm-reviewer` | subagent | 프로젝트 전체(비밀 제외) | 금지(읽기 전용) | 금지 |

- HTML/CSS/JS, 발표 자료, Pages 설정을 관리한다. `.github/workflows/`는 시크릿 보호를 위해 수정하지 않는다.

- **읽기** = `read`/`glob`/`grep`/`list`.
- **쓰기·수정** = `edit`(파일 생성·수정 포함).
- **삭제** = 파일 삭제 명령(`rm`, `del`, `Remove-*` 등) `deny`. OpenCode의 `edit` 도구는 삭제 기능이 없다.
- 삭제가 꼭 필요하면 사용자가 직접 수행하거나, `Move-Item`으로 보관 폴더 이동 후 사용자 확인을 받는다.

---

## 3. 보호 구역 (모든 에이전트 공통)

| 경로 | 읽기 | 쓰기·수정 | 사유 |
|---|---|---|---|
| `.git/**` | 허용 | 금지 | 저장소 이력 보호 |
| `.env`, `.env.*` | 금지 | 금지 | API 키·시크릿 |
| `.env.example` | 허용 | 허용 | 변수명 공유용 |
| `**/keys.json`, `**/auth.json` | 금지 | 금지 | 인증 정보 |
| `**/secrets/**` | 금지 | 금지 | 비밀 자료 |
| `node_modules/**` | 허용 | 금지 | 의존성 무결성 |
| `.opencode/logs/**`, `data/**`, `cache/**`, `state/**` | 허용 | 금지 | 런타임 기록 보호 |
| `.opencode/update-check.json` | 허용 | 금지 | 런처 캐시 |
| `.opencode/**` (설정) | 허용 | `mm-agents`만 허용 | 에이전트 설정 보호 |

---

## 4. 로컬 실행 및 포트

- 런처: `pwsh -ExecutionPolicy Bypass -File scripts/run-opencode.ps1`
- 점검: `pwsh -ExecutionPolicy Bypass -File scripts/run-opencode.ps1 -Check`
- 이 저장소 기본 포트: **39741** (`-ServerPort`로 변경 가능, 대역 39700~39799)
- 런처는 `.env`를 Process 범위로 주입하고, `XDG_DATA_HOME`/`XDG_CACHE_HOME`/`XDG_STATE_HOME`을 `.opencode/` 하위로 지정한다.
- 설정(`opencode.json`, 에이전트, 플러그인)은 시작 시 1회 로드되므로 변경 후 **opencode 재시작**이 필요하다.
- 로컬 바이너리가 없으면 런처는 전역 실행 파일로 대체하지 않고 중단한다.

---

## 5. 검증

1. JSON 문법: `Get-Content -Raw .opencode/opencode.json | ConvertFrom-Json`
2. 런처·격리 경로: `scripts/run-opencode.ps1 -Check` 출력의 모든 경로가 `.opencode\...`인지 확인
3. 포트 기본값: `-Check`의 `ServerPortDefault` 값이 39741인지 확인
4. 문서 링크: 이동·생성한 문서의 상대 링크 존재 여부 확인
5. 코드가 있는 저장소는 해당 빌드/테스트 명령을 추가로 실행한다.

---

## 6. 형제 저장소 정책

- `moduai`, `moduai-dev`, `moduai-pr`, `moduai-Report`, `moduai-cdn`, `moduai-doc`은 각각 독립된 OpenCode 프로젝트다.
- 다른 저장소를 읽거나 수정해야 하면 `external_directory` 규칙에 따라 사용자 확인(`ask`)을 받는다.
- 공용 산출물은 파일 복사 대신 URL·경로 참조로 연결하고, 복제 시 원본과 동기화 시점을 문서에 남긴다.

---

## 7. 공용 기록

| 목적 | 경로 |
|---|---|
| 저장소 역할 | `doc/AI/모두의ai/01-저장소/저장소-역할.md` |
| 에이전트 목록 | `doc/AI/모두의ai/02-에이전트/에이전트-목록.md` |
| 권한 매트릭스 | `doc/AI/모두의ai/02-에이전트/권한-매트릭스.md` |
| 작업 이력 | `doc/AI/모두의ai/03-작업이력/` |
