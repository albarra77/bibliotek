## ADDED Requirements

### Requirement: Vista de detalle de un libro
La aplicación SHALL proporcionar la ruta `/books/:id` con una vista de solo lectura del libro identificado por `:id`. La vista SHALL mostrar todos los campos del libro y SHALL usar HTML semántico (`<article>`). No SHALL incluir acciones de mutación (editar, eliminar).

#### Scenario: Acceder al detalle desde el listado
- **WHEN** el usuario pulsa "Ver" en un libro del listado `/books`
- **THEN** el navegador navega a `/books/:id` donde `:id` es el identificador del libro

#### Scenario: Detalle muestra todos los campos
- **WHEN** el usuario accede a `/books/:id` y el libro existe
- **THEN** se muestran título, autor, año, ISBN y fecha de creación del libro

#### Scenario: Campos opcionales vacíos muestran placeholder
- **WHEN** el usuario accede al detalle de un libro sin año o sin ISBN
- **THEN** los campos vacíos muestran "—" en lugar de estar en blanco o mostrar null

#### Scenario: Fecha de creación en formato corto
- **WHEN** el usuario ve la fecha de creación en el detalle
- **THEN** se muestra en formato dd/mm/aaaa (por ejemplo "29/05/2026")

#### Scenario: Recargar mantiene la vista de detalle
- **WHEN** el usuario recarga el navegador estando en `/books/:id`
- **THEN** la página vuelve a cargar los datos del libro y muestra el detalle

#### Scenario: "Ver" en el listado es un enlace semántico
- **WHEN** el usuario inspecciona el enlace "Ver" de cualquier libro en `/books`
- **THEN** el elemento tiene `href="/books/:id"` y es navegable mediante teclado y clic derecho

---

### Requirement: Libro no encontrado en la vista de detalle
Si el `:id` de la ruta no corresponde a ningún libro existente, la aplicación SHALL mostrar una página de error con un enlace para volver al listado.

#### Scenario: ID inexistente muestra error con enlace al listado
- **WHEN** el usuario accede a `/books/9999` y no existe ningún libro con ese ID
- **THEN** se muestra la vista "no encontrado" con un enlace "Volver a mis libros" que navega a `/books`
