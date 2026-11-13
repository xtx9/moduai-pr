# 변경 상세 — moduai-pr AI 에이전트 로컬 격리·권한 설정

- 일시: 2026-11-05 05:55:24
- 요청: 모두의 AI 저장소별 AI 에이전트 로컬 격리 및 디렉토리 권한 정의
- 대상: `moduai-pr` (프레젠테이션·프론트·GitHub Pages)

## 변경
- `.opencode/opencode.json` 신규
- 에이전트 3종: `mm-agents`, `mm-pr`, `mm-reviewer`
- `mm-pr`은 전체 쓰기 가능하나 `.github/workflows/`는 `deny`
- 기본 포트 `39741`, XDG 로컬 격리 런처
- `AGENTS.md`, R-00109, R-00110, README, docs 기록 뼈대

## 검증
- JSON 파싱 성공, `-Check` 경로·포트 확인, 토큰 잔존 0건

## 롤백
- 신규 파일 제거 또는 이전 커밋 복원
