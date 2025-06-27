// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // Core optimizations
//   compress: true,
//   // swcMinify and optimizeFonts are enabled by default in Next.js 14+
//
//   // Static export for frontend-only apps (optional - use if deploying to CDN)
//   // output: 'export',
//   // trailingSlash: true,
//   // images: { unoptimized: true }, // Required for static export
//
//   // OR use standalone for containerized deployment
//   output: process.env.NODE_APP_ENV === 'production' ? 'standalone' : undefined,
//
//   // Image optimization
//   images: {
//     formats: ['image/webp', 'image/avif'],
//     deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
//     imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
//     minimumCacheTTL: 31536000, // 1 year
//     dangerouslyAllowSVG: false,
//     contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
//   },
//
//   // Experimental features for better performance
//   experimental: {
//     optimizePackageImports: [
//       'lodash',
//       'date-fns',
//       'lucide-react',
//       '@heroicons/react',
//       // Add your heavy packages here
//     ],
//     // Next.js 14+ features
//     turbo: {
//       rules: {
//         '*.svg': {
//           loaders: ['@svgr/webpack'],
//           as: '*.js',
//         },
//       },
//     },
//   },
//
//   // Bundle analysis (only in development)
//   ...(process.env.ANALYZE === 'true' && {
//     webpack: (config) => {
//       config.plugins.push(
//         new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)({
//           analyzerMode: 'static',
//           openAnalyzer: false,
//         })
//       );
//       return config;
//     },
//   }),
//
//   // Webpack optimizations for frontend-only app
//   webpack: (config, { isServer, dev }) => {
//     // Since this is frontend-only, remove server-side polyfills
//     if (!isServer) {
//       config.resolve.fallback = {
//         ...config.resolve.fallback,
//         fs: false,
//         net: false,
//         tls: false,
//         crypto: false,
//         path: false,
//         os: false,
//         stream: false,
//         buffer: false,
//       };
//     }
//
//     // Production optimizations
//     if (!dev) {
//       config.optimization = {
//         ...config.optimization,
//         usedExports: true,
//         sideEffects: false,
//       };
//     }
//
//     return config;
//   },
//
//   // Security and performance headers
//   async headers() {
//     return [
//       {
//         source: '/(.*)',
//         headers: [
//           // Security headers
//           {
//             key: 'X-Content-Type-Options',
//             value: 'nosniff',
//           },
//           {
//             key: 'X-Frame-Options',
//             value: 'DENY',
//           },
//           {
//             key: 'X-XSS-Protection',
//             value: '1; mode=block',
//           },
//           {
//             key: 'Referrer-Policy',
//             value: 'strict-origin-when-cross-origin',
//           },
//           {
//             key: 'Permissions-Policy',
//             value: 'camera=(), microphone=(), geolocation=()',
//           },
//           // Your existing robots header
//           {
//             key: 'X-Robots-Tag',
//             value: 'noindex, nofollow',
//           },
//         ],
//       },
//       // HTTPS security (only in production)
//       ...(process.env.NODE_APP_ENV === 'production' ? [{
//         source: '/(.*)',
//         headers: [
//           {
//             key: 'Strict-Transport-Security',
//             value: 'max-age=63072000; includeSubDomains; preload',
//           },
//           {
//             key: 'Content-Security-Policy',
//             value: [
//               "default-src 'self'",
//               "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
//               "style-src 'self' 'unsafe-inline'",
//               "img-src 'self' data: https:",
//               "font-src 'self' data:",
//               "connect-src 'self'",
//               "frame-ancestors 'none'",
//             ].join('; '),
//           },
//         ],
//       }] : []),
//       // Cache static assets
//       {
//         source: '/static/(.*)',
//         headers: [
//           {
//             key: 'Cache-Control',
//             value: 'public, max-age=31536000, immutable',
//           },
//         ],
//       },
//       // Cache Next.js assets
//       {
//         source: '/_next/static/(.*)',
//         headers: [
//           {
//             key: 'Cache-Control',
//             value: 'public, max-age=31536000, immutable',
//           },
//         ],
//       },
//       // Cache images with corrected regex
//       {
//         source: '/images/:path*',
//         headers: [
//           {
//             key: 'Cache-Control',
//             value: 'public, max-age=31536000, immutable',
//           },
//         ],
//       },
//     ];
//   },
//
//   // Redirect configuration (if needed)
//   async redirects() {
//     return [
//       // Add your redirects here
//       // {
//       //   source: '/old-page',
//       //   destination: '/new-page',
//       //   permanent: true,
//       // },
//     ];
//   },
//
//   // Environment-specific configuration
//   env: {
//     // Add any environment variables you want to expose to the client
//     NEXT_PUBLIC_SECRET: process.env.NEXT_PUBLIC_SECRET,
//     // NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
//     // NEXT_PUBLIC_WEBSOCKET_URL: process.env.NEXT_PUBLIC_WEBSOCKET_URL,
//   },
// };
//
// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
    async headers() {
      return [
        {
          source: '/pdfs/:path*',
          headers: [
            {
              key: "X-Robots-Tag",
              value: "noindex, nofollow",
            },
          ],
        },
        // {
        //   source: '/pdfs/:path*',
        //   destination: '/api/pdf/:path*',
        // },
      ];
    },
  };

  export default nextConfig;
