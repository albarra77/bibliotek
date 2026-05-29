## ADDED Requirements

### Requirement: Ruta /books/:id registrada en el router
El router de la aplicación SHALL incluir la ruta `/books/:id` apuntando a `BookDetailPage`. La ruta SHALL declararse después de `/books/new` y `/books/:id/edit` para respetar el orden de especificidad, aunque React Router v6 resuelve la prioridad automáticamente.

#### Scenario: /books/:id renderiza BookDetailPage
- **WHEN** el usuario navega a `/books/42`
- **THEN** se renderiza `BookDetailPage` con el libro cuyo id es 42

#### Scenario: /books/new no es capturado por /books/:id
- **WHEN** el usuario navega a `/books/new`
- **THEN** se renderiza `NewBookPage`, no `BookDetailPage`
