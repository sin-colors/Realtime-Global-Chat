import { Request, Response } from "express";
import { Subscription } from "../models/subscription.model";

export async function saveSubscription(req: Request, res: Response) {
  const { subscription } = req.body;
  if (req.user) return res.status(401).json({ error: "ログインしてください" });
  const userId = req.user._id;
  await Subscription.findOneAndUpdate(
    { "subscription.endpoint": subscription.endpoint },
    { userId, subscription },
    { upsert: true },
  );
  res.status(201).json({ message: "通知設定を保存しました" });
}
