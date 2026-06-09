import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listBooks } from '../api/books.js';

export function HomePage() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    listBooks({ page: 1, limit: 1 }).then((res) => setCount(res.total)).catch(() => setCount(null));
  }, []);

  return (
    <div>
      <h1>Bienvenido a Bibliotek</h1>
      <p>Tu catálogo personal de libros.</p>
      {count !== null && (
        <p>
          {count === 0
            ? 'Todavía no tienes ningún libro en tu catálogo.'
            : `Tienes ${count} ${count === 1 ? 'libro' : 'libros'} en tu catálogo.`}
        </p>
      )}
      <Link to="/books">
        <button style={{ marginTop: '1rem' }}>Ver mis libros</button>
      </Link>
    </div>
  );
}
