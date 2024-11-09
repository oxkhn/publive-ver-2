'use client'
import { ChildrenType } from '@/@core/types'
import { createContext, useContext, useEffect, useState } from 'react'
import { useGetAllCampaign } from '../api/campaign/useGetAllCampaign'
import { CampaignTypeWithId, ProductCampaign } from '@/types/campaign.type'
import { useDeleteCampaign } from '../api/campaign/useDeleteCampaign'

type CampaignContextProps = {
    campaigns: CampaignTypeWithId[]
    onReload: () => void
    deleteCampaignById: (id: string) => Promise<void>
    handleFilterChange: (value: any, name: keyof CampaignTypeWithId) => void
}

const CampaignContext = createContext<CampaignContextProps | undefined>(undefined)

type Props = ChildrenType & {}
const CampaignProvider = (props: Props) => {
    const [campaigns, setCampaigns] = useState<CampaignTypeWithId[]>([])
    const [filterValue, setFilterValue] = useState({
        name: '',
        type: 0,
        bu: '',
        cat: ''
    })

    const handleFilterChange = (value: any, name: keyof CampaignTypeWithId) => {
        setFilterValue(prevData => {
            const updatedData = {
                ...prevData,
                [name]: value
            }

            return updatedData
        })
    }

    const _getALlCampaign = useGetAllCampaign()
    const getAllCampaign = async () => {
        try {
            const body = {
                name: filterValue.name,
                type: filterValue.type
            }
            const res = await _getALlCampaign.mutateAsync(body)
            setCampaigns(res.data)
        } catch (error) {}
    }

    const _deleteCampaign = useDeleteCampaign()
    const deleteCampaignById = async (id: string): Promise<void> => {
        try {
            await _deleteCampaign.mutateAsync(id)
            return
        } catch (error) {}
    }

    useEffect(() => {
        getAllCampaign()
    }, [filterValue])

    const onReload = () => {
        getAllCampaign()
    }

    const value: CampaignContextProps = { campaigns, onReload, deleteCampaignById, handleFilterChange }

    return <CampaignContext.Provider value={value}>{props.children}</CampaignContext.Provider>
}

export default CampaignProvider

export const useCampaignContext = () => {
    const context = useContext(CampaignContext)
    if (context === undefined) {
        throw new Error('useCampaignContext must be used within a CampaignContext')
    }
    return context
}
