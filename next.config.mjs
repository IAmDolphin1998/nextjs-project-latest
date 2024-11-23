/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_STRAPI_PROTOCOL,
        hostname: process.env.NEXT_PUBLIC_STRAPI_HOSTNAME,
        port: process.env.NEXT_PUBLIC_STRAPI_PORT,
        pathname: process.env.NEXT_PUBLIC_STRAPI_IMAGEPATHNAME,
      },
    ],
  },
};

export default nextConfig;
