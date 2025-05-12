// Main application entry point
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import { setupRoutes } from './src/routes.js';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create Fastify instance
const fastify = Fastify({
  logger: true
});

// Register static file serving
fastify.register(fastifyStatic, {
  root: join(__dirname, 'public'),
  prefix: '/public/',
  setHeaders: (res) => {
    // Set cache control for static assets (1 week)
    res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
  }
});

// Setup routes
setupRoutes(fastify);

// Start the server
const start = async () => {
  try {
    await fastify.listen({ port: 5000, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
