import { Image } from "./Image";

export interface User{

  id:number;
  username: string;
  bio: string;
  name: string;
  profilePicture: Image;
  bannerPicture: Image;
  email: string;
  phone: string;
  dateOfBirth: Date;
  accountCreationDate:Date;
  enabled: boolean;
  verified: boolean;
  firstLogin: boolean;
  followersCount:number;
  followingCount:number;
}
