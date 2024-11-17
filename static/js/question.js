// 선택된 답변을 저장할 객체
let responses = JSON.parse(localStorage.getItem("responses")) || {};

// 페이지 전환 횟수를 추적할 변수
let questionCount = parseInt(localStorage.getItem("questionCount")) || 0;
const maxQuestions = 15;

// HTML 요소 참조
const resultElement = document.getElementById("result");
const counterElement = document.getElementById("counter");

// 응답 선택 시 호출되는 함수
function selectAnswer(event, question, answer, nextPage) {
  event.preventDefault(); // 기본 링크 동작 방지

  // 응답 저장
  responses[question] = answer;
  questionCount++;

  // 로컬 스토리지에 응답과 카운터 저장
  localStorage.setItem("responses", JSON.stringify(responses));
  localStorage.setItem("questionCount", questionCount);

  // 카운터 업데이트
  updateCounter(questionCount);

  // 질문이 15개 선택되면 결과 제출
  if (questionCount >= maxQuestions) {
    submitResponses();
  } else {
    window.location.href = nextPage;
  }
}

// 항목 선택 시 카운터 증가 없이 페이지 이동
function selectAnswerWithoutCounter(event, question, answer, nextPage) {
  event.preventDefault(); // 기본 링크 동작 방지

  // 응답 저장
  responses[question] = answer;
  localStorage.setItem("responses", JSON.stringify(responses));

  // 페이지 이동
  window.location.href = nextPage;
}

// 서버에 응답 전송 및 결과 처리
async function submitResponses() {
  try {
    const response = await fetch("/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(responses),
    });

    if (response.ok) {
      const analysis = await response.json();
      displayResults(analysis);
    } else {
      console.error("Failed to submit responses:", response.statusText);
    }
  } catch (error) {
    console.error("Error submitting responses:", error);
  }
}

// 결과 텍스트 업데이트
function displayResults(analysis) {
  let resultText = `종합 분석 결과: ${analysis.요약}`;

  if (analysis.메인_카테고리) {
    resultText += `, 주요 카테고리 분석: ${analysis.메인_카테고리}`;
  }

  if (analysis.설명) {
    resultText += `\n상세 설명:\n${analysis.설명.join("\n")}`;
  }

  resultElement.innerText = resultText;
  hideQuestions();
  showResultsButton();
}

// 페이지 로드 시 초기화 및 설정
document.addEventListener("DOMContentLoaded", function () {
  updateCounter(questionCount);
  createResetButton();

  // 페이지 전환 횟수가 15 이상인 경우 처리
  if (questionCount >= maxQuestions) {
    hideQuestions();
    showResultsButton();
  }
});

// 질문 숨기기
function hideQuestions() {
  const questionContainer = document.getElementById("question-container");
  if (questionContainer) {
    questionContainer.style.display = "none";
  }
}

// 결과 보기 버튼 표시
function showResultsButton() {
  const resultButton = document.createElement("button");
  resultButton.textContent = "결과 보기";
  resultButton.onclick = showResults;
  document.body.appendChild(resultButton);
}

// 결과 페이지로 이동
function showResults() {
  window.location.href = "/result.html"; // 결과 페이지로 이동
}

// 선택 초기화 버튼 생성
function createResetButton() {
  const resetButton = document.createElement("button");
  resetButton.textContent = "선택 초기화";
  resetButton.onclick = resetPageTransitions;
  document.body.appendChild(resetButton);
}

// 페이지 전환 횟수 초기화 및 새로고침
function resetPageTransitions() {
  localStorage.removeItem("responses");
  localStorage.removeItem("questionCount");
  questionCount = 0;
  responses = {};
  updateCounter(questionCount);
  location.reload();
}

// 카운터 업데이트
function updateCounter(value) {
  if (counterElement) {
    counterElement.textContent = `문항 ${value} / ${maxQuestions}`;
  }
}

// 스타일 추가
const style = document.createElement("style");
style.innerHTML = `
  #result {
    margin-top: 20px;
    font-size: 20px;
    font-weight: bold;
    color: green;
  }
  #counter {
    font-size: 18px;
    margin-bottom: 10px;
  }
  button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
  }
  button:hover {
    background-color: #0056b3;
  }
`;
document.head.appendChild(style);
