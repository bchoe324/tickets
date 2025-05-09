export default async function loginTestAction() {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  try {
    const response = await fetch(`/api/auth/test-login`, {
      method: "POST",
      credentials: "include",
      headers: headers,
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "로그인 실패");
    }
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : String(error) || "로그인 실패"
    );
  }
}
