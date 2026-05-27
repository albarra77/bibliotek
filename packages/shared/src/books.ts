import { z } from 'zod';

export const BookSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  author: z.string().min(1),
  year: z.number().int().nullable(),
  isbn: z.string().nullable(),
  created_at: z.string(),
});

export const CreateBookSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  year: z.number().int().nullable().optional(),
  isbn: z.string().nullable().optional(),
});

export const UpdateBookSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  year: z.number().int().nullable(),
  isbn: z.string().nullable(),
});

export type Book = z.infer<typeof BookSchema>;
export type CreateBookInput = z.infer<typeof CreateBookSchema>;
export type UpdateBookInput = z.infer<typeof UpdateBookSchema>;
