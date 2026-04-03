import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";

export async function signup(req: Request, res: Response) {
  // console.log("Signup User");
  try {
    const { username, password, confirmPassword, gender } = req.body;
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
