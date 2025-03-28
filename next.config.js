/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'agent-presto-api.onrender.com'],
  },
};

module.exports = nextConfig;
