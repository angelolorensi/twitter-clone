import { User } from "./User";

export interface Post{

  id: number;
  content: string;
  postedDate: Date;
  author: User;
  likes: [];
  images: [];
  reposts: [];
  bookmarks: [];
  view: [];
  scheduled: boolean;
  sheduledDate: Date;
  audience: string;
  replyRestriction: string;

}
