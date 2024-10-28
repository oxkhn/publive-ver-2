// crm-data.interface.ts

export type ICRMData = {
    no: number
    affiliateName: string
    userName: string
    retention: string
    kolType: string
    tickCam: boolean
    followers: number
    shopeeVideo: boolean
    shopeeVideoLink: string
    shopeeLS: boolean
    shopeeLSLink: string
    facebook: boolean
    facebookLink: string
    tiktok: boolean
    tiktokLink: string
    instagram: boolean
    instagramLink: string
    youtube: boolean
    youtubeLink: string
    pricePerPost: number
    clicks: number
    itemsSold: number
    orders: number
    gmv: number
    roi: number
    shopeeLive: boolean
    shopeeVideoPlatform: boolean

    // Platform-specific engagement metrics
    facebookEngagement: number
    tiktokEngagement: number
    instagramEngagement: number
    youtubeEngagement: number
    othersEngagement: number

    // Categories and sub-categories
    cat1: string
    cat2: string
    cat3: string
    subCat1: string
    subCat2: string
    subCat3: string
    subCat4: string
    subCat5: string
    brand1: string
    brand2: string
    brand3: string
    brand4: string
    brand5: string

    // Livestream and video engagement metrics
    livestreamSession: number
    livestreamViews: number
    livestreamLikes: number
    livestreamComments: number
    livestreamGPM: number
    videoPostCount: number
    videoViews: number
    videoLikes: number
    videoComments: number
    videoGPM: number

    // Audience demographics
    femaleAudience: number
    maleAudience: number
    ageDistribution: {
        '0-12': number
        '13-17': number
        '18-22': number
        '23-32': number
        '33-42': number
        '43-52': number
        '53+': number
    }
}

export type ICRMDataWithId = ICRMData & { _id: string }
