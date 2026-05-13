import z from "zod";

export const changeUsernameSchema = z.object({
  currentUsername: z.string(),
  newUsername: z
    .string()
    .min(2, { message: "ユーザー名は２文字以上で入力してください" }),
  password: z.string().min(1, { message: "パスワードは必須です" }),
});

export type ChangeUsernameType = z.infer<typeof changeUsernameSchema>;
