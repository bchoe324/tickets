import joinAction from "@/actions/join-action";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <h2>회원가입</h2>
      <form action={joinAction}>
        <div>
          <label htmlFor="name">이름</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="이름을 입력하세요"
          />
        </div>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="이메일을 입력하세요."
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        <button type="submit">이메일로 회원가입</button>
      </form>
      <div>
        <Link href="/login">로그인</Link>
      </div>
    </>
  );
}
