import type { NextConfig } from "next";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig: NextConfig = {
  // Standard Next.js config for Vercel deployment
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  // Enable ESLint and TypeScript checks during build
  // ESLint warnings won't fail the build, but errors will
  eslint: {
    ignoreDuringBuilds: false,
  },
  // TypeScript errors will fail the build
  typescript: {
    ignoreBuildErrors: false,
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
