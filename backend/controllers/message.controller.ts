import { Request, Response } from "express";
import Message from "../models/message.model";
import z from "zod";

const sendMessageSchema = z.object({
  message: z.string(),
});

export async function sendMessage(req: Request, res: Response) {
  // console.log("message send");
  try {
    const validateBody = sendMessageSchema.parse(req.body);
    const { message } = validateBody;
    if (!req.user)
      return res.status(401).json({ error: "ログインしてください" });
    const senderId = req.user._id;
    const newMessage = new Message({
      senderId,
      message,
    });
    await newMessage.save();
    // 後でここにsocket.ioを追加する
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
    const messages = await Message.find();
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
