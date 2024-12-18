export interface ITiktokVideo {
  videoId: string;
  title: string;
  createTime: number;
  duration: number;
  ratio: string;
  image: string;
  authorId: string;
  uniqueId: string;
  nickname: string;
  avatarThumb: string;
  signature: string;
  musicId: string;
  diggCount: number;
  shareCount: number;
  commentCount: number;
  playCount: number;
  collectCount: number;
  followingCount: number;
  followerCount: number;
  heartCount: number;
  videoCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}
