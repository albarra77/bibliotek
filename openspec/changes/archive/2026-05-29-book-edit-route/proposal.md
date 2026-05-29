## Why

La edición de un libro ocurre inline en `/books` mediante estado de React, sin URL propia. Esto rompe la consistencia con `/books/new` y hace imposible enlazar, compartir o refrescar la vista de edición de un libro concreto. Además, `BooksPage` carga responsabilidades que no le corresponden: gestionar el formulario de edición junto con el listado.

## What Changes

- Nueva ruta `/books/:id/edit` con formulario de edición precargado con los datos del libro
- `BookList` convierte el botón "Editar" en un `<Link>` semántico
- `BooksPage` pierde el estado de edición inline y queda como listado puro
- `NotFoundPage` acepta props opcionales para personalizar el enlace de retorno

## Capabilities

### New Capabilities

- `book-edit-route`: Edición de un libro con URL propia (`/books/:id/edit`). Carga los datos del libro por ID, reutiliza `BookForm`, navega a `/books` tras guardar o cancelar. Si el libro no existe, muestra `NotFoundPage` con "Volver a mis libros".

### Modified Capabilities

- `frontend-routing` (web): Se añade la ruta `/books/:id/edit` al router. `BooksPage` se simplifica eliminando el estado de edición inline.
- `books-catalog` (web): `BookList` cambia el callback `onEdit` por un enlace semántico a `/books/:id/edit`.

## Impact

- **Web** (`apps/web`): Nueva página `EditBookPage`. Modificaciones en `NotFoundPage`, `BookList`, `BooksPage` y `main.tsx`.
- **API / Shared**: Sin cambios — `GET /books/:id` y `PUT /books/:id` ya existen.
