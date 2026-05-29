## ADDED Requirements

### Requirement: Navegación persistente en todas las rutas
La aplicación SHALL mostrar un menú de navegación consistente en todas las rutas. El menú SHALL usar HTML semántico (`<nav>`) y ser navegable por teclado. El enlace correspondiente a la ruta activa SHALL estar marcado con `aria-current="page"`.

#### Scenario: Nav visible en la página de inicio
- **WHEN** el usuario accarga o navega a `/`
- **THEN** el menú de navegación es visible con al menos los enlaces "Inicio" y "Mis libros"

#### Scenario: Nav visible en el catálogo
- **WHEN** el usuario está en `/books`
- **THEN** el menú de navegación es visible e idéntico al de las demás rutas

#### Scenario: Nav visible en el formulario de creación
- **WHEN** el usuario está en `/books/new`
- **THEN** el menú de navegación es visible e idéntico al de las demás rutas

#### Scenario: Enlace activo marcado semánticamente
- **WHEN** el usuario está en cualquier ruta
- **THEN** el enlace del nav correspondiente a esa ruta tiene `aria-current="page"`

---

### Requirement: URLs propias por sección
Cada sección de la aplicación SHALL tener su propia URL. El navegador SHALL mantener la vista activa al recargar la página.

#### Scenario: Recarga en `/`
- **WHEN** el usuario recarga el navegador estando en `/`
- **THEN** se muestra la página de inicio sin redirigir a otra ruta

#### Scenario: Recarga en `/books`
- **WHEN** el usuario recarga el navegador estando en `/books`
- **THEN** se muestra el listado de libros sin redirigir a otra ruta

#### Scenario: Recarga en `/books/new`
- **WHEN** el usuario recarga el navegador estando en `/books/new`
- **THEN** se muestra el formulario de creación sin redirigir a otra ruta

---

### Requirement: Página de inicio
La ruta `/` SHALL mostrar un mensaje de bienvenida, el número total de libros en el catálogo y un enlace o botón que lleve a `/books`.

#### Scenario: Página de inicio muestra bienvenida y contador
- **WHEN** el usuario navega a `/`
- **THEN** ve un mensaje de bienvenida, el total de libros del catálogo y un CTA que enlaza a `/books`

#### Scenario: CTA navega a /books
- **WHEN** el usuario pulsa el botón/enlace "Ver mis libros" en `/`
- **THEN** el navegador navega a `/books`

---

### Requirement: Navegación desde /books a /books/new
La ruta `/books` SHALL contener un elemento que al activarse navegue a `/books/new`.

#### Scenario: Botón añadir libro navega a /books/new
- **WHEN** el usuario pulsa "+ Añadir libro" en `/books`
- **THEN** el navegador navega a `/books/new`

---

### Requirement: Creación de libro desde /books/new
La ruta `/books/new` SHALL mostrar el formulario de creación. Tras guardar con éxito, la aplicación SHALL navegar a `/books` donde el nuevo libro es visible. Si el usuario cancela, SHALL navegar a `/books`.

#### Scenario: Guardar libro redirige a /books con libro visible
- **WHEN** el usuario rellena el formulario en `/books/new` y pulsa guardar
- **THEN** se crea el libro, el navegador navega a `/books` y el nuevo libro aparece en el listado

#### Scenario: Cancelar en /books/new navega a /books
- **WHEN** el usuario pulsa cancelar en `/books/new`
- **THEN** el navegador navega a `/books` sin crear ningún libro

---

### Requirement: Página 404 para rutas inexistentes
Una URL que no corresponda a ninguna ruta definida SHALL mostrar una vista de "página no encontrada" con un enlace que permita volver a `/`.

#### Scenario: Ruta desconocida muestra 404
- **WHEN** el usuario navega a una URL que no existe (p.ej. `/xyz`)
- **THEN** ve una vista "página no encontrada" con un enlace a `/`

#### Scenario: Enlace de 404 vuelve al inicio
- **WHEN** el usuario pulsa el enlace en la vista 404
- **THEN** el navegador navega a `/`

---

### Requirement: Ruta /books/:id registrada en el router
El router de la aplicación SHALL incluir la ruta `/books/:id` apuntando a `BookDetailPage`. La ruta SHALL declararse después de `/books/new` y `/books/:id/edit` para respetar el orden de especificidad, aunque React Router v6 resuelve la prioridad automáticamente.

#### Scenario: /books/:id renderiza BookDetailPage
- **WHEN** el usuario navega a `/books/42`
- **THEN** se renderiza `BookDetailPage` con el libro cuyo id es 42

#### Scenario: /books/new no es capturado por /books/:id
- **WHEN** el usuario navega a `/books/new`
- **THEN** se renderiza `NewBookPage`, no `BookDetailPage`
