import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const fontPretendard = localFont({
  src: [{ path: "../../public/PretendardVariable.woff2", style: "normal" }],
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "Tickets",
};

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontPretendard.className}>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
