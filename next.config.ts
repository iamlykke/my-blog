import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/posts",
        permanent: true, // 308 редирект, лучше для SEO
      },
    ];
  },
};

export default nextConfig;
