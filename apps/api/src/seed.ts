import { db } from './db.js';

const books = [
  { title: 'Cien años de soledad', author: 'Gabriel García Márquez', year: 1967, isbn: '978-84-376-0494-7' },
  { title: 'Don Quijote de la Mancha', author: 'Miguel de Cervantes', year: 1605, isbn: '978-84-670-5683-6' },
  { title: 'El señor de los anillos', author: 'J.R.R. Tolkien', year: 1954, isbn: '978-84-450-7606-5' },
  { title: '1984', author: 'George Orwell', year: 1949, isbn: '978-84-233-0788-2' },
  { title: 'Dune', author: 'Frank Herbert', year: 1965, isbn: '978-0-441-17271-9' },
  { title: 'Ficciones', author: 'Jorge Luis Borges', year: 1944, isbn: '978-84-206-3776-9' },
  { title: 'El nombre de la rosa', author: 'Umberto Eco', year: 1980, isbn: '978-84-322-2445-0' },
  { title: 'Crimen y castigo', author: 'Fiódor Dostoyevski', year: 1866, isbn: '978-84-376-0375-9' },
  { title: 'Orgullo y prejuicio', author: 'Jane Austen', year: 1813, isbn: '978-84-376-0406-0' },
  { title: 'El gran Gatsby', author: 'F. Scott Fitzgerald', year: 1925, isbn: '978-84-233-3533-5' },
  { title: 'Sapiens', author: 'Yuval Noah Harari', year: 2011, isbn: '978-84-9942-828-2' },
  { title: 'El principito', author: 'Antoine de Saint-Exupéry', year: 1943, isbn: '978-84-204-8784-5' },
  { title: 'Fahrenheit 451', author: 'Ray Bradbury', year: 1953, isbn: '978-84-233-0611-3' },
  { title: 'La sombra del viento', author: 'Carlos Ruiz Zafón', year: 2001, isbn: '978-84-08-01838-4' },
  { title: 'Neuromante', author: 'William Gibson', year: 1984, isbn: '978-84-450-7181-7' },
];

const insert = db.prepare(
  'INSERT OR IGNORE INTO books (title, author, year, isbn) VALUES (?, ?, ?, ?)',
);

const insertAll = db.transaction(() => {
  for (const book of books) {
    insert.run(book.title, book.author, book.year, book.isbn);
  }
});

insertAll();
console.log(`Seed completo: ${books.length} libros insertados (duplicados ignorados).`);
