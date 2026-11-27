# 제1강: 모두의 AI 시작하기

> 파일명: content/lectures/chapter-01.md  
> 강의 레벨: 입문 (Beginner)  
> 소요 시간: 약 15분  

---

## 1. 학습 목표

- 소버린 AI(Sovereign AI)의 정확한 개념과 필요성을 이해합니다.
- 거대 언어 모델(LLM)과 소형 특화 모델(sLLM)의 차이점을 파악합니다.
- 모두의 AI 개발 환경의 기초 구성을 살펴봅니다.

---

## 2. 소버린 AI란 무엇인가?

**소버린(Sovereign)**이란 '주권'을 의미합니다.  
즉, 나의 데이터와 지식을 타인의 서버에 넘겨주지 않고, **내가 완전히 제어하고 소유할 수 있는 나만의 인공지능**을 뜻합니다.

```python
# 파일명: sovereign_agent_sample.py
class SovereignAgent:
    """나만의 데이터를 안전하게 지키는 로컬 소버린 에이전트"""
    def __init__(self, agent_name: str, local_only: bool = True):
        self.agent_name = agent_name
        self.local_only = local_only
        print(f"[{self.agent_name}] 로컬 소버린 AI가 안전하게 기동되었습니다.")

    def process_sensitive_data(self, data: str) -> str:
        if self.local_only:
            # 외부 클라우드로 전송하지 않고 로컬에서만 추론
            return f"로컬 분석 완료: {len(data)}바이트의 데이터가 보호되었습니다."
        return "외부 전송 불가"

# 에이전트 실행 예시
agent = SovereignAgent(agent_name="모두의비서")
result = agent.process_sensitive_data("내 중요한 사업 계획서 내용...")
print(result)
```

---

## 3. 핵심 요약 및 퀴즈

> 📝 **체크 포인트**  
> 1. 왜 거대 LLM보다 소형 특화 모델이 소상공인에게 더 유리할까요?  
>    👉 **정답**: 값비싼 GPU 인프라 없이도 저사양 PC나 기계 내부 칩에서 무료로 상시 구동할 수 있기 때문입니다.  
> 2. moduai의 문서는 어떤 기술로 렌더링되나요?  
>    👉 **정답**: Marked.js와 Mermaid.js를 통해 마크다운에서 즉시 반응형 웹으로 변환됩니다.
