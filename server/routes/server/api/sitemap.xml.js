

export default defineEventHandler(async (event) => {
    const params = getQuery(event)
    let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>';
    xmlContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

    // Static URLs
    xmlContent += '<url><loc>https://www.easetrail.com/</loc></url>';
    // Add more static URLs here

    // Dynamic URLs
    // If you have dynamic routes, fetch their data here (e.g., blog posts, product pages)
    // and add them to the sitemap.

    xmlContent += '</urlset>';
    event.setHeader('Content-Type', 'application/xml');
    return xmlContent;
})
