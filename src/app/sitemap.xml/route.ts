
import { NextResponse } from 'next/server';
export async function GET() {


    const baseUrl = ''
   
    // 👇 Define URLs with their custom priority
    const staticUrls = [
        { path: '/', priority: '1.00' },
        { path: '/store', priority: '0.80' },
        { path: '/blog', priority: '0.70' },
        { path: '/search', priority: '0.70' },
        { path: '/category/beauty-personal-care', priority: '0.75' },
       
        // static info pages with older lastmod
        { path: '/about', priority: '0.60', lastmod: '2025-06-20' },
        { path: '/contact-us', priority: '0.60', lastmod: '2025-06-20' },
        { path: '/faq', priority: '0.60', lastmod: '2025-06-20' },
    ];





  const allUrls = [...staticUrls];

    // 🧾 Build XML dynamically
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       ${allUrls
    .map(({ path, priority, lastmod }: { path: string; priority: string; lastmod?: string }) => `
    <url>
      <loc>${baseUrl}${path}</loc>
      <lastmod>${lastmod}</lastmod>
      <priority>${priority}</priority>
    </url>`)
    .join('')}
        </urlset>`;

    return new NextResponse(sitemap, {
        status: 200,
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}


