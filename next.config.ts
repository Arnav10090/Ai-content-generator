// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn-icons-png.flaticon.com"],
  },
  reactStrictMode: true,
  // Only expose what the browser genuinely needs
  env: {
    NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    NEXT_PUBLIC_MONTHLY_SUBSCRIPTION_PLAN_ID: process.env.NEXT_PUBLIC_MONTHLY_SUBSCRIPTION_PLAN_ID,
    NEXT_PUBLIC_YEARLY_SUBSCRIPTION_PLAN_ID: process.env.NEXT_PUBLIC_YEARLY_SUBSCRIPTION_PLAN_ID,
  },
};

export default nextConfig;