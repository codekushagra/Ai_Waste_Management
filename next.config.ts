import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env:{
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID: process.env.WEB3_AUTH_CLIENT_ID,
  }
};

export default nextConfig;
