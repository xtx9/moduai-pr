# moduai 시스템 아키텍처

> 파일명: content/intro/02-architecture.md  
> 최종 수정일: 2026-11-27  
> 분류: 시스템 아키텍처  

---

## 1. 6개 독립 저장소 연계 구조

모두의 AI 프로젝트는 역할과 책임을 명확히 분리한 6개의 특화 저장소로 구성되어 있습니다.

```mermaid
flowchart TD
    Hub["moduai (종합 컨트롤 타워 & 메타 관리)"] --> Dev["moduai-dev (개발 환경 & 빌드 구성)"]
    Hub --> PR["moduai-pr (프리젠테이션 & 웹 배포)"]
    Hub --> Report["moduai-Report (멘토링 및 비공개 소통)"]
    Hub --> CDN["moduai-cdn (무료 정적 에셋 자료실)"]
    Hub --> Doc["moduai-doc (개발 기술 지식 아카이브)"]
```

---

## 2. 웹 서비스 및 배포 파이프라인

`moduai-pr`은 정적 호스팅의 장점을 극대화하여 GitHub Pages와 Cloudflare를 통해 빠른 페이지 렌더링을 제공합니다.

```mermaid
sequenceDiagram
    autonumber
    actor User as 방문자 브라우저
    participant CF as Cloudflare (DNS/CDN)
    participant GH as GitHub Pages (xtx9.github.io)
    participant App as Markdown Viewer (브라우저)

    User->>CF: moduai-pr.smartflex.org 접속 요청
    CF->>GH: 정적 HTML/CSS/JS 파일 전송
    GH-->>User: index.html 또는 docs.html 반환
    User->>App: content/navigation.json 및 .md Fetch
    App-->>User: 실시간 HTML 파싱 + Mermaid 다이어그램 렌더링
```

---

## 3. 저장소별 세부 역할 명세

1. **`moduai`**: 전체 프로젝트의 총괄 컨트롤 타워 및 규칙(AGENTS.md) 수립
2. **`moduai-pr`**: 사업 소개, 개발 레퍼런스와 플랫폼 구축 기록을 제공하는 공식 사이트
3. **`moduai-dev`**: 실제 AI 모델 학습 및 로컬/GCP 서버 배포 코드베이스
4. **`moduai-cdn`**: 이미지, 문서, 대용량 정적 에셋을 위한 무과금 CDN 허브
5. **`moduai-doc`**: 프롬프트 엔지니어링 및 오픈소스 모델 튜닝 지식 저장소
6. **`moduai-Report`**: 정부 지원사업(모두의 창업) 주관기관 및 멘토 전용 비공개 보고서
