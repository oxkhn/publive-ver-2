import { ProductType } from './product.type'

export enum StatusForm {
    Pending = 'Pending',
    Confirmed = 'Confirmed',
    Processing = 'Processing',
    Shipped = 'Shipped',
    Delivered = 'Delivered',
    Failed = 'Failed',
    Cancelled = 'Cancelled',
    Returned = 'Returned'
}

export type FormRegisterAffiliateType = {
    name: string
    phone: string
    email: string
    shopeeAffiliateAccount: string
    facebookLink: string
    instargramLink: string
    threadsLink: string
    tiktokLink: string
    youtubeLink: string
    websiteLink: string
    shopeeLiveLink: string
    shopeeVideoLink: string
    address: string
    receivePhoneNumber: string
    receiveName: string
    productSKUs: string[]
    status: StatusForm
    shippingMethod: string
    trackingNumber: string
    estimatedDeliveryTime: Date
    shippingCarrier: string
    userId: any
}

export type FormRegisterAffiliateTypeWithId = FormRegisterAffiliateType & { _id: string }
export type FormRegisterAffiliateTypeWithProduct = FormRegisterAffiliateType & { _id: string; products: ProductType[] }
