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
}

module.exports = withNextIntl(nextConfig)
