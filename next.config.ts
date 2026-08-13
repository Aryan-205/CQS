import type { NextConfig } from "next";
import { buildRedirects } from "./lib/redirects";

const nextConfig: NextConfig = {
  // Imagery is still served from the live WordPress media library while the
  // assets are migrated. Every URL used by the rebuild is recorded in
  // content.md Section 7 and surfaced through lib/media.ts.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.compqsoft.com", pathname: "/wp-content/**" },
    ],
  },
  async redirects() {
    return buildRedirects();
  },
};

export default nextConfig;
