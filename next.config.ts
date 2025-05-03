import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["www.kopis.or.kr", "yiunuhkvhjflviekgwec.supabase.co"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://tickets-server-five.vercel.app/:path*",
      },
    ];
  },
};

export default nextConfig;
