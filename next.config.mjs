/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  experimental: {
    // optimizeCss is now generally enabled by default in Next.js 13+
    // or handled by PostCSS. You might not need it explicitly here.
    // optimizeCss: true,
    optimizePackageImports: ['framer-motion', 'lucide-react', '@radix-ui/react-select'],
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Add this line
        port: '',
        pathname: '/**', // Allows any path on Unsplash images
      },
      // Keep any other remotePatterns you might have configured
      // For example, if you had other domains before:
      // {
      //   protocol: 'https',
      //   hostname: 'example.com',
      //   port: '',
      //   pathname: '/my-images/**',
      // },
    ],
  },

  // Compression (generally handled by Next.js/servers in production)
  compress: true,

  // Headers for better performance and SEO
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
};

export default nextConfig;