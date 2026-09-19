/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/config", "@repo/types", "@repo/ui", "@repo/utils", "@repo/validation"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "media.bloomandblossom.com"
      }
    ]
  }
};

module.exports = nextConfig;
