/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
  },
  // Allow dynamic routes to be rendered on-demand
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
