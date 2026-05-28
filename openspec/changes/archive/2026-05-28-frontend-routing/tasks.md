## 1. Dependencia

- [x] 1.1 Añadir `react-router-dom` a `apps/web/package.json` e instalar con `pnpm install`

## 2. Layout y router

- [x] 2.1 Crear `apps/web/src/layout/Layout.tsx` con `<nav>` (NavLink a `/` y `/books`) y `<Outlet>`
- [x] 2.2 Configurar `createBrowserRouter` en `apps/web/src/main.tsx` con las rutas: `/`, `/books`, `/books/new`, `*`
- [x] 2.3 Montar `<RouterProvider>` en lugar del `<App>` actual en `main.tsx`

## 3. Páginas

- [x] 3.1 Crear `apps/web/src/pages/HomePage.tsx` — bienvenida, fetch contador de libros, CTA a `/books`
- [x] 3.2 Crear `apps/web/src/pages/BooksPage.tsx` — extraer lógica de `App.tsx` (listado, edición inline, borrar)
- [x] 3.3 Crear `apps/web/src/pages/NewBookPage.tsx` — `BookForm` con `useNavigate`: guardar→`/books`, cancelar→`/books`
- [x] 3.4 Crear `apps/web/src/pages/NotFoundPage.tsx` — mensaje 404 con enlace a `/`

## 4. Limpieza

- [x] 4.1 Eliminar o vaciar `apps/web/src/App.tsx` (su lógica queda distribuida en las páginas)

## 5. Verificación

- [x] 5.1 Ejecutar `pnpm typecheck` sin errores
- [x] 5.2 Ejecutar `pnpm dev` y verificar manualmente:
  - `/` muestra bienvenida, contador y CTA funciona
  - `/books` lista libros; "+ Añadir libro" navega a `/books/new`
  - `/books/new` guarda y redirige; cancelar redirige
  - Editar y borrar inline siguen funcionando en `/books`
  - URL desconocida muestra la página 404
  - Recargar en cada ruta mantiene la vista activa
  - Nav marca el enlace activo; tabulación funciona
