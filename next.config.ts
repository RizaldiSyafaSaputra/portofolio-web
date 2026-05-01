import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

/**
 * Rizaldi.dev - Next.js Configuration
 * Minimalist Sentry v10 Integration
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

// Sentry configuration: 
// We use default options to let Sentry auto-detect settings from Environment Variables.
export default withSentryConfig(nextConfig);
