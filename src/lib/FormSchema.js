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
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });
