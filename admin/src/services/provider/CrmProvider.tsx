'use client'

import { ChildrenType } from '@/@core/types'
import { ICRMDataWithId } from '@/types/crmData.type'
import { createContext, useContext, useEffect, useState } from 'react'
import { useGetCRM } from '../api/crm/useGetCRM'

export type CrmContextProps = {
    affiliates: ICRMDataWithId[]
}

export const CrmContext = createContext<CrmContextProps | undefined>(undefined)

type Props = ChildrenType & {}

export const CrmProvider = (props: Props) => {
    const [affiliates, setAffiliates] = useState<ICRMDataWithId[]>([])
    const [affiliateDetail, setAffiliateDetail] = useState<ICRMDataWithId>()

    const _getAllAffiliate = useGetCRM()
    const handleGetData = async () => {
        try {
            const res = await _getAllAffiliate.mutateAsync()
            setAffiliates(res.data)
        } catch (error) {}
    }

    useEffect(() => {
        handleGetData()
    }, [])

    const value = { affiliates }

    return <CrmContext.Provider value={value}>{props.children}</CrmContext.Provider>
}

export const useCrmContext = () => {
    const context = useContext(CrmContext)
    if (context === undefined) {
        throw new Error('useCrmContext must be used within a CrmContext')
    }
    return context
}
