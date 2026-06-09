## ADDED Requirements

### Requirement: API de listado paginado
El endpoint `GET /books` SHALL aceptar los parámetros opcionales `?page` (entero ≥ 1, default 1) y `?limit` (entero ≥ 1, default 5). La respuesta SHALL tener la forma `{ data: Book[], total: number }` donde `total` es el número total de libros en el catálogo independientemente de la página solicitada.

#### Scenario: Listado con parámetros por defecto
- **WHEN** el cliente llama a `GET /books` sin parámetros
- **THEN** el sistema devuelve `{ data: [...], total: N }` con hasta 5 libros ordenados por fecha de creación descendente

#### Scenario: Listado de una página concreta
- **WHEN** el cliente llama a `GET /books?page=2&limit=5` y existen más de 5 libros
- **THEN** el sistema devuelve los libros correspondientes a la segunda página y el `total` correcto

#### Scenario: Página fuera de rango devuelve array vacío y muestra mensaje
- **WHEN** el cliente llama a `GET /books?page=99&limit=5` y no hay suficientes libros
- **THEN** el sistema devuelve `{ data: [], total: N }` con status 200
- **AND** la interfaz muestra el texto "No hay resultados"

#### Scenario: Total refleja todos los libros, no solo los de la página
- **WHEN** existen 12 libros y el cliente llama a `GET /books?page=1&limit=5`
- **THEN** la respuesta contiene `total: 12` y `data` con 5 libros

---

### Requirement: Controles de paginación en el listado
La interfaz SHALL mostrar controles de paginación (anterior, siguiente, números de página y selector de tamaño) cuando el total de libros supera el tamaño de página actual. Si el total es menor o igual al tamaño de página, los controles no SHALL mostrarse.

#### Scenario: Controles visibles con más libros que el límite
- **WHEN** el catálogo tiene 12 libros y el límite es 5
- **THEN** se muestran controles de paginación con botones anterior y siguiente

#### Scenario: Controles ocultos cuando caben todos en una página
- **WHEN** el catálogo tiene 3 libros y el límite es 5
- **THEN** no se muestran controles de paginación

#### Scenario: Botón anterior desactivado en la primera página
- **WHEN** el usuario está en la página 1
- **THEN** el botón "Anterior" está desactivado o no es accionable

#### Scenario: Botón siguiente desactivado en la última página
- **WHEN** el usuario está en la última página
- **THEN** el botón "Siguiente" está desactivado o no es accionable

---

### Requirement: Estado de paginación en la URL
El estado de paginación (página actual y tamaño) SHALL reflejarse en los query params de la URL (`?page=N&limit=M`). Recargar la página SHALL mantener la página y el tamaño activos.

#### Scenario: URL refleja la página activa
- **WHEN** el usuario navega a la página 3 con límite 10
- **THEN** la URL es `/books?page=3&limit=10`

#### Scenario: Recarga mantiene la paginación
- **WHEN** el usuario recarga el navegador en `/books?page=2&limit=5`
- **THEN** se muestra la segunda página con tamaño 5

---

### Requirement: Selector dinámico de tamaño de página
El selector SHALL mostrar únicamente las opciones de tamaño `[5, 10, 20]` que resultarían en más de una página (es decir, cuyo valor es menor que el total de libros). Al cambiar el tamaño, la paginación SHALL reiniciarse a la página 1.

#### Scenario: Selector muestra solo opciones relevantes
- **WHEN** el catálogo tiene 12 libros
- **THEN** el selector muestra las opciones 5 y 10 (no 20, ya que 20 ≥ 12)

#### Scenario: Cambiar tamaño de página reinicia a página 1
- **WHEN** el usuario está en la página 3 y cambia el límite a 10
- **THEN** la URL pasa a `/books?page=1&limit=10`

---

### Requirement: Ajuste automático al borrar el último libro de una página
Si tras borrar un libro la página actual queda vacía y existe una página anterior, la interfaz SHALL navegar automáticamente a la página anterior.

#### Scenario: Borrar último libro de una página intermedia
- **WHEN** el usuario está en la página 2 y borra el único libro que quedaba en esa página
- **THEN** la interfaz navega a la página 1 automáticamente
