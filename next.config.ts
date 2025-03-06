import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async middleware() {
    return {
      // Apply middleware globally
      '/': ['src/middleware/middleware'],  // Apply to all routes
    };
  },
};

export default nextConfig;
