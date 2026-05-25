import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      // Redirect legacy /uz path to / (Uzbek is now served at root)
      {
        source: "/uz",
        destination: "/",
        permanent: true, // 308
      },
      {
        source: "/uz/:path*",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
