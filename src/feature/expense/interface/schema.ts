import { z } from "zod";

export const SUpsertExpense = z.object({
  price: z.string().min(1, "قیمت الزامی می‌‌باشد"),
  category: z
    .string({ invalid_type_error: "دسته بندی الزامی می‌‌باشده" })
    .min(1, "دسته بندی الزامی می‌‌باشد"),
  sub_category: z
    .string({ invalid_type_error: "دسته بندی الزامی می‌‌باشده" })
    .min(1, "دسته بندی الزامی می‌‌باشد"),
});
export const SUpsertCategory = z.object({
  name: z.string().min(1, "نام الزامی می‌‌باشد"),
});
export const SUpsertSubCategory = z.object({
  category: z
    .string({ invalid_type_error: "دسته بندی الزامی می‌‌باشده" })
    .min(1, "دسته بندی الزامی می‌‌باشد"),
  name: z.string().min(1, "نام الزامی می‌‌باشد"),
});
