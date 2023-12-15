/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')(
  './src/i18n.ts'
);

// module.exports = withNextIntl({
//   reactStrictMode: true,
//   webpack: (config, options) => {
//     config.module.rules.push({
//       test: /\.(vert|frag)$/i,
//       use: 'raw-loader',
//     });
//     return config;
//   },
// }); 

const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(vert|frag)$/i,
      use: 'raw-loader',
    });
    return config;
  },
  reactStrictMode: true,
}

module.exports = withNextIntl(nextConfig)
