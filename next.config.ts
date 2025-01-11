import type { NextConfig } from 'next'
import withPWA from '@ducanh2912/next-pwa'

const config: NextConfig = {
  reactStrictMode: true,
}

const nextConfig = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
})(config)

export default nextConfig

