# 제1강: 모두의 AI 시작하기

> 파일명: content/lectures/chapter-01.md  
> 강의 레벨: 입문 (Beginner)  
> 소요 시간: 약 15분  

---

## 1. 학습 목표

- 소버린 AI(Sovereign AI)의 개념과 필요성을 이해합니다.
- 거대 언어 모델(LLM)과 소형 특화 모델(sLLM)의 차이점을 파악합니다.
- 모두의 AI 개발 환경의 기초 구성을 살펴봅니다.

---

## 2. 소버린 AI란 무엇인가?

소버린(Sovereign)이란 독립적인 주권을 의미합니다.  
나의 민감한 데이터와 도메인 지식을 외부 서버에 넘겨주지 않고, **사용자가 직접 제어하고 소유하는 인공지능 환경**을 뜻합니다.

```python
# 파일명: sovereign_agent_sample.py
class SovereignAgent:
    """나만의 데이터를 안전하게 보호하는 로컬 소버린 에이전트"""
    def __init__(self, agent_name: str, local_only: bool = True):
        self.agent_name = agent_name
        self.local_only = local_only
        print(f"[{self.agent_name}] 로컬 소버린 AI가 초기화되었습니다.")

    def process_sensitive_data(self, data: str) -> str:
        if self.local_only:
            # 외부 전송 없이 로컬에서만 안전하게 추론
            return f"로컬 분석 완료: {len(data)}바이트의 데이터가 보호되었습니다."
        return "외부 전송 차단됨"

# 에이전트 실행 예시
agent = SovereignAgent(agent_name="모두의비서")
result = agent.process_sensitive_data("내 중요한 사업 계획서 내용...")
print(result)
```

---

## 3. 핵심 요약

1. **소형 특화 모델의 이점**: 고가의 GPU 인프라 없이도 저사양 PC나 엣지 장치에서 상시 구동이 가능합니다.
2. **웹 플랫폼 구조**: Marked.js와 Mermaid.js를 통해 마크다운 문서를 실시간 웹 화면으로 렌더링합니다.
