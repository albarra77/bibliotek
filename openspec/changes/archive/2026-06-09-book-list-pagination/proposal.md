## Why

El listado de libros carga todos los registros de una vez. A medida que el catálogo crece, esto sobrecarga la pantalla y aumenta el tiempo de respuesta innecesariamente. La paginación en la API resuelve ambos problemas y prepara el terreno para filtros y búsqueda futuros.

## What Changes

- **BREAKING** `GET /books` pasa a devolver `{ data: Book[], total: number }` en lugar de `Book[]`
- La ruta acepta `?page` y `?limit` como query params (defaults: `page=1`, `limit=5`)
- Nuevo componente `Pagination` en el frontend con selector de tamaño de página y controles de navegación
- El estado de paginación vive en la URL (`/books?page=2&limit=10`) para ser compatible con filtros futuros
- `BooksPage` usa `useSearchParams` en lugar de cargar todos los libros
- `HomePage` adapta su contador al nuevo formato de respuesta

## Capabilities

### New Capabilities

- `book-list-pagination`: Paginación del listado de libros con estado en URL, selector dinámico de tamaño de página y controles de navegación.

### Modified Capabilities

- `books-catalog`: `GET /books` cambia su contrato — devuelve `{ data, total }` con soporte para `?page` y `?limit`.

## Impact

- **Shared** (`packages/shared`): Nuevo tipo `BookListResponse { data: Book[], total: number }`
- **API** (`apps/api`): Repositorio y ruta `GET /books` actualizados; tests de listado modificados
- **Web** (`apps/web`): `BooksPage`, `HomePage`, cliente `api/books.ts` y nuevo componente `Pagination`
