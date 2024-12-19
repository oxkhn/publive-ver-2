import { ProductType } from "./product.type"

export type AffiliateType = {
    campaignId: string
    affiliateId: string
    affiliateName: string
    affiliateUsername: number
    sales: number
    itemSold: number
    orders: number
    clicks: number
    commission: number
    ROI: number
    totalBuyers: number
    newBuyers: number
    fbLink: string
    tiktokLink: string
    shopeeLink: string
    youtubeLink: string
    igLink: string
}

export type AffiliateManagementType = {
    product: ProductType,
    count: number,
}
