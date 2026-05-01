import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

/**
 * Rizaldi.dev - Next.js Configuration
 * Optimized for Production & Monitoring
 */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'cdn.simpleicons.org',
      }
    ],
  },
};

// Sentry configuration for Next.js 10+ (Merged Arguments)
export default withSentryConfig(nextConfig, {
  org: "rizaldi-dev",
  project: "portofolio-web",
  silent: true,
  widenClientFileUpload: true,
  transpileClientSDK: true,
  tunnelRoute: "/monitoring",
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
});
