/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BACKEND_URL: process.env.NODE_ENV === 'production'
    ? "https://studypaq-assignment-backend.onrender.com"
    : "http://localhost:5001",
  }
}

module.exports = nextConfig
