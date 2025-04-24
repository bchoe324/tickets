"use client";

import loginAction from "@/actions/login-action";
import loginTestAction from "@/actions/login-test-action";
import Link from "next/link";
export default function Page() {
  return (
    <>
      <h2>로그인</h2>
      <form action={loginAction}>
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
        <button type="submit">이메일로 로그인</button>
      </form>
      <button
        className="w-full p-[14px] mt-layout text-white bg-zinc-400 rounded-[8px]"
        onClick={loginTestAction}
      >
        테스트 계정으로 로그인
      </button>
      <div>
        <Link href="/join">회원가입</Link>
      </div>
    </>
  );
}
