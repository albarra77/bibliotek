## 1. Shared — Tipo BookListResponse

- [x] 1.1 Añadir `BookListResponse` a `packages/shared/src/books.ts`: `{ data: Book[], total: number }`
- [x] 1.2 Re-exportar `BookListResponse` desde `packages/shared/src/index.ts`

## 2. API — Repositorio

- [x] 2.1 Actualizar `findAll` en `apps/api/src/repositories/books.ts` para aceptar `(page: number, limit: number)` y ejecutar dos queries: `SELECT COUNT(*) FROM books` + `SELECT * FROM books ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?`
- [x] 2.2 Actualizar el tipo de retorno de `findAll` a `{ data: Book[], total: number }`

## 3. API — Ruta

- [x] 3.1 Actualizar `GET /books` en `apps/api/src/routes/books.ts` para leer `?page` y `?limit` (con defaults 1 y 5), llamar a `repo.findAll(page, limit)` y devolver `{ data, total }`

## 4. API — Tests

- [x] 4.1 Actualizar los tests de `GET /books` en `apps/api/src/__tests__/books.test.ts` para esperar `{ data, total }` en lugar de `Book[]`
- [x] 4.2 Añadir test: `GET /books?page=2&limit=1` con 2 libros devuelve el segundo libro y `total: 2`
- [x] 4.3 Añadir test: `GET /books?page=99&limit=5` devuelve `{ data: [], total: N }`

## 5. Web — Cliente API

- [x] 5.1 Actualizar `listBooks` en `apps/web/src/api/books.ts` para aceptar `params?: { page?: number; limit?: number }` y devolver `Promise<BookListResponse>`

## 6. Web — Componente Pagination

- [x] 6.1 Crear `apps/web/src/components/Pagination.tsx` con:
  - Props: `page`, `limit`, `total`, `onPageChange`, `onLimitChange`
  - Selector `<select>` con opciones `[5, 10, 20]` filtradas a `option < total`
  - Botones "Anterior" y "Siguiente" (desactivados en bordes)
  - Números de página directos
  - Sin renderizar nada si `total <= limit`

## 7. Web — Páginas

- [x] 7.1 Actualizar `BooksPage` en `apps/web/src/pages/BooksPage.tsx`:
  - Usar `useSearchParams` para leer y escribir `page` y `limit` (defaults: 1 y 5)
  - Pasar params a `listBooks`; mostrar `response.data` en `BookList`
  - Mostrar "No hay resultados" si `response.data` está vacío
  - Montar `<Pagination>` con los valores actuales
  - Tras borrar un libro: si `data` queda vacío y `page > 1`, navegar a `page - 1`
- [x] 7.2 Actualizar `HomePage` en `apps/web/src/pages/HomePage.tsx` para llamar a `listBooks({ page: 1, limit: 1 })` y leer `response.total` como contador

## 8. Verificación

- [x] 8.1 Ejecutar `pnpm typecheck` sin errores
- [x] 8.2 Ejecutar `pnpm test` — todos los tests pasan
- [x] 8.3 Ejecutar `pnpm dev` y verificar manualmente:
  - Listado paginado con 5 libros por página por defecto
  - Controles de navegación visibles con más de 5 libros
  - Selector muestra solo opciones relevantes según el total
  - URL refleja `?page` y `?limit` al navegar
  - Recarga mantiene la página activa
  - Borrar el último libro de una página redirige a la anterior
  - Con pocos libros (≤ 5) no aparecen controles
  - Página fuera de rango muestra "No hay resultados"
