import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.ytimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "p19-common-sign-useastred.tiktokcdn-eu.com",
      },
    ],
  },
  experimental: {
    typedEnv: true
  }
};

export default nextConfig;
