import { type UserType } from "../../../../backend/models/user.model";
export type MemberType = Omit<UserType, "password"> & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};
