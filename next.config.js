/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/v1:path*',
                destination: `${process.env.URL}/:path*`,
            }
        ]
    }
}

module.exports = nextConfig
