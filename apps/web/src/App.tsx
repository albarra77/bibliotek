import { useEffect, useState } from 'react';
import type { Book } from '@bibliotek/shared';
import type { UpdateBookInput } from '@bibliotek/shared';
import { listBooks, createBook, updateBook, deleteBook } from './api/books.js';
import { BookList } from './components/BookList.js';
import { BookForm } from './components/BookForm.js';

export function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [editing, setEditing] = useState<Book | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      setBooks(await listBooks());
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al cargar libros');
    }
  }

  useEffect(() => { load(); }, []);

  async function handleCreate(data: UpdateBookInput) {
    await createBook(data);
    setShowForm(false);
    await load();
  }

  async function handleUpdate(data: UpdateBookInput) {
    if (!editing) return;
    await updateBook(editing.id, data);
    setEditing(null);
    await load();
  }

  async function handleDelete(id: number) {
    if (!confirm('¿Eliminar este libro? La operación es definitiva.')) return;
    await deleteBook(id);
    await load();
  }

  return (
    <main style={{ maxWidth: 700, margin: '2rem auto', fontFamily: 'sans-serif', padding: '0 1rem' }}>
      <h1>Bibliotek</h1>

      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      {!showForm && !editing && (
        <button onClick={() => setShowForm(true)} style={{ marginBottom: '1rem' }}>
          + Añadir libro
        </button>
      )}

      {showForm && (
        <BookForm
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editing && (
        <BookForm
          initial={editing}
          onSubmit={handleUpdate}
          onCancel={() => setEditing(null)}
        />
      )}

      {!showForm && !editing && (
        <BookList books={books} onEdit={setEditing} onDelete={handleDelete} />
      )}
    </main>
  );
}
