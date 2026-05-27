## 1. Shared — Schemas y tipos

- [x] 1.1 Crear `packages/shared/src/books.ts` con `BookSchema`, `CreateBookSchema`, `UpdateBookSchema` y tipos inferidos
- [x] 1.2 Re-exportar desde `packages/shared/src/index.ts`

## 2. API — Base de datos

- [x] 2.1 Añadir `CREATE TABLE IF NOT EXISTS books` en `apps/api/src/db.ts` con columnas: `id`, `title`, `author`, `year`, `isbn` (UNIQUE), `created_at`

## 3. API — Repositorio

- [x] 3.1 Crear `apps/api/src/repositories/books.ts` con funciones: `findAll`, `findById`, `create`, `update`, `remove`

## 4. API — Router y endpoints

- [x] 4.1 Crear `apps/api/src/routes/books.ts` con los 5 endpoints: `POST /`, `GET /`, `GET /:id`, `PUT /:id`, `DELETE /:id`
- [x] 4.2 Añadir validación Zod en create y update; devolver 400 si falla
- [x] 4.3 Manejar conflicto de ISBN único con respuesta 409
- [x] 4.4 Montar el router en `apps/api/src/app.ts` bajo `/api/books`

## 5. API — Tests

- [x] 5.1 Escribir tests de integración para cada endpoint cubriendo los escenarios de la spec (happy path + errores 400, 404, 409)

## 6. Web — Cliente API

- [x] 6.1 Crear `apps/web/src/api/books.ts` con funciones fetch para los 5 endpoints usando tipos de `@bibliotek/shared`

## 7. Web — UI

- [x] 7.1 Crear componente `BookList` que muestra la lista de libros con opción de eliminar cada uno
- [x] 7.2 Crear componente `BookForm` reutilizable para crear y editar libros
- [x] 7.3 Integrar lista y formulario en `App.tsx`

## 8. Verificación final

- [x] 8.1 Ejecutar `pnpm typecheck` sin errores
- [x] 8.2 Ejecutar `pnpm test` — todos los tests pasan
- [ ] 8.3 Levantar `pnpm dev` y verificar manualmente el flujo completo: añadir, editar, listar y eliminar un libro
