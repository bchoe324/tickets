import { redirect } from "next/navigation";

export default async function loginAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (!email || !password) {
    throw new Error("모든 필드를 입력하세요.");
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/auth/login`,
    {
      method: "POST",
      credentials: "include",
      headers: headers,
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "로그인 실패");
  } else {
    console.log("로그인 성공");
    redirect("/");
  }
}
