# 제2강: 소버린 모델 구축법

> 파일명: content/lectures/chapter-02.md  
> 강의 레벨: 중급 (Intermediate)  
> 소요 시간: 약 25분  

---

## 1. 학습 목표

- 소형 언어 모델(sLLM)의 데이터 수집과 정제 절차를 익힙니다.
- LoRA(Low-Rank Adaptation)를 통한 저비용 미세조정(Fine-Tuning) 원리를 학습합니다.
- ONNX / GGUF 양자화를 통해 라즈베리 파이나 PC에서 구동하는 방법을 알아봅니다.

---

## 2. 모델 최적화 및 경량화 파이프라인

소버린 모델을 저사양 장치에 탑재하기 위해서는 아래의 4단계 압축 파이프라인을 거치게 됩니다.

```mermaid
flowchart LR
    A["1. 원천 데이터 정제\n(Q&A, 도메인 지식)"] --> B["2. LoRA 미세조정\n(어댑터 가중치 학습)"]
    B --> C["3. 4-bit / 8-bit 양자화\n(GGUF 변환)"]
    C --> D["4. 로컬 디바이스 탑재\n(CPU/NPU 오프라인 추론)"]
```

---

## 3. 양자화(Quantization) 코드 예제

아래는 HuggingFace와 BitsAndBytes 라이브러리를 활용해 16비트 모델을 4비트로 경량화하여 메모리 사용량을 1/4로 줄이는 예시입니다.

```bash
# 양자화 및 로컬 실행 도구 설치 예시
pip install bitsandbytes accelerate transformers
```

```python
# 파일명: quantize_example.py
import torch
from transformers import AutoModelForCausalLM, BitsAndBytesConfig

# 4비트 양자화 설정 (VRAM 4GB 미만에서도 동작 가능)
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_compute_dtype=torch.float16,
    bnb_4bit_quant_type="nf4"
)

print("성공적으로 저전력 소버린 모델 구성 준비가 완료되었습니다!")
```

---

## 4. 강의를 마치며

이제 여러분은 고가의 GPU 서버 없이도 누구나 자신만의 똑똑한 AI를 로컬에서 구동할 수 있는 핵심 지식을 갖추었습니다.  
다음 심화 과정에서는 실제 로봇과 IoT 기기에 AI를 연결하는 방법을 다룹니다!
