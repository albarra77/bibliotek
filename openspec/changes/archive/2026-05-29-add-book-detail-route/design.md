## Context

El router de React Router v6 ya tiene las rutas `/`, `/books`, `/books/new` y `/books/:id/edit`. `getBook(id)` existe en `apps/web/src/api/books.ts`. `BookList` muestra actualmente "Editar" y "Eliminar" en cada fila. Solo hay que añadir una nueva ruta, un nuevo componente de página y un enlace en `BookList`.

## Goals / Non-Goals

**Goals:**
- Ruta `/books/:id` de solo lectura: muestra todos los campos del libro con placeholders para valores vacíos
- Fecha `created_at` formateada como `dd/mm/aaaa` con `toLocaleDateString('es-ES')`
- Enlace "Ver" en cada fila de `BookList`
- `NotFoundPage` con "Volver a mis libros" si el libro no existe
- HTML semántico: `<article>` con estructura de encabezados

**Non-Goals:**
- Acciones de mutación (Editar, Eliminar) en la vista de detalle
- Navegación Anterior/Siguiente entre libros
- Caché compartida entre listado y detalle
- Formato de fecha largo o internacionalizado (solo `es-ES` corto)

## Decisions

**Solo lectura sin acciones de mutación**
La vista `/books/:id` es exclusivamente de consulta. Editar y eliminar siguen siendo acciones del listado (`/books`) y la ruta de edición (`/books/:id/edit`). Esto evita duplicar lógica de borrado y mantiene separación clara de responsabilidades.

**"Ver" como enlace explícito en `BookList`**
Se añade `<Link to="/books/${book.id}">Ver</Link>` junto a los botones existentes. El título no se convierte en enlace para no alterar el aspecto visual del listado actual.

**Carga de datos: `useEffect` + `getBook(id)`**
Consistente con `EditBookPage` y `HomePage`. No se introducen loaders de React Router — añadirían un patrón nuevo sin beneficio proporcional para páginas simples.

**Orden de rutas: estáticos antes que dinámicos (automático en RR v6)**
React Router v6 resuelve `books/new` antes que `books/:id` por especificidad de segmentos. No requiere ordenación manual en `createBrowserRouter`, pero se documenta aquí para evitar dudas futuras. La nueva ruta `books/:id` debe declararse después de `books/new` y `books/:id/edit` por claridad.

**Estructura de archivos**
```
apps/web/src/
├── pages/
│   ├── BookDetailPage.tsx  ← nueva
│   └── ...                 ← sin cambios
├── components/
│   └── BookList.tsx        ← añade <Link>Ver</Link>
└── main.tsx                ← añade ruta books/:id
```

## Risks / Trade-offs

- **Doble fetch lista→detalle**: navegar de `/books` a `/books/:id` lanza un segundo `getBook`. Aceptable — sin caché por ahora, consistente con el resto del proyecto.
- **`BookList` importa `Link`**: ya lo hace desde la historia anterior (`book-edit-route`), no añade dependencia nueva.
