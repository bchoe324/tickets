export default async function loginTestAction() {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/auth/test-login`,
    {
      method: "POST",
      credentials: "include",
      headers: headers,
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "로그인 실패");
  } else {
    console.log("로그인 성공");
    return { ok: true };
  }
}
