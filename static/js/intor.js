document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("start");

  startButton.addEventListener("click", function () {
    localStorage.setItem("pageTransitions", 0); // 테스트 시작 시 선택 횟수를 초기화
    console.log("시작하기 버튼 클릭됨"); // 디버깅을 위한 로그 출력
  });
});

window.onload = function () {
  const introSequence = [
    { id: "intro", delay: 1000 },
    { id: "intro-1", delay: 4000 },
    { id: "intro-2", delay: 7000 },
    { id: "intro-3", delay: 10000 },
  ];

  introSequence.forEach(({ id, delay }) => {
    setTimeout(() => {
      const introElement = document.getElementById(id);
      introElement.style.opacity = "1";
      setTimeout(() => {
        introElement.style.opacity = "0";
      }, 2000); // 각 인트로 메시지 2초 동안 유지
    }, delay);
  });

  // 마지막 인트로 메시지가 사라진 후 "시작하기" 버튼을 표시
  setTimeout(() => {
    const startButton = document.getElementById("start");
    startButton.style.opacity = "1"; // 버튼 보이기
    startButton.style.pointerEvents = "auto"; // 버튼 클릭 가능하게 설정
    console.log("시작하기 버튼 보임"); // 디버깅을 위한 로그 출력
  }, 13000); // 13초 후 "시작하기" 버튼 보이기
};
