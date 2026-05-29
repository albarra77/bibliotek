## Why

No existe una URL para consultar los datos completos de un libro sin entrar en modo edición. La ruta `/books/:id/edit` mezcla lectura con mutación, lo que impide enlazar o compartir la ficha de un libro de forma segura.

## What Changes

- Nueva ruta `/books/:id` con vista de solo lectura: título, autor, año, ISBN y fecha de creación formateada
- Enlace "Ver" explícito añadido a cada fila de `BookList`
- Página `BookDetailPage` nueva que reutiliza `getBook(id)` y muestra `NotFoundPage` si el libro no existe

## Capabilities

### New Capabilities

- `book-detail`: Vista de solo lectura de un libro concreto en `/books/:id`. Muestra todos sus campos con placeholders para valores vacíos y fecha en formato corto. Sin acciones de mutación.

### Modified Capabilities

- `frontend-routing`: Se añade la ruta `/books/:id` al router.
- `books-catalog`: `BookList` incorpora el enlace "Ver" a `/books/:id` en cada fila.

## Impact

- **Web** (`apps/web`): Nueva página `BookDetailPage`. Modificaciones en `BookList` y `main.tsx`.
- **API / Shared**: Sin cambios — `GET /books/:id` ya existe.
