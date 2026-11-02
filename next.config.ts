import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Required for static export: disables the built-in Image Optimization API
  // (which needs a Node server). Images are served as-is from /public/.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
