export type VideoTiktokType = {
  id:                string;
  desc:              string;
  createTime:        number;
  video:             Video;
  author:            Author;
  music:             Music;
  challenges:        Challenge[];
  stats:             Stats;
  duetInfo:          DuetInfo;
  originalItem:      boolean;
  officalItem:       boolean;
  textExtra:         TextExtra[];
  secret:            boolean;
  forFriend:         boolean;
  digged:            boolean;
  itemCommentStatus: number;
  showNotPass:       boolean;
  vl1:               boolean;
  itemMute:          boolean;
  authorStats:       AuthorStats;
  privateItem:       boolean;
  duetEnabled:       boolean;
  stitchEnabled:     boolean;
  shareEnabled:      boolean;
  stickersOnItem:    StickersOnItem[];
  isAd:              boolean;
  collected:         boolean;
}

export type Author = {
  id:              string;
  uniqueId:        string;
  nickname:        string;
  avatarThumb:     string;
  avatarMedium:    string;
  avatarLarger:    string;
  signature:       string;
  verified:        boolean;
  secUid:          string;
  secret:          boolean;
  ftc:             boolean;
  relation:        number;
  openFavorite:    boolean;
  commentSetting:  number;
  duetSetting:     number;
  stitchSetting:   number;
  privateAccount:  boolean;
  downloadSetting: number;
}

export type AuthorStats = {
  followingCount: number;
  followerCount:  number;
  heartCount:     number;
  videoCount:     number;
  diggCount:      number;
  heart:          number;
}

export type Challenge = {
  id:            string;
  title:         string;
  desc:          string;
  profileThumb:  string;
  profileMedium: string;
  profileLarger: string;
  coverThumb:    string;
  coverMedium:   string;
  coverLarger:   string;
  isCommerce:    boolean;
}

export type DuetInfo = {
  duetFromId: string;
}

export type Music = {
  id:          string;
  title:       string;
  playUrl:     string;
  coverThumb:  string;
  coverMedium: string;
  coverLarge:  string;
  authorName:  string;
  original:    boolean;
  duration:    number;
  album:       string;
}

export type Stats = {
  diggCount:    number;
  shareCount:   number;
  commentCount: number;
  playCount:    number;
  collectCount: number;
}

export type StickersOnItem = {
  stickerType: number;
  stickerText: string[];
}

export type TextExtra = {
  awemeId:      string;
  start:        number;
  end:          number;
  hashtagName:  string;
  hashtagId:    string;
  type:         number;
  userId:       string;
  isCommerce:   boolean;
  userUniqueId: string;
  secUid:       string;
  subType:      number;
}

export type Video = {
  id:            string;
  height:        number;
  width:         number;
  duration:      number;
  ratio:         string;
  cover:         string;
  originCover:   string;
  dynamicCover:  string;
  playAddr:      string;
  downloadAddr:  string;
  shareCover:    string[];
  reflowCover:   string;
  bitrate:       number;
  encodedType:   string;
  format:        string;
  videoQuality:  string;
  encodeUserTag: string;
}