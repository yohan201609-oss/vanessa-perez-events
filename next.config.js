/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimizaciones para producción
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  
  // Configuración de imágenes
  images: {
    domains: [
      'images.unsplash.com',
      'cdn.sanity.io',
      // Agrega aquí otros dominios de imágenes que uses
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  // Excluir carpeta src/ del linting (archivos antiguos de React)
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['app', 'components', 'config', 'utils'],
  },
  
  // Headers de seguridad
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  },
  
  // Redirects si los necesitas
  async redirects() {
    return [
      // Ejemplo: redirigir www a no-www
      // {
      //   source: '/:path*',
      //   has: [{ type: 'host', value: 'www.yourdomain.com' }],
      //   destination: 'https://yourdomain.com/:path*',
      //   permanent: true,
      // },
    ]
  },
}

module.exports = nextConfig
