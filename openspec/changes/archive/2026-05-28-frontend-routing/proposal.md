## Why

El frontal es actualmente una única página (`/`) que cambia su contenido mediante estado de React. No existen URLs distintas, por lo que no es posible enlazar ni compartir una vista concreta, y el navegador pierde el contexto al recargar. Introducir un router permite que cada sección tenga su propia URL y que la aplicación se comporte como una web real.

## What Changes

- Introducción de React Router v6 en el frontend
- Layout persistente con menú de navegación visible en todas las rutas
- Tres rutas iniciales: `/` (inicio), `/books` (catálogo), `/books/new` (crear libro)
- Página 404 para URLs inexistentes
- Refactorización de `App.tsx` en componentes de página por ruta

## Capabilities

### New Capabilities

- `frontend-routing`: Enrutado cliente en el frontal con URLs propias por sección, navegación persistente y página de inicio con resumen del catálogo.

### Modified Capabilities

- `books-catalog` (web): La UI de listado y creación de libros pasa a estar montada en rutas propias (`/books`, `/books/new`) en lugar de controlada por estado en `App.tsx`.

## Impact

- **Web** (`apps/web`): Instalación de `react-router-dom`. Nuevos componentes de página (`HomePage`, `BooksPage`, `NewBookPage`, `NotFoundPage`) y layout (`Layout`). Refactorización de `App.tsx` y `main.tsx`.
- **API / Shared**: Sin cambios.
