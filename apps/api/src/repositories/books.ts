import { db } from '../db.js';
import type { Book, BookListResponse, CreateBookInput, UpdateBookInput } from '@bibliotek/shared';

export function findAll(page: number, limit: number): BookListResponse {
  const { total } = db.prepare('SELECT COUNT(*) as total FROM books').get() as { total: number };
  const data = db
    .prepare('SELECT * FROM books ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?')
    .all(limit, (page - 1) * limit) as Book[];
  return { data, total };
}

export function findById(id: number): Book | undefined {
  return db
    .prepare('SELECT * FROM books WHERE id = ?')
    .get(id) as Book | undefined;
}

export function create(input: CreateBookInput): Book {
  const stmt = db.prepare(
    'INSERT INTO books (title, author, year, isbn) VALUES (?, ?, ?, ?) RETURNING *',
  );
  return stmt.get(
    input.title,
    input.author,
    input.year ?? null,
    input.isbn ?? null,
  ) as Book;
}

export function update(id: number, input: UpdateBookInput): Book | undefined {
  const stmt = db.prepare(
    'UPDATE books SET title = ?, author = ?, year = ?, isbn = ? WHERE id = ? RETURNING *',
  );
  return stmt.get(input.title, input.author, input.year, input.isbn, id) as
    | Book
    | undefined;
}

export function remove(id: number): boolean {
  const result = db.prepare('DELETE FROM books WHERE id = ?').run(id);
  return result.changes > 0;
}
