import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { Book } from '@bibliotek/shared';
import { listBooks, deleteBook } from '../api/books.js';
import { BookList } from '../components/BookList.js';
import { Pagination } from '../components/Pagination.js';

export function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Math.max(1, Number(searchParams.get('page') ?? '1'));
  const limit = Math.max(1, Number(searchParams.get('limit') ?? '5'));

  async function load(p: number, l: number) {
    try {
      const res = await listBooks({ page: p, limit: l });
      setBooks(res.data);
      setTotal(res.total);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al cargar libros');
    }
  }

  useEffect(() => { load(page, limit); }, [page, limit]);

  function handlePageChange(p: number) {
    setSearchParams({ page: String(p), limit: String(limit) });
  }

  function handleLimitChange(l: number) {
    setSearchParams({ page: '1', limit: String(l) });
  }

  async function handleDelete(id: number) {
    if (!confirm('¿Eliminar este libro? La operación es definitiva.')) return;
    await deleteBook(id);
    const res = await listBooks({ page, limit });
    if (res.data.length === 0 && page > 1) {
      setSearchParams({ page: String(page - 1), limit: String(limit) });
    } else {
      setBooks(res.data);
      setTotal(res.total);
    }
  }

  return (
    <div>
      <h1>Mis libros</h1>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      <button onClick={() => navigate('/books/new')} style={{ marginBottom: '1rem' }}>
        + Añadir libro
      </button>
      {books.length === 0 && total === 0
        ? <p>No hay resultados</p>
        : <BookList books={books} onDelete={handleDelete} />
      }
      <Pagination
        page={page}
        limit={limit}
        total={total}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
      />
    </div>
  );
}
