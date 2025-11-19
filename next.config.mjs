/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'backend.gaurastra.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '192.168.1.6',
        port: '9090',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '192.168.1.8',
        port: '9090',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
