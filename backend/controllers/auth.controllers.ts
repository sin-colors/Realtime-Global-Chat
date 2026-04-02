import { Request, Response } from "express";

export function signup(req: Request, res: Response) {
  console.log("Signup User");
}
export function login(req: Request, res: Response) {
  console.log("Login User");
}
export function logout(req: Request, res: Response) {
  console.log("Logout User");
}
