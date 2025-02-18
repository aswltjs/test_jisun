import requests

# 서버 URL 설정
url = "http://localhost:8000/submit"

# JSON 응답 데이터 설정
responses = {
    "하루에 몇 번의 식사를 하시나요?": "3번",
    "평균적으로 몇 시간의 수면을 하시나요?": "6~8시간",
    "일주일에 주 몇 회 운동을 하시나요?": "3회 이상",
    "당신은 요즘 감정 기복이 좋았다가 나빴다가를 반복하는 편인가요?": "그렇지 않다.",
    "집에 혼자 있을 떄 주로 어떤 쪽으로 시간을 보내나요?": "자기개발",
    "당신이 주로 기분 전환으로 하는 행동과 가까운 것은 어느 쪽인가요?": "운동 및 드라이브나 야외활동",
    "하루에 직장에서의 지내는 시간은 어느 정도인가요?": "8시간 이하",
    "하루에 집에서 보내는 시간은 어느 정도 인가요?": "12시간 이하",
    "당신은 새로운 도전을 하는 것과 기존의 안정함을 유지하는 것 중에 어떤 타입인가요?": "새로운 도전",
    "당신은 생각지도 못한 일이 생겼을 때 어떻게 대처하는 편인가요?": "기존의 안정함 유지",
    "내가 일을 하면서 혹은 일을 시작하려고 할 때 더 중요하게 느끼는 부분이 더 가까운 것은 어떤 것인가요?": "성취감에서 오는 보상",
    "당신이 요즘 신경을 쓰는 것과 가까운쪽은?": "건강",
    "당신은 요즘 잠에 들 때 평균적으로 얼마나 걸리나요?": "1~5분",
    "나는 요즘 내가 하는 일에 불안감을 느낀다": "아니다.",
    "당신은 요즘 혼자라고 생각이 들때가 있나요?": "아니다.",
    "당신이 지내는 곳의 환경은 항상 정돈되어 있나요?(직장 혹은 집)": "정돈된 편이다.",
    "당신은 힘들 때 주변에 조언을 구하는 편인가요?": "가족 혹은 친구에게 조언을 구하는 편이다.",
    "당신은 자신의 이야기를 타인에게 잘하는 편인가요": "대체적으로 잘하는 편이다.",
    "당신은 사람들과 있을 때 주로 하는 이야기는 어떤 것인가요?": "대체적으로 잘하는 편이다.",
    "당신은 주변 사람들의 행동과 말에 영향을 많이 받는 편인가요?": "아니다.",
    "당신은 기존에 알던 사람들 외에 관계를 더 이어가려고 하는 편인가요 그렇지 않은 편인가요?": "새로운 사람과 인연을 만나는 건 즐겁다.",
    "당신은 처음 만난 사람에게 먼저 말을 거는 편인가요?": "그런편이다.",
    "당신이 직장에서 일을 할때 더 스트레스 받는 부분은 어떤것인가요?": "과도한 업무",
    "지금 현재 상황에 나에게 제일 중요한 우선순위는 무엇인가요?": "직장에서의 성과,취업 혹은 학업",
    "주변에서 당신에게 기대를 많이 하는 편인가요?": "아니다.",
    "친구나 지인이 sns에 게시물을 업로드 했을 때 어떤 생각이 드나요?": "아무생각이 없다.",
    "당신은 밖에서의 성격과 집에 있을 때 성격이 다른 편인가요?": "아니다.",
    "주변에 기대에 못 미칠 떄 드는 생각은 어떤 것인가요?": "상관없다.",
    "당신은 자신만의 기준이 높은 편인가요?": "아니다.",
    "당신은 일,시험 등 뜻대로 되지 않거나 실패,불합격 등에 어떻게 받아들이는 편인가요?": "극복하려고 한다.",
    "당신은 중요한 계획이나(시험,취업 준비 등)일 때 주변 환경에 어떤 쪽으로 행동하나요?": "평소와 변화는 없다.",
    "당신은 타인에게 의식을 많이 하는 편인가요?": "아니다.",
    "당신은 계획을 세울 때 주로 어떤 스타일인가요?": "미리 계획을 해두며 다른 대비책도 만들어 놓는 스타일.",
    "나는 지금 상황에 만족하고 있다.": "그렇다.",
    "당신은 나에게 보상이 오지 않더라도 성취감을 느낄 수 있으면 보람을 느끼나요?.": "그렇다.",
    "당신은 결과가 좋으면 과정은 별로 중요하지 않다고 생각하나요?.": "그렇지 않다.",
    "당신은 실패를 한 경험이 있나요?": "그렇다.",
    "당신이 성취를 통해 얻는 보상심리 중 더 선호 하는 쪽은?": "자존감, 사회적 인정.",
    "나는 자기개발에 무리하더라도 투자하는 편이다.": "그런편이다.",
    "당신은 현재가 중요한가요 미래가 중요한가요?": "미래가 중요"
}

# POST 요청 보내기
response = requests.post(url, json=responses)

# 결과 확인
if response.status_code == 200:
    print("응답:", response.text)
else:
    print("에러 발생:", response.status_code)
