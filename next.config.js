/** @type {import('next').NextConfig} */
const nextConfig = {  
  reactStrictMode: true,
  output: "standalone",
  swcMinify: true,
  env: {
    ACCES_TOKEN: process.env.ACCES_TOKEN,
    API_URL: process.env.API_URL,
  },
  async rewrites() {
    return [
      {
        source: '/items/:path',
        destination: `${process.env.API_URL}/items/:path`,
      },
    ]
  },
}

module.exports = nextConfig
