import { z } from "zod";

export const SRegisterUser = z
  .object({
    username: z.string().min(1, "نام کاربری الزامی می‌‌باشد"),
    email: z
      .string({ invalid_type_error: "ایمیل الزامی می‌‌باشد" })
      .email({ message: "ایمیل درست" }),
    password: z
      .string({ invalid_type_error: "رمز عبور الزامی می‌‌باشد" })
      .min(1, "رمز عبور الزامی می‌‌باشد"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Path of the error
  });
