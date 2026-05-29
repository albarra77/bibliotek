## 1. Router

- [x] 1.1 Añadir la ruta `books/:id/edit` en `apps/web/src/main.tsx` apuntando al nuevo `EditBookPage`

## 2. Componentes existentes

- [x] 2.1 Añadir props opcionales `backTo?: string` y `backLabel?: string` a `NotFoundPage` — el enlace de retorno usa estos valores cuando están presentes, y `/` + "Volver al inicio" como fallback
- [x] 2.2 Eliminar la prop `onEdit` de `BookList` y convertir el botón "Editar" en `<Link to={/books/${book.id}/edit}>Editar</Link>`
- [x] 2.3 Simplificar `BooksPage`: eliminar estado `editing`, `handleUpdate`, importación de `BookForm` y renderizado condicional del formulario

## 3. Nueva página

- [x] 3.1 Crear `apps/web/src/pages/EditBookPage.tsx`:
  - `useParams()` para obtener `id`
  - `useEffect` + `getBook(id)` para cargar el libro
  - Si el libro no existe (error 404 de la API), renderizar `<NotFoundPage backTo="/books" backLabel="Volver a mis libros" />`
  - `BookForm` con `initial={book}` y `onSubmit` que llama a `updateBook` y navega a `/books`
  - `onCancel` navega a `/books`

## 4. Verificación

- [x] 4.1 Ejecutar `pnpm typecheck` sin errores
- [x] 4.2 Ejecutar `pnpm dev` y verificar manualmente:
  - "Editar" en `/books` navega a `/books/:id/edit`
  - El formulario aparece precargado con los datos del libro
  - Guardar actualiza el libro y vuelve a `/books`
  - Cancelar vuelve a `/books` sin cambios
  - Recargar en `/books/:id/edit` mantiene el formulario
  - `/books/9999/edit` muestra la vista "no encontrado" con enlace a `/books`
  - `/books` ya no muestra formulario inline de edición
  - El enlace "Editar" tiene `href` y funciona con teclado
