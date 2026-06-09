import type { Book, BookListResponse, CreateBookInput, UpdateBookInput } from '@bibliotek/shared';

const BASE = '/api/books';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw Object.assign(new Error(body.error ?? res.statusText), { status: res.status, body });
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export async function listBooks(params?: { page?: number; limit?: number }): Promise<BookListResponse> {
  const qs = params
    ? `?${new URLSearchParams({ page: String(params.page ?? 1), limit: String(params.limit ?? 5) })}`
    : '';
  return handleResponse(await fetch(`${BASE}${qs}`));
}

export async function getBook(id: number): Promise<Book> {
  return handleResponse(await fetch(`${BASE}/${id}`));
}

export async function createBook(input: CreateBookInput): Promise<Book> {
  return handleResponse(
    await fetch(BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    }),
  );
}

export async function updateBook(id: number, input: UpdateBookInput): Promise<Book> {
  return handleResponse(
    await fetch(`${BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    }),
  );
}

export async function deleteBook(id: number): Promise<void> {
  return handleResponse(await fetch(`${BASE}/${id}`, { method: 'DELETE' }));
}
