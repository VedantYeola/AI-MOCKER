/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_DRIZZLE_DATABASE_URL: process.env.NEXT_DRIZZLE_DATABASE_URL,
  },
};

export default nextConfig;
