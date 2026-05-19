import { Request, Response } from "express";
import Message from "../models/message.model";
import z from "zod";
import cloudinary from "../config/cloudinary";
import { io } from "../socket/socket";
import webpush from "web-push";
import { Subscription } from "../models/subscription.model";

interface ImagesType {
  url: string;
  publicId: string;
}

const sendMessageSchema = z
  .object({
    text: z.string(),
    images: z.array(z.string()),
  })
  .refine(
    (data) => {
      const hasMessage = data.text.trim().length > 0;
      const hasImages = data.images.length > 0;
      return hasMessage || hasImages;
    },
    {
      message: "テキストか画像のどちらかは必須です",
      path: ["text"],
    },
  );

webpush.setVapidDetails(
  process.env.VAPID_EMAIL!,
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

export async function sendMessage(req: Request, res: Response) {
  // console.log("message send");
  try {
    const validateBody = sendMessageSchema.parse(req.body);
    const { text = "", images = [] } = validateBody;
    if (!req.user)
      return res.status(401).json({ error: "ログインしてください" });
    const senderId = req.user._id;

    let imageUrls: ImagesType[] = [];

    if (images !== null) {
      const uploadPromises = images.map((image) =>
        cloudinary.uploader.upload(image, {
          folder: process.env.CLOUDINARY_FOLDER,
        }),
      );
      const uploadResults = await Promise.all(uploadPromises);
      // 2. アップロード後のURLを取得
      imageUrls = uploadResults.map((result) => ({
        url: result.secure_url,
        publicId: result.public_id,
      }));
    }
    const newMessage = new Message({
      senderId,
      text,
      images: imageUrls,
      readBy: [senderId],
    });
    await newMessage.save();
    const populatedMessage = await newMessage.populate(
      "senderId",
      "username profilePic",
    );
    io.emit("newMessage", populatedMessage);

    // 通知を送信する処理

    // 自分以外のユーザーの通知登録情報をすべて取得
    const subscriptions = await Subscription.find({
      userId: { $ne: senderId },
    });
    const notificationPayload = JSON.stringify({
      title: `${req.user.username}からの新着メッセージ`,
      body: text || "画像を送信しました",
    });
    // 全デバイスにプッシュ送信
    subscriptions.forEach((sub) => {
      webpush
        .sendNotification(sub.subscription, notificationPayload)
        .catch((err) => {
          if (err.statusCode === 410) {
            Subscription.deleteOne({ _id: sub._id }).exec();
          }
        });
    });

    res.status(201).json(newMessage);
  } catch (err) {
    if (err instanceof z.ZodError) {
      const formattedErrors = z.treeifyError(err);
      console.log("バリデーションに失敗しました", formattedErrors);
      return res.status(400).json({
        error: "入力内容が正しくありません",
        details: formattedErrors,
      });
    }
    if (err instanceof Error) {
      console.log("sendMessage controllerでエラーが発生しました", err.message);
    } else {
      console.log("sendMessage controllerでエラーが発生しました", err);
    }
    res
      .status(500)
      .json({ error: "メッセージ送信中にサーバー内でエラーが発生しました" });
  }
}

export async function getMessages(req: Request, res: Response) {
  try {
    if (!req.user)
      return res.status(401).json({ error: "ログインしてください" });
    // .populate("senderId", "username profilePic")
    // 第一引数: 展開したいフィールド名
    // 第二引数: 取得したいフィールドの絞り込み（パスワードなどは含めない）
    const messages = await Message.find().populate(
      "senderId",
      "username profilePic",
    );
    // findメソッドはデータがないときは[]を返す
    res.status(200).json(messages);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.log("getMessages controllerでエラーが発生しました", errorMessage);
    // if (err instanceof Error) {
    //   console.log("getMessages controllerでエラーが発生しました", err.message);
    // } else {
    //   console.log("getMessages controllerでエラーが発生しました", err);
    // }
    res
      .status(500)
      .json({ error: "メッセージの全件取得中にエラーが発生しました" });
  }
}

export async function markAsRead(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ error: "ログインしてください" });
  try {
    const userId = req.user._id;
    // まだ自分が readBy に入っていないメッセージのIDを取得する
    // どのメッセージが更新されたか判別するため
    const messagesToUpdate = await Message.find({ readBy: { $ne: userId } });
    const updateMessageIds = messagesToUpdate.map((message) => message._id);
    if (updateMessageIds.length > 0) {
      await Message.updateMany(
        { _id: { $in: updateMessageIds } },
        { $addToSet: { readBy: userId } },
      );
      io.emit("messagesRead", { userId, messageIds: updateMessageIds });
    }
    // ----既読機能をリアルタイム化する前のコード----
    // await Message.updateMany(
    //   { readBy: { $ne: userId } }, // 自分が既読していないメッセージ
    //   { $addToSet: { readBy: userId } }, // $addToSetを使うと重複登録されない
    // );
    // ------------------------------------------
    res.status(200).json({ message: "既読にしました" });
  } catch (err) {
    const errorData = err instanceof Error ? err.message : String(err);
    console.log("markAsRead実行中にエラーが発生しました", errorData);
    res
      .status(500)
      .json({ error: "既読処理中(markAsRead実行中)にエラーが発生しました" });
  }
}
