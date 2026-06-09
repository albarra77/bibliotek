## Context

`GET /books` devuelve actualmente un array plano `Book[]` sin paginación. `BooksPage` carga todos los libros en un único fetch y `BookList` los renderiza íntegros. `HomePage` usa `listBooks()` y cuenta `.length` para mostrar el total. No existen filtros ni búsqueda todavía.

## Goals / Non-Goals

**Goals:**
- `GET /books?page=1&limit=5` devuelve `{ data: Book[], total: number }`
- Estado de paginación en URL (`useSearchParams`) — compatible con filtros futuros
- Componente `Pagination` con selector de tamaño `[5, 10, 20]` filtrado a opciones `< total`
- Controles ocultos cuando `total <= limit`
- `HomePage` sigue mostrando el total correctamente

**Non-Goals:**
- Búsqueda o filtros (historias posteriores)
- Paginación por cursor (suficiente con offset para este volumen)
- Infinite scroll
- Persistencia del tamaño de página entre sesiones

## Decisions

**Paginación por página+límite, no por offset**
`?page=1&limit=5` es más legible en la URL que `?offset=0&limit=5` y más consistente con el selector de tamaño. El offset se calcula internamente: `offset = (page - 1) * limit`.

**Respuesta de API: `{ data, total }`**
`total` es necesario para que el frontend calcule el número de páginas y decida si mostrar controles. No se incluyen `page` ni `limit` en la respuesta — el cliente ya los conoce porque los envió.

**Tipo compartido `BookListResponse` en `@bibliotek/shared`**
Tanto la API (para tipar la respuesta) como el cliente web (para tipar el fetch) necesitan este tipo. Vive en `packages/shared/src/books.ts` junto a `BookSchema`.

**Dos queries en SQLite: COUNT + SELECT paginado**
```sql
SELECT COUNT(*) as total FROM books
SELECT * FROM books ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?
```
`better-sqlite3` es síncrono; ambas queries se ejecutan secuencialmente en el repositorio. No hay problema de rendimiento a este escala.

**Estado en URL con `useSearchParams`**
`BooksPage` lee `page` y `limit` de los query params y escribe en la URL al cambiar de página o tamaño. Esto hace la paginación enlazable, persistente en recarga y lista para convivir con filtros futuros que también vivirán en la URL.

**Opciones del selector: `[5, 10, 20]` filtradas a `< total`**
Solo se muestran opciones que crearían más de una página (es decir, `option < total`). Si ninguna opción cumple (`total <= 5`), los controles no se muestran.

**`HomePage` usa `total` del fetch paginado**
`listBooks({ page: 1, limit: 1 })` devuelve `total` con un mínimo de datos transferidos. No se añade un endpoint `/books/count` separado.

**Estructura de archivos**
```
packages/shared/src/
└── books.ts              ← añade BookListResponse

apps/api/src/
├── repositories/books.ts ← findAll(page, limit) con COUNT + LIMIT/OFFSET
└── routes/books.ts       ← GET /books acepta ?page y ?limit

apps/api/src/__tests__/
└── books.test.ts         ← actualizar tests de GET /books

apps/web/src/
├── api/books.ts          ← listBooks(params?) → BookListResponse
├── components/
│   └── Pagination.tsx    ← nuevo componente
└── pages/
    ├── BooksPage.tsx     ← useSearchParams + Pagination
    └── HomePage.tsx      ← usa response.total
```

## Risks / Trade-offs

- **Cambio de contrato BREAKING en `GET /books`**: el cliente web y los tests deben actualizarse a la vez. Riesgo bajo — todo está en el mismo monorepo.
- **Último libro de una página eliminado**: si el usuario borra el único libro de la última página, la URL puede quedar con un `page` inválido. Mitigación: tras borrar, si `data` queda vacío y `page > 1`, navegar a `page - 1`.
- **Tests de integración**: los tests actuales hacen `as Book[]` sobre la respuesta — romperán hasta actualizarlos.
