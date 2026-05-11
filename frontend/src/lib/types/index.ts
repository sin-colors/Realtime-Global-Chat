export interface UserTypeAtFrontend {
  _id: string; // MongoDBのObjectIdはJSONでは文字列になる
  username: string;
  gender: "male" | "female";
  profilePic: string;
  createdAt: string; // timestamps: true により生成。JSONではISO文字列
  updatedAt: string; // 同上
  // password は .select("-password") で除外されているため含まれない
}

export interface MessageType {
  _id: string;
  senderId: {
    _id: string;
    username: string;
    profilePic: string;
  };
  text: string;
  images: { url: string; publicId: string }[];
  // isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SendMessageProps {
  text: string;
  images: string[];
}
