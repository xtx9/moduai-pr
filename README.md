# moduai-pr

프레젠테이션·프론트엔드·GitHub Pages 저장소

## AI 에이전트 (프로젝트 로컬 격리)

이 저장소는 OpenCode 설정·키·로그를 저장소 내부(`.opencode/`, `.env`)에만 두는 **로컬 격리** 환경을 사용한다.

| 에이전트 | 역할 |
|---|---|
| `mm-agents` | AI 설정·에이전트·플러그인·권한 관리 |
| `mm-pr` | 프레젠테이션·프론트엔드·GitHub Pages 저장소 |
| `mm-reviewer` | 규격·보안·권한 검토(읽기 전용) |

## 시작

```powershell
# 1) 키 입력 (최초 1회)
Copy-Item .env.example .env
# .env 를 열어 OPENCODE_API_KEY 등 실제 값 입력

# 2) 로컬 바이너리 설치 (최초 1회)
npm install --prefix .opencode

# 3) 격리 경로 점검
pwsh -ExecutionPolicy Bypass -File scripts/run-opencode.ps1 -Check

# 4) 실행 (기본 포트 39741)
pwsh -ExecutionPolicy Bypass -File scripts/run-opencode.ps1
```

## 문서

- `AGENTS.md` — 최상위 규칙 및 권한 매트릭스
- `docs/rule/R-00109 ai-agent-local-config.md` — 로컬 격리 규격
- `docs/rule/R-00110 directory-permissions.md` — 디렉토리 권한 규격
- 공용 기록: `E:/up/0-project/git/xtx9999/doc/AI/모두의ai/`
