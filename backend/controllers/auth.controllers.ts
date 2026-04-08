import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import z from "zod";
import generateTokenAndSetCookie from "../utils/generateToken";

const signupSchema = z.object({
  username: z.string(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  gender: z.enum(["male", "female"], {
    message: "性別は male または female を選択してください",
  }),
});

export async function signup(req: Request, res: Response) {
  // console.log("Signup User");
  try {
    const validateBody = signupSchema.parse(req.body);
    const { username, password, confirmPassword, gender } = validateBody;
    if (password !== confirmPassword)
      return res.status(400).json({ error: "パスワードが一致しません" });
    const user = await User.findOne({ username });
    if (user)
      return res
        .status(400)
        .json({ error: "ユーザー名がすでに使われています" });
    // パスワードのハッシュ化
    const solt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, solt);
    // アバターの設定(DiceBearというサイトを利用)
    const boyProfilePic = `https://api.dicebear.com/9.x/avataaars/svg?seed=${username}&top=shortFlat,shortRound,theCaesar,shaggy,shortWaved,shortCurly`;
    const girlProfilePic = `https://api.dicebear.com/9.x/avataaars/svg?seed=${username}&top=bigHair,bob,curvy,straight01,straightAndStrand`;
    const newUser = new User({
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        gender: newUser.gender,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "作成されたユーザーのデータがありません" });
    }
  } catch (err) {
    // 1. バリデーションエラー（Zod）の場合
    if (err instanceof z.ZodError) {
      console.log("バリデーションに失敗しました:", err.issues);
      return res.status(400).json({
        error: "入力内容が正しくありません",
        details: err.issues, // どの項目がエラーか詳細を返すことも可能
      });
      // // format() を使うと { username: { _errors: [...] }, password: ... } のような形になる
      // // 非推奨: const formattedErrors = err.format();
      // // 推奨: z.treeifyError(err) を使う。表示のされ方は同じ。
      // const formattedErrors = z.treeifyError(err);
      // console.log("バリデーションに失敗しました:", formattedErrors);
      // return res.status(400).json({
      //   error: "入力内容が正しくありません",
      //   details: formattedErrors,
      // });
    }
    if (err instanceof Error) {
      console.log("signup controllerでエラーが発生しました", err.message);
    } else {
      console.log("signup controllerでエラーが発生しました", err);
    }
    res
      .status(500)
      .json({ error: "サインアップ実行中にサーバー内でエラーが発生しました" });
  }
}
export function login(req: Request, res: Response) {
  console.log("Login User");
}
export function logout(req: Request, res: Response) {
  console.log("Logout User");
}
