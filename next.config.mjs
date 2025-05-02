/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        // This allows us to test the middleware locally
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: '(?<subdomain>.*?)\.localhost:3002',
            },
          ],
          destination: '/:path*',
        },
      ],
    }
  },
}

export default nextConfig 