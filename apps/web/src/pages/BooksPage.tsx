import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Book } from '@bibliotek/shared';
import { listBooks, deleteBook } from '../api/books.js';
import { BookList } from '../components/BookList.js';

export function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function load() {
    try {
      setBooks(await listBooks());
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al cargar libros');
    }
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id: number) {
    if (!confirm('¿Eliminar este libro? La operación es definitiva.')) return;
    await deleteBook(id);
    await load();
  }

  return (
    <div>
      <h1>Mis libros</h1>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      <button onClick={() => navigate('/books/new')} style={{ marginBottom: '1rem' }}>
        + Añadir libro
      </button>
      <BookList books={books} onDelete={handleDelete} />
    </div>
  );
}
