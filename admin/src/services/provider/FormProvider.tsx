'use client'
import { ChildrenType } from '@/@core/types'
import { createContext, useContext, useEffect, useState } from 'react'
import { useGetAllFormSample } from '../api/form/useGetAllFormSample'
import { FormRegisterAffiliateType, FormRegisterAffiliateTypeWithId, FormRegisterAffiliateTypeWithProduct } from '@/types/formSample.type'
import { useGetFormDetail } from '../api/form/useGetFormDetail'

type FormSampleContextProps = {
    formSamples: FormRegisterAffiliateTypeWithId[]
    formDetail: FormRegisterAffiliateTypeWithProduct | undefined
    getDetail: (id: string) => void
}

const FormSampleContext = createContext<FormSampleContextProps | undefined>(undefined)

type Props = ChildrenType

export const FormSampleProvider = (props: Props) => {
    const [formSamples, setFormSamples] = useState<FormRegisterAffiliateTypeWithId[]>([])
    const [formDetail, setFormDetail] = useState<FormRegisterAffiliateTypeWithProduct>()

    const _getAllForm = useGetAllFormSample()
    const getAllForm = async () => {
        try {
            const body = {}
            const res = await _getAllForm.mutateAsync(body)
            setFormSamples(res.data)
        } catch (error) {}
    }

    const _getDetail = useGetFormDetail()
    const getDetail = async (id: string) => {
        try {
            const res = await _getDetail.mutateAsync(id)
            setFormDetail(res.data)
            return res.data
        } catch (error) {}
    }

    useEffect(() => {
        getAllForm()
    }, [])

    const value = {
        formSamples,
        formDetail,
        getDetail
    }

    return <FormSampleContext.Provider value={value}>{props.children}</FormSampleContext.Provider>
}

export const useFormSampleContext = (): FormSampleContextProps => {
    const context = useContext(FormSampleContext)
    if (context === undefined) {
        throw new Error('useFormSampleContext must be used within a FormSampleContext')
    }

    return context
}
