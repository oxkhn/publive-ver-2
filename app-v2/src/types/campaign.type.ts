import { ProductType } from "./product.type"

export type CampaignType = {
    name: string
    brandName: string
    description: string
    startDate: string
    endDate: string
    status: string
    productSKUs?: string[]
    banner: string
    registerLink: string
    registerStartDate: Date
    registerEndDate: Date
    type: number
    tags: string
    bu: string
    cat: string
    brand: string
    products: ProductType[]
}

export type CampaignTypeWithId = CampaignType & { _id: string }
