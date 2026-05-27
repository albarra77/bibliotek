import { useState, useEffect } from 'react';
import type { Book, UpdateBookInput } from '@bibliotek/shared';

interface Props {
  initial?: Book;
  onSubmit: (data: UpdateBookInput) => Promise<void>;
  onCancel: () => void;
}

export function BookForm({ initial, onSubmit, onCancel }: Props) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [isbn, setIsbn] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initial) {
      setTitle(initial.title);
      setAuthor(initial.author);
      setYear(initial.year != null ? String(initial.year) : '');
      setIsbn(initial.isbn ?? '');
    }
  }, [initial]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await onSubmit({
        title,
        author,
        year: year !== '' ? Number(year) : null,
        isbn: isbn !== '' ? isbn : null,
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: 400 }}>
      <h3>{initial ? 'Editar libro' : 'Añadir libro'}</h3>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      <label>
        Título *
        <input value={title} onChange={(e) => setTitle(e.target.value)} required style={{ display: 'block', width: '100%' }} />
      </label>
      <label>
        Autor *
        <input value={author} onChange={(e) => setAuthor(e.target.value)} required style={{ display: 'block', width: '100%' }} />
      </label>
      <label>
        Año
        <input type="number" value={year} onChange={(e) => setYear(e.target.value)} style={{ display: 'block', width: '100%' }} />
      </label>
      <label>
        ISBN
        <input value={isbn} onChange={(e) => setIsbn(e.target.value)} style={{ display: 'block', width: '100%' }} />
      </label>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button type="submit" disabled={submitting}>{submitting ? 'Guardando…' : 'Guardar'}</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
}
