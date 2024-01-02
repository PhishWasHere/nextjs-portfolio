/** @type {import('next').NextConfig} */

const withNextIntl = require('next-intl/plugin')(
  './src/i18n.ts'
);
 
const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(vert|frag)$/i,
      use: 'raw-loader',
    });
    return config;
  },
  reactStrictMode: false,
  env: {
    EMAIL_SEND: process.env.EMAIL_SEND,
    EMAIL_PASS: process.env.EMAIL_PASS,
    EMAIL_USER: process.env.EMAIL_USER
  }
}

module.exports = withNextIntl(nextConfig)
