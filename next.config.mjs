/** @type {import('next').NextConfig} */
const nextConfig = {

  output: 'export',

  images:{
    remotePatterns:[

      {
        protocol:'https',
        hostname:'res.cloudinary.com'
      }

    ]
  },

  reactStrictMode: true,
};

export default nextConfig;
