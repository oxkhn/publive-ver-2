'use client'

import { ChildrenType } from '@/@core/types'

import { createContext, use, useContext, useEffect, useState } from 'react'
import { useGetSampleProductAnalys } from '../api/sampleProduct/useGetSampleProductAnalys'
import { SampleProductAnalysType } from '@/types/product.type'
import { useGetKOCAnalys } from '../api/sampleProduct/useGetKOCAnalys'
import { KOCAnalysType } from '@/types/userTypes'

type SampleProductContextProps = {
    sampleProductAnalys: SampleProductAnalysType[]
    kocAnalys: KOCAnalysType[]
}

const SampleProductContext = createContext<SampleProductContextProps | undefined>(undefined)

type Props = ChildrenType & {}

export const SampleProductProvider = (props: Props) => {
    const [sampleProductAnalys, setSampleProducAnalys] = useState<SampleProductAnalysType[]>([])
    const [kocAnalys, setKocAnalys] = useState<KOCAnalysType[]>([])
    const _getSampleProductAnalys = useGetSampleProductAnalys()
    const _getKOCAnalys = useGetKOCAnalys()

    const getSampleProductAnalys = async () => {
        const res = await _getSampleProductAnalys.mutateAsync()
        setSampleProducAnalys(res.data)
    }

    const getKOCAnalys = async () => {
        const res = await _getKOCAnalys.mutateAsync()
        console.log(res.data)
        setKocAnalys(res.data)
    }

    useEffect(() => {
        getSampleProductAnalys()
        getKOCAnalys()
    }, [])

    const value = {
        sampleProductAnalys,
        kocAnalys
    }

    return <SampleProductContext.Provider value={value}>{props.children}</SampleProductContext.Provider>
}

export const useSampleProductContext = () => {
    const context = useContext(SampleProductContext)
    if (context === undefined) {
        throw new Error('useSampleProductContext must be used within a SampleProductProvider')
    }
    return context
}
