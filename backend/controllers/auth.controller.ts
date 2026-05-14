import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import z from "zod";
import generateTokenAndSetCookie from "../utils/generateToken";
import jwt from "jsonwebtoken";

const signupSchema = z
  .object({
    username: z.string(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    gender: z.enum(["male", "female"], {
      message: "性別は male または female を選択してください",
    }),
    company: z.literal("というわけで", { message: "カンパニー名が違います" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
  });

export async function signup(req: Request, res: Response) {
  // console.log("Signup User");
  try {
    const validateBody = signupSchema.parse(req.body);
    const { username, password, gender } = validateBody;
    // Zodのバリデーションでチェックするように変更
    // パスワードが一致しない場合はparseメソッドでエラーが投げられcatchブロックに移行
    // if (password !== confirmPassword)
    //   return res.status(400).json({ error: "パスワードが一致しません" });
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
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET!, {
        expiresIn: "15d",
      });
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        gender: newUser.gender,
        profilePic: newUser.profilePic,
        token,
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
// ---------Cookieを使用するコード--------
// export async function signup(req: Request, res: Response) {
//   // console.log("Signup User");
//   try {
//     const validateBody = signupSchema.parse(req.body);
//     const { username, password, gender } = validateBody;
//     // Zodのバリデーションでチェックするように変更
//     // パスワードが一致しない場合はparseメソッドでエラーが投げられcatchブロックに移行
//     // if (password !== confirmPassword)
//     //   return res.status(400).json({ error: "パスワードが一致しません" });
//     const user = await User.findOne({ username });
//     if (user)
//       return res
//         .status(400)
//         .json({ error: "ユーザー名がすでに使われています" });
//     // パスワードのハッシュ化
//     const solt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, solt);
//     // アバターの設定(DiceBearというサイトを利用)
//     const boyProfilePic = `https://api.dicebear.com/9.x/avataaars/svg?seed=${username}&top=shortFlat,shortRound,theCaesar,shaggy,shortWaved,shortCurly`;
//     const girlProfilePic = `https://api.dicebear.com/9.x/avataaars/svg?seed=${username}&top=bigHair,bob,curvy,straight01,straightAndStrand`;
//     const newUser = new User({
//       username,
//       password: hashedPassword,
//       gender,
//       profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
//     });
//     if (newUser) {
//       generateTokenAndSetCookie(newUser._id, res);
//       await newUser.save();
//       res.status(201).json({
//         _id: newUser._id,
//         username: newUser.username,
//         gender: newUser.gender,
//         profilePic: newUser.profilePic,
//       });
//     } else {
//       res.status(400).json({ error: "作成されたユーザーのデータがありません" });
//     }
//   } catch (err) {
//     // 1. バリデーションエラー（Zod）の場合
//     if (err instanceof z.ZodError) {
//       console.log("バリデーションに失敗しました:", err.issues);
//       return res.status(400).json({
//         error: "入力内容が正しくありません",
//         details: err.issues, // どの項目がエラーか詳細を返すことも可能
//       });
//       // // format() を使うと { username: { _errors: [...] }, password: ... } のような形になる
//       // // 非推奨: const formattedErrors = err.format();
//       // // 推奨: z.treeifyError(err) を使う。表示のされ方は同じ。
//       // const formattedErrors = z.treeifyError(err);
//       // console.log("バリデーションに失敗しました:", formattedErrors);
//       // return res.status(400).json({
//       //   error: "入力内容が正しくありません",
//       //   details: formattedErrors,
//       // });
//     }
//     if (err instanceof Error) {
//       console.log("signup controllerでエラーが発生しました", err.message);
//     } else {
//       console.log("signup controllerでエラーが発生しました", err);
//     }
//     res
//       .status(500)
//       .json({ error: "サインアップ実行中にサーバー内でエラーが発生しました" });
//   }
// }

const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(6),
});

export async function login(req: Request, res: Response) {
  // console.log("Login User");
  console.log(process.env.NODE_ENV);
  try {
    const validateBody = loginSchema.parse(req.body);
    const { username, password } = validateBody;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || "",
    );
    if (!user || !isPasswordCorrect)
      return res
        .status(400)
        .json({ error: "ユーザー名またはパスワードが間違っています" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "15d",
    });
    res.status(200).json({
      _id: user._id,
      username: user.username,
      gender: user.gender,
      profilePic: user.profilePic,
      token,
    });
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
      console.log("Login Controllerでエラーが発生しました", err.message);
    } else {
      console.log("Login Controllerでエラーが発生しました", err);
    }
    res
      .status(500)
      .json({ error: "ログイン実行中にサーバー内でエラーが発生しました" });
  }
}

// ----------Cookieを使用するコード--------------
// export async function login(req: Request, res: Response) {
//   // console.log("Login User");
//   console.log(process.env.NODE_ENV);
//   try {
//     const validateBody = loginSchema.parse(req.body);
//     const { username, password } = validateBody;
//     const user = await User.findOne({ username });
//     const isPasswordCorrect = await bcrypt.compare(
//       password,
//       user?.password || "",
//     );
//     if (!user || !isPasswordCorrect)
//       return res
//         .status(400)
//         .json({ error: "ユーザー名またはパスワードが間違っています" });
//     generateTokenAndSetCookie(user._id, res);
//     res.status(200).json({
//       _id: user._id,
//       username: user.username,
//       gender: user.gender,
//       profilePic: user.profilePic,
//     });
//   } catch (err) {
//     if (err instanceof z.ZodError) {
//       const formattedErrors = z.treeifyError(err);
//       console.log("バリデーションに失敗しました", formattedErrors);
//       return res.status(400).json({
//         error: "入力内容が正しくありません",
//         details: formattedErrors,
//       });
//     }
//     if (err instanceof Error) {
//       console.log("Login Controllerでエラーが発生しました", err.message);
//     } else {
//       console.log("Login Controllerでエラーが発生しました", err);
//     }
//     res
//       .status(500)
//       .json({ error: "ログイン実行中にサーバー内でエラーが発生しました" });
//   }
// }

export function logout(req: Request, res: Response) {
  try {
    res.status(200).json({ message: "ログアウトしました" });
  } catch (err) {
    if (err instanceof Error) {
      console.log("Logout Controllerでエラーが発生しました", err.message);
    } else {
      console.log("Logout Controllerでエラーが発生しました", err);
    }
    res
      .status(500)
      .json({ error: "ログアウト実行中にサーバー内でエラーが発生しました" });
  }
}

// -----------------Cookieを使用するコード----------------
// export function logout(req: Request, res: Response) {
//   // console.log("Logout User");
//   try {
//     res.cookie("jwt", "", {
//       maxAge: 0,
//       httpOnly: true,
//       sameSite: "none",
//       secure: process.env.NODE_ENV !== "development",
//     });
//     res.status(200).json({ message: "正常にログアウトしました" });
//   } catch (err) {
//     if (err instanceof Error) {
//       console.log("Logout Controllerでエラーが発生しました", err.message);
//     } else {
//       console.log("Logout Controllerでエラーが発生しました", err);
//     }
//     res
//       .status(500)
//       .json({ error: "ログアウト実行中にサーバー内でエラーが発生しました" });
//   }
// }
