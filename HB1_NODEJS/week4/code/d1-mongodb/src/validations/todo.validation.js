import { z } from "zod";

export const createTodoSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "Tiêu đề là bắt buộc" }).min(1, "Tiêu đề không được để trống"),
    description: z.string().optional(),
    isCompleted: z.boolean().optional(),
  }),
});

export const updateTodoSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    isCompleted: z.boolean().optional(),
  }),
});
