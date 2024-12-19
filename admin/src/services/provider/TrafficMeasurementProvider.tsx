'use client'

import { ChildrenType } from '@/@core/types'
import { createContext, useContext, useEffect, useState } from 'react'
import { useGetPageTraffic } from '../api/traffic/useGetPageTraffic'
import { PageTrafficType } from '@/types/pages/PageTrafficType'

type TraffictMeasurementContextProps = {
    pageTraffics: PageTrafficType[]
}

const TraffictMeasurementContext = createContext<TraffictMeasurementContextProps | undefined>(undefined)

type Props = ChildrenType & {}

export const TraffictMeasurementProvider = (props: Props) => {
    const [pageTraffics, setPageTraffics] = useState<PageTrafficType[]>([])

    const _getPageTraffics = useGetPageTraffic()

    const getPageTraffics = async () => {
        const res = await _getPageTraffics.mutateAsync()
        setPageTraffics(res.data)
    }

    useEffect(() => {
        getPageTraffics()
    }, [])

    const value = {
        pageTraffics
    }

    return <TraffictMeasurementContext.Provider value={value}>{props.children}</TraffictMeasurementContext.Provider>
}

export const useTraffictMeasurementContext = () => {
    const context = useContext(TraffictMeasurementContext)
    if (context === undefined) {
        throw new Error('useTraffictMeasurementContext must be used within a TraffictMeasurementProvider')
    }
    return context
}
