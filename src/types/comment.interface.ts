import { IProfile } from "./profile.interface";

export interface IComment {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: IProfile;
}
