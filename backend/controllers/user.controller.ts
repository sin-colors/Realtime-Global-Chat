import { Request, Response } from "express";
import User from "../models/user.model";

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
    return res
      .status(500)
      .json({
        error: "ユーザー取得中(getMe実行中)にサーバー内でエラーが発生しました",
      });
  }
}
