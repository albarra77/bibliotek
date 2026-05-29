## ADDED Requirements

### Requirement: Editar un libro con URL propia
La aplicación SHALL proporcionar la ruta `/books/:id/edit` con un formulario precargado con los datos del libro identificado por `:id`. El formulario SHALL ser el mismo componente que se usa en `/books/new`.

#### Scenario: Navegar a la edición desde el listado
- **WHEN** el usuario pulsa "Editar" en un libro del listado `/books`
- **THEN** el navegador navega a `/books/:id/edit` donde `:id` es el identificador del libro

#### Scenario: Formulario precargado con datos del libro
- **WHEN** el usuario accede a `/books/:id/edit` y el libro existe
- **THEN** el formulario muestra los datos actuales del libro (título, autor, año, ISBN)

#### Scenario: Recargar mantiene la vista de edición
- **WHEN** el usuario recarga el navegador estando en `/books/:id/edit`
- **THEN** la página vuelve a cargar los datos del libro y muestra el formulario de edición

#### Scenario: Guardar navega a /books con los cambios reflejados
- **WHEN** el usuario modifica los datos y pulsa guardar
- **THEN** el libro se actualiza, el navegador navega a `/books` y el libro aparece con los nuevos datos

#### Scenario: Cancelar navega a /books sin guardar
- **WHEN** el usuario pulsa cancelar en `/books/:id/edit`
- **THEN** el navegador navega a `/books` sin modificar el libro

---

### Requirement: Libro no encontrado en la ruta de edición
Si el `:id` de la ruta no corresponde a ningún libro existente, la aplicación SHALL mostrar una página de error con un enlace para volver al listado.

#### Scenario: ID inexistente muestra error con enlace al listado
- **WHEN** el usuario accede a `/books/9999/edit` y no existe ningún libro con ese ID
- **THEN** se muestra una vista de "no encontrado" con un botón o enlace "Volver a mis libros" que navega a `/books`

---

### Requirement: Enlace "Editar" semántico en el listado
El enlace "Editar" en el listado de libros SHALL ser un elemento ancla (`<a>`) con su atributo `href` apuntando a `/books/:id/edit`, no un botón con manejador de click.

#### Scenario: "Editar" es un enlace con href
- **WHEN** el usuario inspecciona el enlace "Editar" de cualquier libro en `/books`
- **THEN** el elemento tiene `href="/books/:id/edit"` y es navegable mediante teclado y clic derecho

---

## MODIFIED Requirements

### Requirement: Listado /books es solo de consulta y borrado
`BooksPage` SHALL mostrar únicamente el listado de libros y el botón de borrado. No SHALL mostrar el formulario de edición inline ni gestionar estado de edición.

#### Scenario: /books no muestra formulario de edición
- **WHEN** el usuario está en `/books`
- **THEN** no hay ningún formulario de edición visible — solo el listado y el botón "+ Añadir libro"
