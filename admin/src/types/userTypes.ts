// Type Imports
import type { ThemeColor } from '@core/types'

export type UsersType = {
  id: number
  role: string
  email: string
  status: string
  avatar: string
  company: string
  country: string
  contact: string
  fullName: string
  name: string
  currentPlan: string
  avatarColor?: ThemeColor
  billing: string,
  phoneNumber: string,
  address: string,
  lastActive: string,
  social: SocialList;
  affiliateLinkCopied: number,
}

export type KOCAnalysType = {
  productCount: number,
  name: string,
  phoneNumber: string,
  email: string,
}

export type SocialList = {
  facebook: Social,
  tiktok: Social,
  youtube:Social,
  instagram: Social,
  other: Social,
  shopee:Social,
  shopeeUsername: Social,
}

export type Social = {
  linkUrl: string,
  verify: boolean,
  accessToken: string,
}
