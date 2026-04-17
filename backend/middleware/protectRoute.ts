import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user.model";

// decodedToken.userId → プロパティ 'userId' は型 'string | JwtPayload' に存在しません。
// という型エラーが発生したためJwtPayload(インターフェース)を拡張する
// ちなみにJwtPayloadは以下のようにライブラリ(jsonwebtoken)で定義されている
// export interface JwtPayload {
//     [key: string]: any;
//     iss?: string | undefined;
//     sub?: string | undefined;
//     aud?: string | string[] | undefined;
//     exp?: number | undefined;
//     nbf?: number | undefined;
//     iat?: number | undefined;
//     jti?: string | undefined;
// }
interface DecodedToken extends JwtPayload {
  userId: string;
}

// req.user → プロパティ 'user' は型 'Request<.....>' に存在しません。
// という型エラーが発生したためRequestインターフェースの型を拡張(グローバルに拡張)した
// 拡張のコード自体はbackend/types/express.d.tsに記述した

async function protectRoute(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ error: "トークンがありません" });
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET!,
    ) as DecodedToken;
    if (!decodedToken)
      return res.status(401).json({ error: "トークンが無効になっています" });
    const user = await User.findById(decodedToken.userId).select("-password");
    if (!user)
      return res.status(404).json({ error: "ユーザーが見つかりません" });
    req.user = user;
    next();
  } catch (err) {
    if (err instanceof Error) {
      console.log(
        "protectRoute ミドルウェアでエラーが発生しました",
        err.message,
      );
    } else {
      console.log("protectRoute ミドルウェアでエラーが発生しました", err);
    }
    res
      .status(500)
      .json({ error: "ユーザーのログイン確認中にエラーが発生しました" });
  }
}

export default protectRoute;
