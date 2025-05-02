"use server";

import { redirect } from "next/navigation";

export default async function joinAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("name");

  if (!email || !password || !name) {
    throw new Error("모든 필드를 입력하세요.");
  }
  try {
    const response = await fetch(`/api/auth/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });
    const responseData = await response.json();

    if (!response.ok) {
      console.error("회원가입 실패 응답:", response.status, responseData);
      if (response.status === 409) {
        throw new Error(
          "이미 사용중인 이메일입니다. 다른 이메일을 사용해주세요."
        );
      } else {
        throw new Error(`${response.status}: 회원가입에 실패했습니다.`);
      }
    } else {
      console.log("회원가입 완료", response.status);
      redirect("/?joined=true");
    }
  } catch (error) {
    console.error(error);
  }
}
