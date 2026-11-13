# [R-00109] ai-agent-local-config.md — AI 에이전트 프로젝트 로컬 격리 규격

> 문서 번호: R-00109
> 관련 영역: `.opencode/`, `.env`, `scripts/run-opencode.ps1`, `.gitignore`
> 상위 규격: `AGENTS.md`

---

## 1. 목적

moduai-pr 저장소의 OpenCode 설정·키·대화/도구 로그를 **저장소 내부**에만 두어 전역 설정·Windows 사용자 폴더 오염을 방지한다.

## 2. 디렉터리 구조

```
moduai-pr/
├─ .env                        # API 키 (gitignored, 사용자만 생성)
├─ .env.example                # 변수명만 공유 (커밋)
├─ .gitignore                  # AI 키·런타임 로그 제외
├─ .opencode/
│  ├─ opencode.json            # 권한·격리·지침 설정
│  ├─ agent/                   # mm-agents, mm-pr, mm-reviewer
│  ├─ command/                 # asklog, todoupdate
│  ├─ plugin/worklog.ts        # 대화·도구 실행 JSONL 기록
│  ├─ .npmrc                   # workspaces=false (홈 .npmrc 충돌 차단)
│  ├─ package.json             # opencode-ai 1.19.5 고정
│  ├─ node_modules/            # 로컬 실행 바이너리 (gitignored)
│  ├─ data/, cache/, state/    # XDG 격리 (gitignored)
│  └─ logs/                    # worklog 기록 (gitignored)
├─ scripts/run-opencode.ps1    # 로컬 런처
└─ docs/                       # ask/todo/askLogs/CHANGELOG/rule
```

## 3. 런처 동작

1. `$env:OPENCODE_CONFIG_DIR`, `XDG_DATA_HOME`, `XDG_CACHE_HOME`, `XDG_STATE_HOME`을 `.opencode/` 하위로 지정한다.
2. 프로젝트 루트 `.env`를 읽어 Process 범위 환경변수로 주입한다(값은 출력하지 않는다).
3. 기본 포트 **39741**로 `--port`를 전달한다. 점유 시 경고 후 포트 없이 실행한다(fail-open).
4. `.opencode/node_modules/.bin/opencode.cmd`가 없으면 전역 실행 파일로 대체하지 않고 중단한다.
5. 실행 전 로컬 버전만 확인·갱신한다(`autoupdate: false`, 캐시 TTL 24시간/실패 1시간, 실패 시 기존 버전 실행).

## 4. 키 주입

- `OPENCODE_API_KEY`(별칭 `OPENCODE_ZEN_API_KEY`), `CLINE_API_KEY`, `MISTRAL_API_KEY`를 `.env`에만 둔다.
- `.opencode/data/opencode/auth.json`에는 API 키를 수동 저장하지 않는다(OAuth 전용).
- `-Check` 출력의 `OpenCodeKeyLoaded`가 `True`여야 주입이 동작한 것이다(값은 표시하지 않음).

## 5. 포트 배정 (모두의 AI)

| 저장소 | 기본 포트 |
|---|---|
| moduai | 39737 |
| moduai-dev | 39740 |
| moduai-pr | 39741 |
| moduai-Report | 39742 |
| moduai-cdn | 39743 |
| moduai-doc | 39744 |

- 대역 규칙: `39700~39799` = opencode 전용. `4096`은 기본 폴백이므로 사용하지 않는다.
- 파라미터명은 반드시 `-ServerPort`를 사용한다(`-Port`는 opencode 인자와 충돌).

## 6. 기록·보안

- 대화·도구 실행 로그는 `.opencode/logs/{conversation,tool-execution}.jsonl`에만 기록하고, 플러그인이 키·토큰을 `[REDACTED]` 처리한다.
- `.opencode/{logs,data,cache,state}`, `.env`, `.opencode/update-check.json`은 `.gitignore`로 제외한다.
- 전역 설정 `~/.config/opencode`는 공용 플러그인 허브로만 두고, 이 저장소의 데이터·인증·프로젝트 설정은 로컬을 사용한다.

## 7. 검증

```powershell
pwsh -ExecutionPolicy Bypass -File scripts/run-opencode.ps1 -Check
Get-Content -Raw .opencode/opencode.json | ConvertFrom-Json
```

- `-Check`의 `ConfigDirectory`/`DataDirectory`/`CacheDirectory`/`StateDirectory`가 모두 `.opencode\...`여야 한다.
- `ServerPortDefault`가 39741인지 확인한다.
