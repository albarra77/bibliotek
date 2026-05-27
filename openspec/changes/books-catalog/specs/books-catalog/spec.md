## ADDED Requirements

### Requirement: Añadir un libro al catálogo
El sistema SHALL permitir añadir un libro con título y autor como campos obligatorios. Año e ISBN son opcionales. El sistema SHALL generar un identificador único autoincremental para cada libro y registrar la fecha de creación automáticamente.

#### Scenario: Añadir libro con solo campos obligatorios
- **WHEN** el cliente envía título y autor válidos sin año ni ISBN
- **THEN** el sistema crea el libro, devuelve 201 con el objeto completo incluyendo id y created_at

#### Scenario: Añadir libro con todos los campos
- **WHEN** el cliente envía título, autor, año e ISBN válidos
- **THEN** el sistema crea el libro y devuelve 201 con todos los campos

#### Scenario: Rechazar libro sin título
- **WHEN** el cliente envía una petición sin el campo título (o título vacío)
- **THEN** el sistema devuelve 400 con un mensaje de error que identifica el campo inválido

#### Scenario: Rechazar libro sin autor
- **WHEN** el cliente envía una petición sin el campo autor (o autor vacío)
- **THEN** el sistema devuelve 400 con un mensaje de error que identifica el campo inválido

#### Scenario: Rechazar ISBN duplicado al crear
- **WHEN** el cliente envía un ISBN que ya existe en el catálogo
- **THEN** el sistema devuelve 409 con un mensaje de error que indica que el ISBN ya está registrado

### Requirement: Listar todos los libros
El sistema SHALL devolver la lista completa de libros del catálogo, ordenada por fecha de creación descendente.

#### Scenario: Listar con libros existentes
- **WHEN** el cliente solicita la lista de libros y existen entradas en el catálogo
- **THEN** el sistema devuelve 200 con un array de libros ordenados por created_at descendente

#### Scenario: Listar con catálogo vacío
- **WHEN** el cliente solicita la lista de libros y no hay ningún libro en el catálogo
- **THEN** el sistema devuelve 200 con un array vacío

### Requirement: Obtener un libro por ID
El sistema SHALL permitir recuperar los datos completos de un libro dado su identificador.

#### Scenario: Obtener libro existente
- **WHEN** el cliente solicita un libro con un ID que existe en el catálogo
- **THEN** el sistema devuelve 200 con el objeto completo del libro

#### Scenario: Obtener libro inexistente
- **WHEN** el cliente solicita un libro con un ID que no existe
- **THEN** el sistema devuelve 404 con un mensaje de error

### Requirement: Editar un libro existente
El sistema SHALL permitir reemplazar todos los campos editables de un libro (título, autor, año, ISBN) en una única operación. El id y el created_at no son modificables.

#### Scenario: Editar libro con datos válidos
- **WHEN** el cliente envía título, autor, año e ISBN válidos para un ID existente
- **THEN** el sistema actualiza el libro y devuelve 200 con el objeto actualizado

#### Scenario: Editar libro — limpiar campos opcionales
- **WHEN** el cliente envía año o ISBN con valor null para un ID existente
- **THEN** el sistema actualiza el libro dejando esos campos como null y devuelve 200

#### Scenario: Editar libro inexistente
- **WHEN** el cliente intenta editar un libro con un ID que no existe
- **THEN** el sistema devuelve 404 con un mensaje de error

#### Scenario: Rechazar ISBN duplicado al editar
- **WHEN** el cliente envía un ISBN que ya pertenece a otro libro distinto
- **THEN** el sistema devuelve 409 con un mensaje de error que indica que el ISBN ya está registrado

### Requirement: Eliminar un libro
El sistema SHALL permitir eliminar un libro de forma definitiva. La operación no tiene marcha atrás (no soft delete).

#### Scenario: Eliminar libro existente
- **WHEN** el cliente solicita eliminar un libro con un ID que existe
- **THEN** el sistema elimina el registro de forma permanente y devuelve 204 sin cuerpo

#### Scenario: Eliminar libro inexistente
- **WHEN** el cliente solicita eliminar un libro con un ID que no existe
- **THEN** el sistema devuelve 404 con un mensaje de error

### Requirement: Unicidad de ISBN cuando está presente
El sistema SHALL garantizar que no existan dos libros con el mismo ISBN no nulo. Múltiples libros pueden tener ISBN null sin conflicto.

#### Scenario: Dos libros sin ISBN coexisten
- **WHEN** el catálogo ya contiene un libro sin ISBN y el cliente añade otro libro sin ISBN
- **THEN** el sistema crea el segundo libro sin error

#### Scenario: ISBN duplicado es rechazado
- **WHEN** el catálogo ya contiene un libro con ISBN "978-3-16-148410-0" y el cliente intenta añadir otro libro con el mismo ISBN
- **THEN** el sistema devuelve 409
