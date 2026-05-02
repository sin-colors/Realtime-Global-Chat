import z from "zod";

export const registerSchema = z
  .object({
    username: z.string().min(1, { message: "ユーザー名を入力してください" }),
    password: z
      .string()
      .min(8, { message: "パスワードは８文字以上で入力してください" }),
    confirmPassword: z.string(),
    gender: z.enum(["male", "female"], { message: "性別を選択してください" }),
    company: z.literal("というわけで", { message: "カンパニー名が違います" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
  });

export type RegisterType = z.infer<typeof registerSchema>;

//-----------------------------------------

export const loginSchema = z.object({
  username: z.string().min(1, { message: "ユーザー名を入力してください" }),
  password: z
    .string()
    .min(8, { message: "パスワードは８文字以上で入力してください" }),
});

export type LoginType = z.infer<typeof loginSchema>;
