# [R-00110] directory-permissions.md — 에이전트 디렉토리 권한 규격

> 문서 번호: R-00110
> 관련 영역: `.opencode/opencode.json`, `.opencode/agent/*.md`
> 상위 규격: `AGENTS.md`

---

## 1. 권한 모델

OpenCode는 도구별 권한을 `allow` / `ask` / `deny`로 평가한다. 패턴 객체에서는 **마지막으로 일치한 규칙**이 적용되므로, 넓은 규칙을 먼저 두고 예외·보호 규칙을 뒤에 둔다.

| 요구사항 | 구현 수단 |
|---|---|
| 읽기 | `permission.read` (패턴), `glob`/`grep`/`list` |
| 쓰기·수정 | `permission.edit` (패턴). 파일 생성도 포함 |
| 삭제 | `permission.bash`에서 `rm`, `del`, `Remove-*`, `ri`, `rd` 등을 `deny` |
| 저장소 외부 접근 | `permission.external_directory` (절대 경로·글롭) |

`edit` 도구에는 삭제 기능이 없으므로 **삭제 권한은 셸 명령 차단으로만 제어**한다. `edit` deny는 읽기 전용 에이전트에 사용한다.

## 2. 평가 순서 원칙

1. 기본값(`"*"`)을 먼저 선언한다.
2. 허용할 디렉토리·확장자를 선언한다.
3. 보호 구역(`.git`, `.env`, 키, `node_modules`, `.opencode` 런타임) deny를 **마지막**에 선언한다.
4. `*; *`(복합 명령)는 `ask`로 두어 삭제 명령 우회를 막는다.

## 3. 공통 보호 구역

| 경로 | read | edit | 비고 |
|---|---|---|---|
| `.git/**` | allow | deny | 이력 보호 |
| `.env`, `.env.*` | deny | deny | `.env.example`은 예외 허용 |
| `keys.json`, `auth.json` | deny | deny | 인증 정보 |
| `secrets/**` | deny | deny | 비밀 자료 |
| `node_modules/**` | allow | deny | 의존성 |
| `.opencode/logs/**`, `data/**`, `cache/**`, `state/**` | allow | deny | 런타임 기록 |
| `.opencode` 설정 파일 | allow | `mm-agents`만 | 권한 일관성 |

## 4. 저장소별 적용

- `moduai-pr`의 에이전트별 쓰기 범위는 `AGENTS.md` §2 표를 따른다.
- 6개 저장소 전체 비교표는 공용 문서 `doc/AI/모두의ai/02-에이전트/권한-매트릭스.md`를 참조한다.
- `mm-reviewer`는 모든 저장소에서 `edit: deny`, `bash: deny`로 읽기 전용이다.

## 5. 삭제·이동 정책

- 파일 삭제는 모든 에이전트에서 금지한다. 기록 보존과 실수 방지를 위한 의도적 제약이다.
- 보관이 필요하면 `Move-Item`으로 `docs/archive/` 등으로 이동하고, 이동 사실을 askLogs에 남긴다.
- `git clean`, `git reset --hard`, `git checkout -- <path>`도 삭제·복원 위험이 있어 deny 대상이다.

## 6. 변경 절차

1. 권한 변경 전 `AGENTS.md` §2·§3과 본 문서를 대조한다.
2. `.opencode/opencode.json`과 에이전트 frontmatter를 함께 수정한다.
3. `ConvertFrom-Json`으로 문법을 검증한다.
4. 공용 권한 매트릭스를 갱신하고 askLogs에 변경 사유를 남긴다.
5. opencode를 재시작해 반영한다.
