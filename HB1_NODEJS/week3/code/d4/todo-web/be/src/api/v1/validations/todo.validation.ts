import { z } from "zod";

export const createTodoSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
  }),
});

export const updateTodoSchema = z.object({
  body: z.object({
    title: z.string().min(3).optional(),
    completed: z.boolean().optional(),
  }),
  params: z.object({
    id: z.string(),
  }),
});
