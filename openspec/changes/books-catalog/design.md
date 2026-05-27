## Context

La API es un servidor Hono sobre Node 20 + TypeScript con SQLite (`better-sqlite3`). Actualmente solo expone `GET /health`. El paquete `@bibliotek/shared` está vacío a la espera de que OpenSpec defina el dominio. El frontend es Vite + React sin lógica de negocio todavía.

Esta es la primera capability de dominio: introduce el esquema de base de datos, la capa de repositorio, los endpoints REST y los schemas Zod compartidos.

## Goals / Non-Goals

**Goals:**
- Definir el esquema SQLite de la tabla `books` y crearlo en el arranque de la API
- Implementar los 5 endpoints REST de libros bajo `/api/books`
- Centralizar schemas Zod y tipos TypeScript en `@bibliotek/shared`
- UI mínima funcional: lista de libros y formulario crear/editar

**Non-Goals:**
- Estados de lectura, notas, puntuaciones, búsqueda, importación externa
- Autenticación o multi-usuario
- Paginación (el catálogo personal no la requiere por ahora)
- Soft delete

## Decisions

**IDs: autoincrement integer, no UUID**
El proyecto es una lista personal con un único usuario. Las URLs tipo `/books/42` son más limpias y fáciles de depurar. No hay riesgo de colisión distribuida ni necesidad de opacar el volumen.

**Edición: PUT (reemplazo total), no PATCH**
Con solo 4 campos editables (título, autor, año, ISBN), PUT simplifica la implementación — el servidor recibe el objeto completo y lo reemplaza sin lógica de merge. Si en el futuro el objeto crece, se puede migrar a PATCH.

**Unicidad de ISBN: solo cuando está presente**
`UNIQUE` en SQLite permite múltiples `NULL` por defecto. Esto refleja el caso real: muchos libros antiguos o sin catalogar no tienen ISBN, y no deben bloquearse entre sí. El constraint actúa solo cuando el valor es un string.

**Inicialización de la BD: en el arranque, no migraciones**
Para un proyecto de aprendizaje con un solo desarrollador, un `CREATE TABLE IF NOT EXISTS` en `db.ts` al arrancar es suficiente. No se introduce un sistema de migraciones todavía — eso correspondería a una capability o change dedicado si el esquema crece.

**Estructura de archivos en la API**
```
apps/api/src/
├── routes/
│   └── books.ts        ← router Hono con los 5 endpoints
├── repositories/
│   └── books.ts        ← acceso a SQLite (queries)
├── app.ts              ← monta books router
└── db.ts               ← añade CREATE TABLE books
```

**Schemas en `@bibliotek/shared`**
```
packages/shared/src/
└── books.ts            ← BookSchema, CreateBookSchema, UpdateBookSchema + tipos
```
El frontend y la API importan desde `@bibliotek/shared` — no se duplican los schemas.

## Risks / Trade-offs

- **Sin migraciones**: si el esquema cambia en un change futuro, habrá que borrar la BD manualmente en desarrollo. Riesgo bajo para un proyecto personal.
- **PUT sin validación de campos vacíos**: el cliente debe enviar siempre todos los campos. Si olvida `year`, se sobreescribirá con `null`. Se mitiga con validación Zod estricta en el endpoint.
- **`CREATE TABLE IF NOT EXISTS` en arranque**: en producción real sería problemático, pero es aceptable para el alcance actual.
