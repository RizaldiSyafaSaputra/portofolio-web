import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

/**
 * Rizaldi.dev - Next.js Configuration
 * Version: 16.2.4 (Turbopack)
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

// Sentry configuration for latest SDK (v10.x / Turbopack compatible)
export default withSentryConfig(nextConfig, {
  org: "rizaldi-dev",
  project: "portofolio-web",
  silent: true,
  // Note: Some legacy options like transpileClientSDK are removed in newer versions
  // and some are not yet supported with Turbopack.
});
