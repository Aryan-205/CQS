import type { NextConfig } from "next";
import { buildRedirects } from "./lib/redirects";

const nextConfig: NextConfig = {
  async redirects() {
    return buildRedirects();
  },
};

export default nextConfig;
