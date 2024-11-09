'use client'

import { ChildrenType } from '@/@core/types'
import { ICRMDataWithId } from '@/types/crmData.type'
import { createContext, useContext, useEffect, useState } from 'react'
import { useGetCRM } from '../api/crm/useGetCRM'
import { usePostCRMCsv } from '../api/crm/usePostCRMCsv'
import { toast } from 'react-toastify'

export type CrmContextProps = {
    affiliates: ICRMDataWithId[]
    handleUploadCSV: (file: any) => Promise<any>
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

    const _createViaCsv = usePostCRMCsv()
    const handleUploadCSV = async (file: any) => {
        const form = new FormData()
        form.append('file', file)

        await _createViaCsv
            .mutateAsync(form)
            .then(() => {
                toast.success('Upload file thành công.')
                return true
            })
            .catch(() => {
                toast.error('Upload file thất bại.')
                return false
            })
    }

    useEffect(() => {
        handleGetData()
    }, [])

    const value = { affiliates, handleUploadCSV }

    return <CrmContext.Provider value={value}>{props.children}</CrmContext.Provider>
}

export const useCrmContext = () => {
    const context = useContext(CrmContext)
    if (context === undefined) {
        throw new Error('useCrmContext must be used within a CrmContext')
    }
    return context
}
