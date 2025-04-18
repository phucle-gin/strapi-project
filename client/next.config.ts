import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "strapi-project-production-ff3b.up.railway.app",
        pathname: "/uploads/**",
      },
    ],
    domains: ['res.cloudinary.com'], // ← move this outside remotePatterns
  },
};

export default nextConfig;
