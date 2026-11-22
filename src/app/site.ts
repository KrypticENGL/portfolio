/** Public origin of the deployed site, e.g. https://example.com. Set NEXT_PUBLIC_SITE_URL at build time. */
export const SITE_URL = new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')
