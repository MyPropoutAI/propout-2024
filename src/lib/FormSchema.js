import { z } from "zod";

export const FormSchema = z
  .object({
    name: z.string().trim().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    phone_number: z.string().min(9, "Name must be at least 11 characters long"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .refine(
        (value) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])/.test(
            value
          ),
        {
          message:
            "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special symbol",
        }
      ),

    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .refine(
      (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])/.test(
          value
        ),
      {
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special symbol",
      }
    ),
});
