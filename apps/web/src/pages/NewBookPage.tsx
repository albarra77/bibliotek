import { useNavigate } from 'react-router-dom';
import type { UpdateBookInput } from '@bibliotek/shared';
import { createBook } from '../api/books.js';
import { BookForm } from '../components/BookForm.js';

export function NewBookPage() {
  const navigate = useNavigate();

  async function handleCreate(data: UpdateBookInput) {
    await createBook(data);
    navigate('/books');
  }

  return (
    <div>
      <h1>Añadir libro</h1>
      <BookForm onSubmit={handleCreate} onCancel={() => navigate('/books')} />
    </div>
  );
}
