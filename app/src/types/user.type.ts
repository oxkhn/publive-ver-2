export type UserType = {
  name: string
  email: string
  password: string
  dob: Date
  sex: boolean
  phoneNumber: string
  verify: boolean
  avatar: string
  role: Role
  tag: string
  social: Social
}

export enum Role {
  SUPER = 'SUPER',
  ADMIN = 'ADMIN',
  MOD = 'MOD',
  KOL = 'KOL'
}

export type Social = {
  facebook: SocialLink
  tiktok: SocialLink
  youtube: SocialLink
  other: SocialLink
  shopeeLive: SocialLink
  shopee: SocialLink
  instagram: SocialLink
}

export type SocialLink = {
  linkUrl: string
  verify: boolean
  accessToken: string
}
