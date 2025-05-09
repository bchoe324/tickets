import { cookies } from "next/headers";

export default async function refreshAccessToken() {
  const cookieStore = await cookies();
  const refresh_token = cookieStore.get("refresh_token")?.value;
  console.log("refresh token", refresh_token);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/auth/refresh`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${refresh_token}`,
        },
      }
    );
    if (!response.ok) throw new Error("refreshing token failed");
  } catch (error) {
    console.error("Error refreshing access token", error);
  }
}
