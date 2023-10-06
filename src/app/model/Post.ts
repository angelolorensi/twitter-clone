import { Image } from "./Image";
import { User } from "./User";

export interface Post{

  id: number;
  content: string;
  postedDate: Date;
  author: User;
  likes: User[];
  images: Image[];
  reposts: User[];
  bookmarks: [];
  view: [];
  scheduled: boolean;
  sheduledDate: Date;
  audience: string;
  replyRestriction: string;

}
