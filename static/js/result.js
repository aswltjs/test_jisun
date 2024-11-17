document.addEventListener("DOMContentLoaded", async function () {
  let storedResponses = localStorage.getItem("responses");
  if (!storedResponses) {
    document.getElementById("result").innerText = "저장된 데이터가 없습니다.";
    return;
  }

  const responses = JSON.parse(storedResponses);

  try {
    const response = await fetch("/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(responses),
    });

    if (response.ok) {
      const data = await response.json();
      displayResults(data.analysis);
    } else {
      document.getElementById("result").innerText =
        "결과를 불러오는데 실패했습니다.";
    }
  } catch (error) {
    document.getElementById("result").innerText =
      "결과를 불러오는데 실패했습니다.";
  }
});

function displayResults(analysis) {
  let resultText = `종합 분석 결과: ${analysis.요약}`;

  if (analysis.메인_카테고리) {
    resultText += `<br>주요 카테고리 분석: ${analysis.메인_카테고리}`;
  }

  if (analysis.유형) {
    resultText += `<br><strong>당신의 유형:</strong> ${analysis.유형}`;
  }

  if (analysis.설명 && analysis.설명.length > 0) {
    resultText += `<br><strong>상세 설명:</strong><br>`;
    analysis.설명.forEach((explanation) => {
      resultText += `- ${explanation}<br>`;
    });
  }

  document.getElementById("result").innerHTML = resultText;
}

function resetTest() {
  localStorage.removeItem("responses");
  localStorage.removeItem("questionCount");
  window.location.href = "/"; // 첫 문제 페이지로 이동
}
