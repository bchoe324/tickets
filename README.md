# 🎟️ Tickets

**🔗 서비스 URL:** Tickets-719bb

**Tickets**는 공연 일정 기록을 위한 서비스로, 공연 정보 조회, 공연 리뷰 작성 등의 기능을 제공합니다.
기존의 모바일 앱을 참고하여 제작되었습니다.

<br />

## ✨ 주요 기능

- **공연 일정 관리:** 공연 일정을 추가, 조회, 수정, 삭제할 수 있습니다.
- **공연 정보 조회:** 예매 순위 및 상세 정보를 확인할 수 있습니다. (출처: 공연예술통합전산망)
- **공연 리뷰:** 사용자들이 남긴 공연 리뷰를 조회하고, 직접 작성할 수 있습니다.
- **마이페이지:** 프로필을 조회 및 수정할 수 있으며, 내가 작성한 리뷰를 관리할 수 있습니다.
- **회원가입 및 로그인:** Firebase Authentication을 이용하여 이메일로 가입 및 로그인이 가능합니다.

<br />

## 🛠️ 기술 스택

- **Frontend:** React, TypeScript
- **Backend:** Firebase (Firestore, Storage, Cloud Functions, Hosting, Authentication)

<br />

## 📌 주요 페이지

**1️⃣ 티켓 페이지 🎫**

<img src="./images/ticket.png" width="200" />

- 공연 일정을 추가, 조회, 수정, 삭제할 수 있습니다.

<br />

**2️⃣ 홈 페이지 🏠**

<img src="./images/home.png" width="200" />

- 공연 예매 순위 및 상세 정보를 제공합니다.
- 사용자들이 작성한 공연 리뷰를 확인할 수 있습니다.

<br />

**3️⃣ 마이페이지 👤**

<img src="./images/mypage.png" width="200" />

- 사용자 프로필을 조회하고 수정할 수 있습니다.
- 내가 작성한 리뷰 목록을 확인하고, 새 리뷰를 작성할 수 있습니다.

<br />

## 📂 프로젝트 구조

```
📦 tickets
├── 📂 public
├── 📂 src
│   ├── 📂 components        # 컴포넌트
│   ├── 📂 pages             # 페이지 컴포넌트
│   ├── 📂 hooks             # 커스텀 훅
│   ├── 📂 util              # 유틸리티 함수
│   ├── 📂 assets            # 이미지, 아이콘 등
│   ├── 📜 App.tsx           # 라우트 설정
│   ├── 📜 App.css           # css 초기화, 공통 스타일
├── 📂 functions             # Firebase Cloud Functions 코드
│   ├── 📂 src               # API Proxy 함수
│   └── 📜 package.json      # Functions 관련 의존성 파일
├── 📂 dist                  # 빌드된 파일
├── 📜 firebase.json         # Firebase 설정
└── 📜 index.html
```
