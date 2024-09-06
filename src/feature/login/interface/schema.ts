import { z } from "zod";

export const SLoginUser = z.object({
  identifier: z.string().min(1, "نام کاربری یا ایمیل الزامی می‌‌باشد"),
  password: z
    .string({ invalid_type_error: "رمز عبور الزامی می‌‌باشد" })
    .min(1, "رمز عبور الزامی می‌‌باشد"),
});
