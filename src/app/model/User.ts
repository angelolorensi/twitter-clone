export interface User{

  id:number;
  username: string;
  bio: string;
  name: string;
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
  accountCreationDate:Date;
  enabled: boolean;
  verified: boolean;
  firstLogin: boolean;
  followersCount:number;
  followingCount:number;
}
