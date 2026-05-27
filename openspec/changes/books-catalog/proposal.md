## Why

La app no tiene lógica de dominio — solo un endpoint `/health` y una base de datos SQLite vacía. Un catálogo de libros es la capacidad fundacional: permite al lector mantener su lista personal de lectura desde un único sitio.

## What Changes

- Nuevos endpoints REST para libros: crear, listar, obtener por ID, editar y eliminar
- Tabla `books` en SQLite con el esquema del dominio
- Schemas Zod y tipos TypeScript en `@bibliotek/shared`
- UI React: lista de libros y formulario de añadir/editar libro

## Capabilities

### New Capabilities

- `books-catalog`: Gestión CRUD del catálogo personal de libros. Campos: título (obligatorio), autor (obligatorio), año (opcional), ISBN (opcional y único cuando está presente). IDs autoincrement. Unicidad de ISBN solo cuando el valor está presente (NULL no colisiona). Edición mediante reemplazo total (PUT). Borrado definitivo. Listado ordenado por fecha de creación descendente.

### Modified Capabilities

<!-- Ninguna — es la primera capability de dominio -->

## Impact

- **API** (`apps/api`): Rutas bajo `/api/books`, migración SQLite para crear tabla `books`, capa de repositorio con `better-sqlite3`
- **Shared** (`packages/shared`): `BookSchema`, `CreateBookSchema`, `UpdateBookSchema` (Zod) y tipos `Book`, `CreateBookInput`, `UpdateBookInput`
- **Web** (`apps/web`): Páginas/componentes de lista de libros y formulario crear/editar; cliente API sobre `/api/books`
- **Base de datos**: Primera migración de esquema; inicializa la tabla `books`
