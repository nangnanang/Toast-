// 알림을 처리하는 함수
const sendNotification = (message, notificationHandler) => {
  notificationHandler(message); // 의존성 역전: 알림 처리 방식을 외부로 분리
};

// 알림 방식 1: 콘솔로 메시지 출력
const consoleNotifier = (message) => {
  console.log(`콘솔 알림: ${message}`);
};

// 알림 방식 2: 이메일로 알림 (실제 이메일 발송 대신 시뮬레이션)
const emailNotifier = (message) => {
  console.log(`이메일 발송: ${message} (가상 발송)`);
};

// 알림 방식 3: SMS 알림 (실제 SMS 발송 대신 시뮬레이션)
const smsNotifier = (message) => {
  console.log(`SMS 발송: ${message} (가상 발송)`);
};

sendNotification("긴급 공지: 서버 점검 예정", consoleNotifier); // 콘솔에 알림
sendNotification("계정 활성화 안내", emailNotifier); // 이메일로 알림
sendNotification("인증 코드: 123456", smsNotifier); // SMS로 알림
