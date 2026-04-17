import { UserType } from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: UserType | null;
    }
  }
}

// これでもOK(cookie-parserというライブラリはこの形でexpressのRequestを拡張している)
// declare module "express" {
//   interface Request {
//     user?: UserType | null;
//   }
// }
