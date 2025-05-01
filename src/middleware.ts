import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const AUTH_PAGES = ["/login", "/join"];

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;

  const isAuthPage = AUTH_PAGES.includes(new URL(req.url).pathname);

  // access token이 있음 = 로그인 상태
  if (accessToken) {
    if (isAuthPage) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // access token과 refresh token이 없음 = 로그인 안된 상태
  if (!isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!^$|login|join|_next/static|_next/image|favicon.ico).*)"],
};
