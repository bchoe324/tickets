export default async function loginAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (!email || !password) {
    throw new Error("모든 필드를 입력하세요.");
  }

  try {
    const response = await fetch(`api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: headers,
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      const error = new Error(data.code || "로그인 실패") as Error & {
        code?: string;
      };
      error.code = data.code;
      throw error;
    }
  } catch (error) {
    throw error;
  }
}
