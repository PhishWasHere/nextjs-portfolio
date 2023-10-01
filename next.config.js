/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/v1:path*',
                destination: `${process.env.URL}/api/v1:path*`,
            }
        ]
    }
}

module.exports = nextConfig
