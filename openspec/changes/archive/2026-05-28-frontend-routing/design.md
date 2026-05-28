## Context

El frontal es una SPA Vite + React 18 + TypeScript. `App.tsx` gestiona todo mediante `useState` (`books`, `editing`, `showForm`, `error`). No existe router. El servidor Vite ya sirve `index.html` para cualquier ruta no reconocida (comportamiento SPA por defecto), por lo que no se necesita configuración adicional en `vite.config.ts` para que las URLs directas funcionen en desarrollo.

## Goals / Non-Goals

**Goals:**
- Introducir URLs propias para `/`, `/books` y `/books/new`
- Nav semántico y navegable por teclado, visible en todas las rutas
- Página de inicio con bienvenida, contador de libros y CTA
- Página 404 para rutas desconocidas
- Mantener la funcionalidad inline de editar y borrar en `/books`

**Non-Goals:**
- `/books/:id/edit` con URL propia (historia posterior)
- `/books/:id` (detalle de libro)
- Breadcrumbs, estados de carga globales, persistencia de filtros

## Decisions

**Librería: React Router v6 (`react-router-dom`)**
Es la opción más establecida para proyectos React. La API `createBrowserRouter` + `RouterProvider` es la forma canónica desde v6.4. `NavLink` facilita indicar la ruta activa. `useNavigate` reemplaza los cambios de estado para transiciones entre páginas.

**Patrón Layout con `<Outlet>`**
Un único componente `Layout` contiene el `<nav>` y renderiza `<Outlet>` para el contenido de cada ruta. Esto garantiza que el nav sea idéntico en todas las vistas sin duplicación.

**Edición inline se mantiene en `/books`**
El botón "Editar" sigue abriendo `BookForm` inline dentro de `BooksPage`, sin URL propia. El estado `editing: Book | null` permanece en `BooksPage`. Esto evita ampliar el alcance de esta historia y mantiene la funcionalidad intacta.

**Contador en `HomePage` via fetch independiente**
`HomePage` llama a `listBooks()` solo para obtener el recuento (`books.length`). No comparte estado con `BooksPage` — cada página es responsable de su propio fetch. La simplicidad prima sobre la optimización.

**Estructura de archivos resultante**
```
apps/web/src/
├── components/
│   ├── BookList.tsx       ← sin cambios
│   └── BookForm.tsx       ← sin cambios
├── pages/
│   ├── HomePage.tsx       ← nueva
│   ├── BooksPage.tsx      ← lógica extraída de App.tsx
│   ├── NewBookPage.tsx    ← nueva (BookForm + useNavigate)
│   └── NotFoundPage.tsx   ← nueva
├── layout/
│   └── Layout.tsx         ← nueva (<nav> + <Outlet>)
├── api/
│   └── books.ts           ← sin cambios
├── App.tsx                ← eliminado o vaciado (router monta desde main.tsx)
└── main.tsx               ← monta createBrowserRouter + RouterProvider
```

**`<NavLink>` para el estado activo del nav**
`react-router-dom` provee `NavLink`, que añade automáticamente `aria-current="page"` y la clase `active` al enlace de la ruta activa. Es la solución semántica y accesible sin código adicional.

## Risks / Trade-offs

- **Estado duplicado entre páginas**: `HomePage` y `BooksPage` hacen fetch independientes. Si el usuario navega rápido, puede ver recuentos inconsistentes por un instante. Aceptable para el alcance actual.
- **Sin lazy loading**: Las páginas se importan estáticamente. Con 4 páginas el bundle no justifica la complejidad de `React.lazy`.
- **Historial del navegador en edición inline**: Al editar un libro en `/books` no se añade entrada al historial (es solo estado). Consistente con la decisión de mantenerlo inline.
