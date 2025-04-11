import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
  },
};

export default nextConfig;
