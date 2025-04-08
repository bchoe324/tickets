import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const AUTH_PAGES = ["/login", "/join"];

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;

  const isAuthPage = AUTH_PAGES.includes(new URL(req.url).pathname);

  // access token이 있음 = 로그인 상태
  if (accessToken) {
    if (isAuthPage) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // access token이 없고 refresh token이 있음 = access token 재발급 요청
  if (refreshToken) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/auth/refresh`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          cookie: req.headers.get("cookie") || "",
        },
      }
    );

    if (response.ok) {
      const nextResponse = NextResponse.next();
      const newCookies = response.headers.getSetCookie();

      newCookies?.forEach((cookie) => {
        nextResponse.headers.append("Set-Cookie", cookie);
      });
      if (isAuthPage) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      return nextResponse;
    }
    // 재발급 실패 시 로그인 페이지로 리다이렉트
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // access token과 refresh token이 없음 = 로그인 안된 상태
  if (!isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

// export const config = {
//   matcher: ["/((?!^$|login|join|_next/static|_next/image|favicon.ico).*)"],
// };
