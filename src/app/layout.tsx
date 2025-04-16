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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/pls1fpn.css" />
      </head>
      <body className={fontPretendard.className}>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
