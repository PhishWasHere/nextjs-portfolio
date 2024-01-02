// next sitemap not working with i18n

import { MetadataRoute } from 'next' 

export default function sitemap(): MetadataRoute.Sitemap {
  const url = process.env.SITE_URL || 'https://miran-yasunori.com'
  return [
    {
      url: `${url}/`,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${url}/en/about`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${url}/en/projects`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${url}/en/contact`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${url}/jp/about`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${url}/jp/projects`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${url}/jp/contact`,
      lastModified: new Date(),
      priority: 0.8,
    }
  ]
}