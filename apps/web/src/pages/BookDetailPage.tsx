import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { Book } from '@bibliotek/shared';
import { getBook } from '../api/books.js';
import { NotFoundPage } from './NotFoundPage.js';

export function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getBook(Number(id))
      .then(setBook)
      .catch((err: unknown) => {
        if (err instanceof Error && 'status' in err && (err as { status: number }).status === 404) {
          setNotFound(true);
        }
      });
  }, [id]);

  if (notFound) {
    return <NotFoundPage backTo="/books" backLabel="Volver a mis libros" />;
  }

  if (!book) {
    return <p>Cargando…</p>;
  }

  const fecha = new Date(book.created_at).toLocaleDateString('es-ES');

  return (
    <article>
      <h1>{book.title}</h1>
      <dl style={{ lineHeight: 2 }}>
        <dt><strong>Autor</strong></dt>
        <dd>{book.author}</dd>
        <dt><strong>Año</strong></dt>
        <dd>{book.year ?? '—'}</dd>
        <dt><strong>ISBN</strong></dt>
        <dd>{book.isbn ?? '—'}</dd>
        <dt><strong>Añadido</strong></dt>
        <dd>{fecha}</dd>
      </dl>
      <Link to="/books">← Volver a mis libros</Link>
    </article>
  );
}
