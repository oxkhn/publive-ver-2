/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.NEXT_PUBLIC_API_HOST + "/:path*",
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api2/:path*",
        destination: process.env.NEXT_PUBLIC_API_HOST_2 + "/:path*",
      },
    ];
  },
  swcMinify: true,
};

export default nextConfig;
