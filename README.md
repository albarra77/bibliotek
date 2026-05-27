# Bibliotek

Lista personal de lectura. Proyecto de pruebas para **Spec-Driven Development con [OpenSpec](https://github.com/Fission-AI/OpenSpec)**.

El objetivo no es la app en sí, sino practicar el ciclo completo de SDD: escribir specs antes de código, iterar con *change proposals* y archivar cambios completados.

## Stack

- **Backend**: Node 20 + TypeScript + [Hono](https://hono.dev/) + SQLite (`better-sqlite3`) + Zod
- **Frontend**: Vite + React + TypeScript
- **Compartido**: paquete `@bibliotek/shared` con schemas Zod y tipos
- **Monorepo**: pnpm workspaces

## Estructura

```
bibliotek/
├── apps/
│   ├── api/          # API Hono + SQLite
│   └── web/          # Frontend Vite + React
├── packages/
│   └── shared/       # Tipos y schemas Zod compartidos
├── openspec/         # (lo crea `openspec init`)
└── package.json      # Root del monorepo
```

## Puesta en marcha

Requisitos: Node ≥ 20.19, pnpm ≥ 9, OpenSpec instalado globalmente.

```bash
# 1. Instalar OpenSpec (solo la primera vez en tu máquina)
npm install -g @fission-ai/openspec@latest

# 2. Instalar dependencias del proyecto
pnpm install

# 3. Inicializar OpenSpec (te preguntará qué asistente de IA usas)
openspec init

# 4. Levantar API y frontend en paralelo
pnpm dev
```

Tras esto:
- API en `http://localhost:3000` (de momento solo `GET /health`)
- Frontend en `http://localhost:5173` (proxy `/api/*` → `http://localhost:3000`)

## Flujo SDD con OpenSpec

Este repo está deliberadamente **vacío de lógica de negocio**. Toda feature debe entrar a través del ciclo de OpenSpec:

1. **Propose** — pides a tu asistente la primera propuesta:

   ```
   /opsx:propose books-catalog
   ```

   OpenSpec generará `openspec/changes/books-catalog/` con `proposal.md`, `specs/`, `design.md` y `tasks.md`. Revisa y ajusta antes de implementar.

2. **Apply** — cuando el spec te convence:

   ```
   /opsx:apply
   ```

   El asistente sigue `tasks.md` y va implementando. Verifica cada paso.

3. **Archive** — al terminar:

   ```
   /opsx:archive
   ```

   El cambio se mueve a `openspec/changes/archive/<fecha>-books-catalog/` y los specs vivos se actualizan.

## Plan de capabilities sugerido

Pensado para practicar tanto adiciones como *deltas* sobre specs existentes:

| # | Capability             | Tipo de change                                | Qué practicas                       |
|---|------------------------|-----------------------------------------------|-------------------------------------|
| 1 | `books-catalog`        | Capability nueva (initial spec)               | Crear specs desde cero, archivar    |
| 2 | `reading-status`       | Capability nueva                              | Añadir capability a un dominio vivo |
| 3 | `notes-and-ratings`    | Capability nueva                              | Repetir el patrón                   |
| 4 | `search-and-filter`    | Delta sobre `books-catalog`                   | Modificar spec existente            |
| 5 | `reading-history`      | Delta sobre `reading-status` (cambio de regla)| El caso más interesante de SDD      |
| 6 | `import-open-library`  | Capability nueva (integración externa)        | Specs que tocan servicios externos  |

## Scripts útiles

```bash
pnpm dev          # API + web en paralelo
pnpm dev:api      # solo API
pnpm dev:web      # solo web
pnpm typecheck    # tsc en todos los paquetes
pnpm test         # vitest en todos los paquetes
pnpm build        # build de todos los paquetes
```

## Variables de entorno

- `PORT` — puerto de la API (por defecto `3000`)
- `BIBLIOTEK_DB` — ruta absoluta al archivo SQLite (por defecto `bibliotek.db` en la raíz)

## Notas sobre el diseño inicial

- **API sin endpoints de dominio**: solo `/health`. Cualquier endpoint debe nacer de una spec.
- **`packages/shared` vacío**: los schemas Zod del dominio deberían vivir aquí, no duplicados.
- **SQLite sin tablas**: el esquema debe derivarse de la primera spec, no inventarse por adelantado.

Esto es a propósito: si arrancas con código ya escrito, el ciclo de OpenSpec se siente artificial.
