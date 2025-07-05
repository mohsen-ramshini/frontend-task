import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "ایمیل معتبر نیست" }),
  password: z.string().min(6, { message: "پسورد باید حداقل ۶ کاراکتر باشد" }),
});
export const signUpSchema = z.object({
  email: z.string().email({ message: "ایمیل معتبر نیست" }),
  password: z.string().min(6, { message: "پسورد باید حداقل ۶ کاراکتر باشد" }),
});
