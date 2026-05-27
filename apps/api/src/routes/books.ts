import { Hono } from 'hono';
import { CreateBookSchema, UpdateBookSchema } from '@bibliotek/shared';
import * as repo from '../repositories/books.js';

export const booksRouter = new Hono();

booksRouter.get('/', (c) => {
  return c.json(repo.findAll());
});

booksRouter.get('/:id', (c) => {
  const id = Number(c.req.param('id'));
  const book = repo.findById(id);
  if (!book) return c.json({ error: 'Libro no encontrado' }, 404);
  return c.json(book);
});

booksRouter.post('/', async (c) => {
  const body = await c.req.json();
  const parsed = CreateBookSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: 'Datos inválidos', issues: parsed.error.issues }, 400);
  }
  try {
    const book = repo.create(parsed.data);
    return c.json(book, 201);
  } catch (err: unknown) {
    if (isUniqueConstraintError(err)) {
      return c.json({ error: 'El ISBN ya está registrado en el catálogo' }, 409);
    }
    throw err;
  }
});

booksRouter.put('/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const body = await c.req.json();
  const parsed = UpdateBookSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: 'Datos inválidos', issues: parsed.error.issues }, 400);
  }
  try {
    const book = repo.update(id, parsed.data);
    if (!book) return c.json({ error: 'Libro no encontrado' }, 404);
    return c.json(book);
  } catch (err: unknown) {
    if (isUniqueConstraintError(err)) {
      return c.json({ error: 'El ISBN ya está registrado en el catálogo' }, 409);
    }
    throw err;
  }
});

booksRouter.delete('/:id', (c) => {
  const id = Number(c.req.param('id'));
  const deleted = repo.remove(id);
  if (!deleted) return c.json({ error: 'Libro no encontrado' }, 404);
  return new Response(null, { status: 204 });
});

function isUniqueConstraintError(err: unknown): boolean {
  return (
    err instanceof Error &&
    err.message.includes('UNIQUE constraint failed')
  );
}
