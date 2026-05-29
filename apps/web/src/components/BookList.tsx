import { Link } from 'react-router-dom';
import type { Book } from '@bibliotek/shared';

interface Props {
  books: Book[];
  onDelete: (id: number) => void;
}

export function BookList({ books, onDelete }: Props) {
  if (books.length === 0) {
    return <p>No hay libros en el catálogo todavía.</p>;
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {books.map((book) => (
        <li
          key={book.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '0.5rem 0',
            borderBottom: '1px solid #eee',
          }}
        >
          <span style={{ flex: 1 }}>
            <strong>{book.title}</strong> — {book.author}
            {book.year ? ` (${book.year})` : ''}
            {book.isbn ? <small style={{ marginLeft: '0.5rem', color: '#888' }}>ISBN: {book.isbn}</small> : null}
          </span>
          <Link to={`/books/${book.id}`}>Ver</Link>
          <Link to={`/books/${book.id}/edit`}>Editar</Link>
          <button onClick={() => onDelete(book.id)} style={{ color: 'crimson' }}>
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  );
}
