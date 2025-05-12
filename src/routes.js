// Define application routes
import { renderPage } from './render.js';
import { fetchData } from './api.js';
import { getTranslations } from './i18n.js';

export function setupRoutes(fastify) {
  // Main route for SSR
  fastify.get('/', async (request, reply) => {
    try {
      // Extract locale from query param or default to 'en'
      const locale = request.query.locale || 'en';
      
      // Fetch data from our simulated API
      const apiData = await fetchData();
      
      // Get translations for the requested locale
      const translations = await getTranslations(locale);
      
      // Set Cache-Control header for HTML (5 minutes)
      reply.header('Cache-Control', 'public, max-age=300');
      
      // Render the page with the data and translations
      const html = renderPage(apiData, translations, locale);
      
      // Send the rendered HTML
      return reply.type('text/html').send(html);
    } catch (error) {
      fastify.log.error(error);
      return reply
        .code(500)
        .type('text/html')
        .send(`
          <html>
            <head>
              <title>Error</title>
              <link href="/public/css/tailwind.css" rel="stylesheet">
            </head>
            <body class="bg-gray-100 p-8">
              <div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
                <h1 class="text-2xl text-red-500 font-bold mb-4">Error</h1>
                <p>Something went wrong while processing your request. Please try again later.</p>
              </div>
            </body>
          </html>
        `);
    }
  });
}
