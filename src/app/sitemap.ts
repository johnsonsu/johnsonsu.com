import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://johnsonsu.com'

    return [
        {
            url: baseUrl,
            lastModified: new Date('2026-03-09'),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${baseUrl}/works`,
            lastModified: new Date('2026-03-09'),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ]
}
