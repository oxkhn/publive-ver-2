'use client'
import { ChildrenType } from '@/@core/types'
import useGetProductOfCampaign from '@/services/api/campaign/useGetProductOfCampaign'
import { usePostCreateCampaign } from '@/services/api/campaign/usePostCreateCampaign'
import { CampaignType, CampaignTypeWithId } from '@/types/campaign.type'
import { ProductType } from '@/types/product.type'
import { isValidURL } from '@/utils/string'
import { addDays } from 'date-fns'
import { createContext, useContext, useState } from 'react'
import { toast } from 'react-toastify'

type CampaignDetailContextProps = {
    campaignData: CampaignTypeWithId
    setupStep: number
    products: ProductType[]
    nextStep: () => void
    prevStep: () => void
    setBannerFile: any
    onSubmit: (updatedData?: CampaignTypeWithId) => Promise<void>
    handleInputChange: (e: any, name: keyof CampaignTypeWithId, callback?: () => void) => void
    initCampaign: (campaign: CampaignTypeWithId) => void
}

export const CampaignDetailContext = createContext<CampaignDetailContextProps | undefined>(undefined)

type Props = ChildrenType & {}

const getDateBeforeDays = (days: number): Date => {
    const date = new Date()
    date.setDate(date.getDate() - days)
    return date
}

export const CampaignDetailProvider = (props: Props) => {
    const [setupStep, setSetupStep] = useState(1)
    const [bannerFile, setBannerFile] = useState<File | undefined>(undefined)
    const [campaignData, setCampaignData] = useState<CampaignTypeWithId>({
        name: '',
        description: '',
        brandName: '',
        startDate: getDateBeforeDays(30),
        endDate: addDays(new Date(), 30),
        registerLink: '',
        registerStartDate: getDateBeforeDays(30),
        registerEndDate: addDays(new Date(), 1000),
        status: 'active',
        tags: [],
        productSKUs: [],
        type: 1,
        _id: ''
    })
    const [products, setProducts] = useState<ProductType[]>([])

    const initCampaign = (campaign: CampaignTypeWithId) => {
        setCampaignData(campaign)

        if (!campaign || campaign._id == '') return
        getProducts(campaign)
    }

    const _getProductOfCampaign = useGetProductOfCampaign()
    const getProducts = async (campaign: CampaignTypeWithId) => {
        try {
            const res = await _getProductOfCampaign.mutateAsync(campaign._id)

            setProducts(res.data)
        } catch (error) {}
    }

    const handleInputChange = (
        value: any,
        name: keyof CampaignTypeWithId,
        callback?: (updatedData: CampaignTypeWithId) => void
    ) => {
        setCampaignData(prevData => {
            const updatedData = {
                ...prevData,
                [name]: value
            }

            return updatedData
        })

        const updatedData = {
            ...campaignData,
            [name]: value
        }

        if (callback) {
            callback(updatedData)
        }
    }

    const nextStep = () => {
        if (setupStep < 2) setSetupStep(prev => prev + 1)
    }

    const prevStep = () => {
        if (setupStep > 1) setSetupStep(prev => prev - 1)
    }

    const checkValidFormData = () => {
        const { name, description, brandName, startDate, endDate, registerLink, registerStartDate, registerEndDate } =
            campaignData

        const isStringValid = (value: string) => {
            return value && value.trim().length > 0
        }

        if (!isStringValid(name)) {
            toast.error('Name is required')
            return false
        }

        if (!isStringValid(description)) {
            toast.error('Description is required')
            return false
        }

        if (!isStringValid(brandName)) {
            toast.error('Brand name is required')
            return false
        }

        if (startDate >= endDate) {
            toast.error('Start date must be before the end date')
            return false
        }

        if (registerStartDate >= registerEndDate) {
            toast.error('Registration start date must be before registration end date')
            return false
        }

        if (!isStringValid(registerLink)) {
            toast.error('Registration link is required')
            return false
        }

        if (!isValidURL(registerLink)) {
            toast.error('Registration link is not a valid URL')
            return false
        }

        return true
    }

    const _postCreateCampaign = usePostCreateCampaign()
    const onSubmit = async (updatedData?: CampaignTypeWithId): Promise<void> => {
        if (!checkValidFormData()) {
            throw new Error()
        }

        const campaign = updatedData ? updatedData : campaignData

        const formData = new FormData()
        if (bannerFile) formData.append('banner', bannerFile)

        Object.entries(campaign).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    formData.append(`${key}[${index}]`, item)
                })
            } else {
                formData.append(key, value as string | Blob)
            }
        })

        await _postCreateCampaign.mutateAsync(formData)
        setSetupStep(1)
    }

    const value = {
        campaignData,
        setupStep,
        products,
        nextStep,
        prevStep,
        handleInputChange,
        setBannerFile,
        onSubmit,
        initCampaign
    }

    return <CampaignDetailContext.Provider value={value}>{props.children}</CampaignDetailContext.Provider>
}

export const useCampaignDetailContext = () => {
    const context = useContext(CampaignDetailContext)
    if (context === undefined) {
        throw new Error('useCampaignDetailContext must be used within a CampaignDetailContext')
    }
    return context
}
