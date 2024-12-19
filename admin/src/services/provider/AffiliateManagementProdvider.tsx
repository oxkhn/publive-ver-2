'use client'
import { ChildrenType } from '@/@core/types'
import { createContext, useContext, useEffect, useState } from 'react'
import { useGetTrackingProducts } from '../api/product/useGetTrackingProduct'
import { AffiliateManagementType } from '@/types/affiliate.type'

type AffiliateContextProps = {
    trackingProducts: AffiliateManagementType[]
}

const AffiliateContext = createContext<AffiliateContextProps | undefined>(undefined)

type Props = ChildrenType & {}

export const AffiliateProvider = (props: Props) => {
    const [trackingProducts, setTrackingProducts] = useState<AffiliateManagementType[]>([])

    const _getTrackingProducts = useGetTrackingProducts()
    const getTrackingProducts = async () => {
        const res = await _getTrackingProducts.mutateAsync()
        setTrackingProducts(res.data)
    }

    useEffect(() => {
        getTrackingProducts()
    }, [])

    const value = {
        trackingProducts
    }

    return <AffiliateContext.Provider value={value}>{props.children}</AffiliateContext.Provider>
}

export const useAffiliateManagementContext = () => {
    const context = useContext(AffiliateContext)
    if (context === undefined) {
        throw new Error('useAffiliateContext must be used within a AffiliateProvider')
    }
    return context
}
