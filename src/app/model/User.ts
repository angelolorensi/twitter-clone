export interface User{

  id:number;
  username: string;
  bio: string;
  nickname: string;
  profilePicture: {
    imageId: number,
    imageName:string,
    imageType: string,
    imageUrl: string
  };
  bannerPicture:  {
    imageId: number,
    imageName:string,
    imageType: string,
    imageUrl: string
  };
  email: string;
  phone: string;
  dateOfBirth: Date;
  enabled: boolean;
  verified: boolean;
  followersCount:number;
  followingCount:number;
}
