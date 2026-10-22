import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/infocob",
  images: { unoptimized: true },
  turbopack: { root: __dirname },
};

export default nextConfig;
