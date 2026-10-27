import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // El proyecto vive en una subcarpeta: fijamos la raíz para que Next no tome el lockfile de arriba.
  turbopack: { root: __dirname },
  outputFileTracingRoot: __dirname,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
