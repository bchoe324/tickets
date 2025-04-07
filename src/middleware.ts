import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { createClient } from "./lib/supabase/server/create-client";

export async function middleware(req: NextRequest) {
  console.log("미들웨어 실행");
  const res = NextResponse.next();
  const supabase = createClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("user", user);
  if (!user) {
    console.log("로그인 페이지로 리다이렉트");
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return res;
}

export const config = {
  matcher: ["/tickets/:path*"],
};
