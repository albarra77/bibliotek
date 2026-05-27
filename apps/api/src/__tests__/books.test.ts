import { describe, it, expect, beforeEach } from 'vitest';
import { app } from '../app.js';
import { db } from '../db.js';
import type { Book } from '@bibliotek/shared';

beforeEach(() => {
  db.exec('DELETE FROM books');
});

async function req(method: string, path: string, body?: unknown) {
  const init: RequestInit = { method, headers: { 'Content-Type': 'application/json' } };
  if (body !== undefined) init.body = JSON.stringify(body);
  return app.request(path, init);
}

describe('POST /books', () => {
  it('crea un libro con campos obligatorios', async () => {
    const res = await req('POST', '/books', { title: 'Dune', author: 'Frank Herbert' });
    expect(res.status).toBe(201);
    const book = await res.json() as Book;
    expect(book.id).toBeTypeOf('number');
    expect(book.title).toBe('Dune');
    expect(book.author).toBe('Frank Herbert');
    expect(book.year).toBeNull();
    expect(book.isbn).toBeNull();
    expect(book.created_at).toBeTypeOf('string');
  });

  it('crea un libro con todos los campos', async () => {
    const res = await req('POST', '/books', {
      title: 'Dune', author: 'Frank Herbert', year: 1965, isbn: '978-0-441-17271-9',
    });
    expect(res.status).toBe(201);
    const book = await res.json() as Book;
    expect(book.year).toBe(1965);
    expect(book.isbn).toBe('978-0-441-17271-9');
  });

  it('rechaza libro sin título', async () => {
    const res = await req('POST', '/books', { author: 'Alguien' });
    expect(res.status).toBe(400);
  });

  it('rechaza libro sin autor', async () => {
    const res = await req('POST', '/books', { title: 'Sin autor' });
    expect(res.status).toBe(400);
  });

  it('rechaza ISBN duplicado', async () => {
    await req('POST', '/books', { title: 'A', author: 'X', isbn: '111' });
    const res = await req('POST', '/books', { title: 'B', author: 'Y', isbn: '111' });
    expect(res.status).toBe(409);
  });

  it('permite múltiples libros sin ISBN', async () => {
    const r1 = await req('POST', '/books', { title: 'A', author: 'X' });
    const r2 = await req('POST', '/books', { title: 'B', author: 'Y' });
    expect(r1.status).toBe(201);
    expect(r2.status).toBe(201);
  });
});

describe('GET /books', () => {
  it('devuelve lista vacía cuando no hay libros', async () => {
    const res = await req('GET', '/books');
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual([]);
  });

  it('devuelve libros ordenados por created_at descendente', async () => {
    await req('POST', '/books', { title: 'Primero', author: 'A' });
    await req('POST', '/books', { title: 'Segundo', author: 'B' });
    const res = await req('GET', '/books');
    const books = await res.json() as Book[];
    expect(books[0]!.title).toBe('Segundo');
    expect(books[1]!.title).toBe('Primero');
  });
});

describe('GET /books/:id', () => {
  it('devuelve el libro por ID', async () => {
    const created = await (await req('POST', '/books', { title: 'Dune', author: 'Herbert' })).json() as Book;
    const res = await req('GET', `/books/${created.id}`);
    expect(res.status).toBe(200);
    expect((await res.json() as Book).title).toBe('Dune');
  });

  it('devuelve 404 para ID inexistente', async () => {
    const res = await req('GET', '/books/9999');
    expect(res.status).toBe(404);
  });
});

describe('PUT /books/:id', () => {
  it('actualiza todos los campos', async () => {
    const created = await (await req('POST', '/books', { title: 'Viejo', author: 'X' })).json() as Book;
    const res = await req('PUT', `/books/${created.id}`, {
      title: 'Nuevo', author: 'Y', year: 2000, isbn: null,
    });
    expect(res.status).toBe(200);
    const book = await res.json() as Book;
    expect(book.title).toBe('Nuevo');
    expect(book.year).toBe(2000);
  });

  it('limpia campos opcionales con null', async () => {
    const created = await (await req('POST', '/books', { title: 'A', author: 'X', year: 2020, isbn: '123' })).json() as Book;
    const res = await req('PUT', `/books/${created.id}`, { title: 'A', author: 'X', year: null, isbn: null });
    expect(res.status).toBe(200);
    const book = await res.json() as Book;
    expect(book.year).toBeNull();
    expect(book.isbn).toBeNull();
  });

  it('devuelve 404 para ID inexistente', async () => {
    const res = await req('PUT', '/books/9999', { title: 'A', author: 'B', year: null, isbn: null });
    expect(res.status).toBe(404);
  });

  it('rechaza ISBN duplicado al editar', async () => {
    const b1 = await (await req('POST', '/books', { title: 'A', author: 'X', isbn: 'isbn-1' })).json() as Book;
    await req('POST', '/books', { title: 'B', author: 'Y', isbn: 'isbn-2' });
    const res = await req('PUT', `/books/${b1.id}`, { title: 'A', author: 'X', year: null, isbn: 'isbn-2' });
    expect(res.status).toBe(409);
  });
});

describe('DELETE /books/:id', () => {
  it('elimina un libro existente y devuelve 204', async () => {
    const created = await (await req('POST', '/books', { title: 'A', author: 'X' })).json() as Book;
    const res = await req('DELETE', `/books/${created.id}`);
    expect(res.status).toBe(204);
    expect(await (await req('GET', `/books/${created.id}`)).status).toBe(404);
  });

  it('devuelve 404 para ID inexistente', async () => {
    const res = await req('DELETE', '/books/9999');
    expect(res.status).toBe(404);
  });
});
