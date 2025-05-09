import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const AUTH_PAGES = ["/login", "/join"];

export async function middleware(req: NextRequest) {
  // /api 경로는 미들웨어 통과
  if (new URL(req.url).pathname.startsWith("/api")) return NextResponse.next();

  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;

  const isAuthPage = AUTH_PAGES.includes(new URL(req.url).pathname);

  console.log("middleware - accessToken", accessToken);
  console.log("middleware - refreshToken", refreshToken);

  // access token이 있음 = 로그인 상태
  if (accessToken) {
    if (isAuthPage) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // access token이 없고 refresh token이 있음 = access token 재발급 요청

  // access token과 refresh token이 없음 = 로그인 안된 상태
  if (!isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!^$|login|join|_next/static|_next/image|favicon.ico).*)"],
};
