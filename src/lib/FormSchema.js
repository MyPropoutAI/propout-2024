import { z } from "zod";

export const FormSchema = z
  .object({
    name: z.string().trim().min(3, "Name must be at least 3 characters long"),

    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),

    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
      });
    }
  });
