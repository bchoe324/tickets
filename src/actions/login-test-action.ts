import { NextApiResponse } from "next";

export default async function loginTestAction(res: NextApiResponse) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const response = await fetch(`/api/auth/test-login`, {
    method: "POST",
    credentials: "include",
    headers: headers,
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "로그인 실패");
  } else {
    console.log("로그인 성공");
    res.redirect(302, "/");
    // return { ok: true };
  }
}
