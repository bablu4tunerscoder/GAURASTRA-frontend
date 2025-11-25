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
<<<<<<< Updated upstream
        hostname: '192.168.1.8',
=======
        hostname: 'localhost',
        port: '9090',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
>>>>>>> Stashed changes
        port: '9090',
        pathname: '/**',
      },
    ],
  },
  
};

export default nextConfig;
