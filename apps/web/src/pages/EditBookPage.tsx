import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Book, UpdateBookInput } from '@bibliotek/shared';
import { getBook, updateBook } from '../api/books.js';
import { BookForm } from '../components/BookForm.js';
import { NotFoundPage } from './NotFoundPage.js';

export function EditBookPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
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

  async function handleSubmit(data: UpdateBookInput) {
    await updateBook(book!.id, data);
    navigate('/books');
  }

  return (
    <div>
      <h1>Editar libro</h1>
      <BookForm initial={book} onSubmit={handleSubmit} onCancel={() => navigate('/books')} />
    </div>
  );
}
