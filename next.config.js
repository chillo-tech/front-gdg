/** @type {import('next').NextConfig} */
const nextConfig = {  
  reactStrictMode: true,
  output: "standalone",
  swcMinify: true,
  env: {
    ACCES_TOKEN: process.env.ACCES_TOKEN,
    API_URL: process.env.API_URL,
  }
}

module.exports = nextConfig
