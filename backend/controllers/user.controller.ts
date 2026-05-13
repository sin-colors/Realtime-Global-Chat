import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";

export async function getUsersForSidebar(req: Request, res: Response) {
  try {
    if (!req.user)
      return res.status(401).json({ error: "ログインしてください" });
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (err) {
    if (err instanceof Error) {
      console.log(
        "getUsersForSidebar controllerでエラーが発生しました",
        err.message,
      );
    } else {
      console.log("getUsersForSidebar controllerでエラーが発生しました", err);
    }
    res
      .status(500)
      .json({ error: "getUsersForSidebar関数を実行中にエラーが発生しました" });
  }
}

export function getMe(req: Request, res: Response) {
  try {
    if (!req.user)
      return res.status(401).json({ error: "ログインしていません" });
    return res.status(200).json(req.user);
  } catch (err) {
    const errorData = err instanceof Error ? err.message : err;
    console.log("getMe関数内でエラーが発生しました", errorData);
    return res.status(500).json({
      error: "ユーザー取得中(getMe実行中)にサーバー内でエラーが発生しました",
    });
  }
}

export async function changeUsername(req: Request, res: Response) {
  const { newUsername, password } = req.body;
  if (!req.user) return res.status(401).json({ error: "ログインしていません" });
  // データベースからユーザーを取得
  const user = await User.findById(req.user._id);
  if (user === null)
    return res.status(400).json({ error: "ユーザーが見つかりませんでした" });
  // パスワードの照合
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect)
    return res.status(400).json({ error: "パスワードが正しくありません" });
  // 新しいユーザー名がすでに使われていないか確認
  const existingUser = await User.findOne({ username: newUsername });
  if (existingUser)
    return res
      .status(400)
      .json({ error: "このユーザー名はすでに使われています" });
  const boyProfilePic = `https://api.dicebear.com/9.x/avataaars/svg?seed=${newUsername}&top=shortFlat,shortRound,theCaesar,shaggy,shortWaved,shortCurly`;
  const girlProfilePic = `https://api.dicebear.com/9.x/avataaars/svg?seed=${newUsername}&top=bigHair,bob,curvy,straight01,straightAndStrand`;
  // データベースの更新
  user.username = newUsername;
  user.profilePic = user.gender === "male" ? boyProfilePic : girlProfilePic;
  await user.save();
  return res.status(201).json({ message: "ユーザー名を更新しました" });
}
