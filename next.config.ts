import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn-icons-png.flaticon.com"],
  },
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    NEXT_PUBLIC_RAZORPAY_MONTHLY_PLAN_ID: process.env.MONTHLY_SUBSCRIPTION_PLAN_ID,
    NEXT_PUBLIC_RAZORPAY_YEARLY_PLAN_ID: process.env.YEARLY_SUBSCRIPTION_PLAN_ID,
  },
  /* config options here */
};

export default nextConfig;
