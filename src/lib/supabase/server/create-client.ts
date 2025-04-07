import { createServerClient, serializeCookieHeader } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function createClient({
  req,
  res,
}: {
  req: NextRequest;
  res: NextResponse;
}) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return Object.keys(req.cookies).map((name) => ({
            name,
            value: req.cookies.get(name)?.value || "",
          }));
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.headers.append(
              "Set-Cookie",
              serializeCookieHeader(name, value, options)
            );
          });
        },
      },
    }
  );
  return supabase;
}
