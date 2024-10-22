/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: process.env.BASEPATH,
    redirects: async () => {
        return [
            {
                source: '/',
                destination: '/deal-management',
                permanent: true,
                locale: false
            }
        ]
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: process.env.NEXT_PUBLIC_API_HOST + '/:path*' // Proxy to Backend
            }
        ]
    },
    async headers() {
        return [
            {
                source: '/images/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable'
                    }
                ]
            }
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**'
            }
        ]
    },
    output: 'standalone'

}

export default nextConfig
