export type CampaignType = {
    name: string
    brandName: string
    description: string
    startDate: Date
    endDate: Date
    status: string
    productSKUs?: ProductCampaign[]
    banner?: string
    registerLink: string
    registerStartDate: Date
    registerEndDate: Date
    type: number
    tags: string
    bu: string
    cat: string
    brand: string
}

export type ProductCampaign = {
    sku: string
    hc: number
    coms: number
}

export type CampaignTypeWithId = CampaignType & { _id: string }
