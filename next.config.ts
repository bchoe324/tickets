import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["www.kopis.or.kr"],
  },
  async rewrites() {
    return [
      {
        source: "/api/openApi/:path*",
        destination: `https://www.kopis.or.kr/openApi/:path*`,
      },
    ];
  },
};

export default nextConfig;
