import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Phanishwar Lal — KrypticENGL',
    short_name: 'KrypticENGL',
    start_url: '/',
    display: 'browser',
    background_color: '#f4f4f2',
    theme_color: '#f4f4f2',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
