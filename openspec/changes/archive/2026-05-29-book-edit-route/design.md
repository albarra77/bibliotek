## Context

El router de React Router v6 ya existe en `main.tsx` con rutas `/`, `/books`, `/books/new` y `*`. `getBook(id)` existe en `apps/web/src/api/books.ts`. `BookForm` acepta `initial?: Book` para precargar datos. Solo es necesario añadir una nueva ruta y refactorizar componentes existentes.

## Goals / Non-Goals

**Goals:**
- Ruta `/books/:id/edit` con formulario precargado y URL persistente
- Eliminar el estado de edición inline de `BooksPage`
- Convertir "Editar" en `BookList` en un enlace semántico (`<Link>`)
- Mostrar `NotFoundPage` con "Volver a mis libros" si el libro no existe

**Non-Goals:**
- `/books/:id` como vista de detalle (no existe en esta historia)
- Confirmación de cambios sin guardar al navegar fuera
- Loader de React Router (se usará `useEffect` para consistencia)
- Mover el botón "Eliminar" fuera de `/books`

## Decisions

**Carga de datos: `useEffect` + `getBook(id)`, no React Router loader**
El proyecto usa el patrón `useEffect` + fetch en todos los componentes existentes. Introducir loaders cambiaría la estructura de `createBrowserRouter` y añadiría un patrón nuevo sin beneficio proporcional para 4 páginas simples. Se mantiene la consistencia.

**`/books/:id` no existe**
Solo existe `/books/:id/edit`. Si el usuario navega a `/books/42`, cae en la página `*` (NotFoundPage). Mantiene el alcance mínimo.

**`NotFoundPage` con props opcionales**
El `NotFoundPage` actual tiene un enlace fijo a `/`. Se añaden props opcionales `backTo?: string` y `backLabel?: string` para que `EditBookPage` pueda renderizarlo con "Volver a mis libros" → `/books`. El comportamiento por defecto (sin props) no cambia.

**`BookList` pierde `onEdit`, gana `<Link>`**
La prop `onEdit: (book: Book) => void` se elimina del componente. El enlace "Editar" pasa a ser `<Link to={/books/${book.id}/edit}>Editar</Link>`. `BookList` deja de depender de React Router state y se convierte en un componente puramente presentacional respecto a la navegación.

**`BooksPage` pierde estado de edición**
Se eliminan: `editing: Book | null`, `setEditing`, `handleUpdate`, la importación de `BookForm` y el renderizado condicional del formulario. El componente queda con solo `books[]`, `error`, `load()` y `handleDelete()`.

**Estructura de archivos**
```
apps/web/src/
├── pages/
│   ├── EditBookPage.tsx    ← nueva
│   ├── BooksPage.tsx       ← simplificada (sin editing)
│   ├── NewBookPage.tsx     ← sin cambios
│   ├── HomePage.tsx        ← sin cambios
│   └── NotFoundPage.tsx    ← añade props opcionales
├── components/
│   ├── BookList.tsx        ← quita onEdit, añade <Link>
│   └── BookForm.tsx        ← sin cambios
└── main.tsx                ← añade ruta books/:id/edit
```

## Risks / Trade-offs

- **Estado de carga visible**: `EditBookPage` mostrará un estado vacío o de "cargando" mientras hace el fetch del libro. Es aceptable para el alcance actual.
- **Doble fetch al volver a `/books`**: Al guardar y navegar a `/books`, `BooksPage` recarga la lista. No se comparte caché — consistente con el resto del proyecto.
- **`BookList` importa `Link` de `react-router-dom`**: El componente adquiere una dependencia de router. Aceptable dado que la app entera ya usa React Router.
