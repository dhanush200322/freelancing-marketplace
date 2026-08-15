import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/projects', '/freelancers'],
      disallow: ['/dashboard', '/proposal', '/api', '/admin'],
    },
    sitemap: 'https://workmarket.demo/sitemap.xml',
  }
}
