import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blog-images.0maru.dev',
      },
    ],
  },
};

export default nextConfig;
