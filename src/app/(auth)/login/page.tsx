"use client";

import loginAction from "@/actions/login-action";
import loginTestAction from "@/actions/login-test-action";
import InfoIcon from "@/assets/icons/InfoIcon";
import Loading from "@/components/common/loading";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
export default function Page() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [emailMsg, setEmailMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setEmailMsg("이메일을 입력해주세요.");
    } else if (!emailRegex.test(value)) {
      setEmailMsg("올바른 이메일 형식이 아닙니다.");
    } else {
      setEmailMsg("");
    }
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) {
      setPasswordMsg("비밀번호를 입력해주세요");
    } else if (value.length < 8) {
      setPasswordMsg("비밀번호는 최소 8자 이상이어야 합니다.");
    } else {
      setPasswordMsg("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        await loginAction(formData);
        router.push("/");
      } catch (error) {
        const e = error as Error & { code?: string };
        let toastMessage;
        switch (e.code as string) {
          case "INVALID_CREDENTIAL":
            toastMessage = "이메일 또는 비밀번호가 올바르지 않습니다.";
            break;
          case "USER_NOT_FOUND":
            toastMessage = "사용자를 찾을 수 없습니다.";
            break;
          default:
            toastMessage = "로그인에 실패했습니다.";
        }
        toast.error(toastMessage);
      }
    });
  };

  return (
    <>
      {isPending ? <Loading /> : null}
      <h2>로그인</h2>
      <form action={undefined} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="이메일을 입력하세요. (예: email@naver.com)"
            onChange={handleEmail}
          />
        </div>
        {emailMsg ? (
          <p className="error-message">
            <InfoIcon fill="currentColor" />
            <span>{emailMsg}</span>
          </p>
        ) : null}
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="비밀번호를 입력하세요. (8자 이상)"
            onChange={handlePassword}
          />
        </div>
        {passwordMsg ? (
          <p className="error-message">
            <InfoIcon fill="currentColor" />
            <span>{passwordMsg}</span>
          </p>
        ) : null}
        <button type="submit">이메일로 로그인</button>
      </form>
      <button
        className="w-full p-[14px] mt-[15px] text-white bg-zinc-400 rounded-[8px]"
        onClick={loginTestAction}
      >
        테스트 계정으로 로그인
      </button>
      <div className="link">
        <Link href="/join">회원가입</Link>
      </div>
    </>
  );
}
