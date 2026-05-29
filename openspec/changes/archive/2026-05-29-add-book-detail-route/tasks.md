## 1. Router

- [x] 1.1 Añadir la ruta `books/:id` en `apps/web/src/main.tsx` apuntando a `BookDetailPage`, después de `books/:id/edit`

## 2. Componentes existentes

- [x] 2.1 Añadir `<Link to={`/books/${book.id}`}>Ver</Link>` en cada fila de `BookList`, antes del enlace "Editar"

## 3. Nueva página

- [x] 3.1 Crear `apps/web/src/pages/BookDetailPage.tsx`:
  - `useParams()` para obtener `id`
  - `useEffect` + `getBook(id)` para cargar el libro
  - Si el libro no existe (404), renderizar `<NotFoundPage backTo="/books" backLabel="Volver a mis libros" />`
  - Campos con `"—"` como fallback para `year` e `isbn` nulos
  - `created_at` formateado con `new Date(book.created_at).toLocaleDateString('es-ES')`
  - Estructura semántica con `<article>` y `<h1>` para el título
  - Enlace "Volver a mis libros" → `/books`

## 4. Verificación

- [x] 4.1 Ejecutar `pnpm typecheck` sin errores
- [x] 4.2 Ejecutar `pnpm dev` y verificar manualmente:
  - "Ver" en `/books` navega a `/books/:id`
  - El detalle muestra todos los campos del libro
  - Campos sin año/ISBN muestran "—"
  - La fecha aparece en formato dd/mm/aaaa
  - Recargar en `/books/:id` mantiene la vista
  - `/books/9999` muestra "no encontrado" con enlace a `/books`
  - `/books/new` sigue funcionando (no capturado por `:id`)
