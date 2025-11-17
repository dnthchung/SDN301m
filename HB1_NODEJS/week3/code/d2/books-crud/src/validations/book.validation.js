import { z } from "zod";

// Dùng export const cho từng schema
export const createSchema = z.object({
  title: z.string().min(1, "title is required"),
  author: z.string().min(1, "author is required"),
  year: z.number().int().nonnegative().optional(),
});

export const updateSchema = z.object({
  title: z.string().min(1, "title is required"),
  author: z.string().min(1, "author is required"),
  year: z.number().int().nonnegative().optional(),
});

export const patchSchema = z.object({
  title: z.string().min(1).optional(),
  author: z.string().min(1).optional(),
  year: z.number().int().nonnegative().optional(),
});
