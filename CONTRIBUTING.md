# Cómo trabajar en Bibliotek

Este documento describe el ciclo de trabajo que usamos para añadir cambios al proyecto. Combina **Spec-Driven Development con [OpenSpec](https://github.com/Fission-AI/OpenSpec)** y un flujo de **ramas + PR en GitHub**.

La idea de fondo: ningún código nuevo entra a `main` sin haber pasado primero por una spec aprobada y archivada.

## Requisitos

- Node ≥ 20.19 y pnpm ≥ 9
- OpenSpec instalado globalmente: `npm install -g @fission-ai/openspec@latest`
- Una IA con soporte para OpenSpec configurada en el repo (`openspec init` ya se hizo)
- Acceso al repo de GitHub con clave SSH o GitHub CLI autenticado

## El ciclo, paso a paso

Cada nuevo cambio sigue el mismo ciclo, desde una historia de usuario hasta `main`. Reemplaza `<nombre-del-change>` por el nombre kebab-case del cambio (por ejemplo `add-search-and-filter`).

### 0. Punto de partida

Tienes una historia de usuario escrita y `main` actualizado.

```powershell
cd C:\www\JeffryOS\proyectos\bibliotek
git checkout main
git pull
git status                                # debe decir "working tree clean"
```

### 1. Crear la rama de trabajo

```powershell
git checkout -b feature/<nombre-del-change>
```

Convención de nombres: kebab-case, descriptivo, mejor con verbo (`add-*`, `fix-*`, `refactor-*`). El nombre de la rama debe coincidir con el nombre del change de OpenSpec.

### 2. Refinar la historia con la IA

En el chat de tu asistente:

```
/opsx:explore
```

Pega la historia. El modelo te preguntará por ambigüedades, casos límite y decisiones de diseño. No genera ficheros en este paso. Itera hasta que el alcance esté claro.

### 3. Generar los artefactos del change

```
/opsx:propose <nombre-del-change>
```

Crea `openspec/changes/<nombre-del-change>/` con `proposal.md`, `specs/`, `design.md` y `tasks.md`. Revisa los artefactos antes de seguir. Si algo no cuadra, edítalo a mano o pídele en lenguaje natural que lo reescriba.

### 4. Implementar

```
/opsx:apply
```

La IA va tarea por tarea del `tasks.md`, escribe código y marca cada tarea con `[x]`. Si toma un mal camino, redirígele en lenguaje natural.

### 5. Comprobación manual

```powershell
pnpm typecheck
pnpm test
pnpm dev                                  # probar el flujo en el navegador
```

Cuando funciona como esperabas, `Ctrl+C` para parar el dev server.

### 6. Verificar spec ↔ código

```
/opsx:verify
```

- **Critical** → arreglar antes de seguir
- **Warning / Suggestion** → leer y decidir si aplicar o anotar como deuda

### 7. Commit de la implementación

```powershell
git status                                # repasa qué hay sin commitear
git add apps/ packages/
git commit -m "feat(<scope>): <descripción breve>"
```

Si tienes muchos ficheros mezclados, haz varios commits temáticos (`feat(api): …`, `feat(web): …`, `refactor: …`).

### 8. Archivar el change

```
/opsx:archive
```

Cuando pregunte si sincronizar las *delta specs* hacia `openspec/specs/`, responde **sí**. Mueve `openspec/changes/<nombre>/` a `openspec/changes/archive/YYYY-MM-DD-<nombre>/` y actualiza los specs vivos.

### 9. Commit del archivado

```powershell
git add openspec/
git status                                # debes ver el movimiento + cambios en openspec/specs/
git commit -m "chore(openspec): archive <nombre-del-change>"
```

### 10. Push de la rama

```powershell
git push -u origin HEAD
```

`HEAD` empuja la rama actual con su mismo nombre. Te devolverá una URL para abrir el PR.

### 11. Abrir el PR en GitHub

Abre la URL que aparece en la salida del push (Ctrl+click) o ve manualmente a:

```
https://github.com/<usuario>/bibliotek/compare/main...feature/<nombre-del-change>
```

Rellena:

- **Base**: `main`
- **Title**: `feat: <descripción>`
- **Body**: `Cierra la historia <nombre-del-change>. Spec archivada en openspec/changes/archive/.`

Revisa el diff y mergea. Para `main` recomendamos *Squash and merge* (un commit limpio en main) salvo que la granularidad de los commits sea importante.

### 12. Limpieza tras el merge

```powershell
git checkout main
git pull
git branch -d feature/<nombre-del-change>
git push origin --delete feature/<nombre-del-change>
```

Vuelve al paso 0 para la siguiente historia.

## Tarjeta resumen

Los comandos en orden, sin texto:

```
git checkout main && git pull
git checkout -b feature/<nombre>

# chat
/opsx:explore
/opsx:propose <nombre>
/opsx:apply

# terminal
pnpm typecheck && pnpm test
# (prueba manual)

# chat
/opsx:verify

# terminal
git add apps/ packages/
git commit -m "feat(<scope>): <descripción>"

# chat
/opsx:archive

# terminal
git add openspec/
git commit -m "chore(openspec): archive <nombre>"
git push -u origin HEAD
# abrir PR desde la URL que aparece, mergear desde la web

git checkout main && git pull
git branch -d feature/<nombre>
git push origin --delete feature/<nombre>
```

## Convenciones

### Nombres de rama

```
feature/<nombre-del-change>
```

El `<nombre-del-change>` debe coincidir 1:1 con el nombre que le des a OpenSpec en `/opsx:propose`.

### Mensajes de commit

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat(<scope>): …` — nueva funcionalidad
- `fix(<scope>): …` — corrección de bug
- `refactor(<scope>): …` — cambio interno sin cambio de comportamiento
- `chore(<scope>): …` — tareas administrativas (incluye `archive` de OpenSpec)
- `docs(<scope>): …` — solo documentación
- `test(<scope>): …` — solo tests

Scopes habituales: `api`, `web`, `shared`, `openspec`.

### Un PR = un change de OpenSpec

Cada PR debe llevar exactamente un change de OpenSpec, ya archivado. Si en mitad del trabajo descubres que necesitas otro change, abórtalo en una rama y PR aparte: mezclar dos changes en un PR rompe la trazabilidad del ciclo SDD.

## Recuperación de errores comunes

### `verify` saca avisos críticos

Arréglalos antes de archivar. Si necesitas reimplementar tareas, vuelve a `/opsx:apply` con el feedback. **No archives** mientras haya críticos.

### Ya archivaste y has visto algo mal

Deshaz el commit del archive (`git revert <sha>`), vuelve a tener el change "vivo", ajusta, y rearchiva. Si aún no has hecho push, puedes `git reset --soft HEAD~1` para deshacer el commit conservando los cambios.

### El push se queja de "src refspec does not match any"

El nombre de rama no coincide. Verifica con `git branch --show-current` y usa exactamente ese nombre, o más sencillo: `git push -u origin HEAD`.

### El push se queja de "non-fast-forward"

Tu rama está desactualizada respecto al remoto. Trae los cambios con `git pull --rebase` y vuelve a hacer push.

### Tienes miedo de archivar por si rompe algo

Antes de `/opsx:archive`, haz `git tag pre-archive-<nombre>` para tener un punto de retorno fácil. Si todo va bien, borra el tag con `git tag -d pre-archive-<nombre>`.
