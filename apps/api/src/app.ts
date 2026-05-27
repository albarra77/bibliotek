import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { booksRouter } from './routes/books.js';

export const app = new Hono();

app.use(
  '*',
  cors({
    origin: ['http://localhost:5173'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  }),
);

app.get('/health', (c) => c.json({ ok: true, service: 'bibliotek-api' }));

app.route('/books', booksRouter);
