import z from "zod";

export const registerSchema = z
  .object({
    username: z.string().min(1, { message: "ユーザー名を入力してください" }),
    password: z
      .string()
      .min(8, { message: "パスワードは８文字以上で入力してください" }),
    confirmPassword: z.string(),
    gender: z.enum(["male", "female"], { message: "性別を選択してください" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
  });

export type RegisterType = z.infer<typeof registerSchema>;
