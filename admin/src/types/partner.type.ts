export type PartnerType = {
    name: string
    email: string
    campaignId: string
}

export type PartnerTypeWithId = PartnerType & { _id: string }
