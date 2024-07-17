/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    INSTAGRAM_CLIENT_ID: process.env.INSTAGRAM_CLIENT_ID,
    INSTAGRAM_CLIENT_SECRET: process.env.INSTAGRAM_CLIENT_SECRET,
    INSTAGRAM_REDIRECT_URI: process.env.INSTAGRAM_REDIRECT_URI,
  },
};

export default nextConfig;
