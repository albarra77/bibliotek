/**
 * @bibliotek/shared
 *
 * Tipos y schemas compartidos entre API y frontend.
 *
 * IMPORTANTE: este paquete está intencionalmente vacío para que sea OpenSpec
 * quien guíe la definición del dominio. Cuando ejecutes tu primera propuesta
 * (por ejemplo `/opsx:propose books-catalog`), los schemas Zod y los tipos
 * deberían vivir aquí, no duplicados entre API y web.
 *
 * Convenciones sugeridas:
 *   - Un archivo por capability: books.ts, reading-status.ts, etc.
 *   - Exportar tanto el schema Zod como el tipo inferido.
 *   - Re-exportar todo desde este index.ts.
 *
 * Ejemplo de cómo quedará:
 *
 *   import { z } from 'zod';
 *
 *   export const BookSchema = z.object({
 *     id: z.string().uuid(),
 *     title: z.string().min(1),
 *     author: z.string().min(1),
 *   });
 *   export type Book = z.infer<typeof BookSchema>;
 */

export * from './books.js';
