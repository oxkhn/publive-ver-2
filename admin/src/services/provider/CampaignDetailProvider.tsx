'use client'
import { ChildrenType } from '@/@core/types'
import { CampaignType, CampaignTypeWithId, ProductCampaign } from '@/types/campaign.type'
import { ProductType } from '@/types/product.type'
import { isValidURL } from '@/utils/string'
import { addDays } from 'date-fns'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { BU } from './ProductProvider'
import { useGetCategories } from '../api/product/useGetCategories'
import useGetProductOfCampaign from '../api/campaign/useGetProductOfCampaign copy'
import { usePostCreateCampaign } from '../api/campaign/usePostCreateCampaign'
import { usePostProductOfCampaign } from '../api/campaign/usePostProductOfCampaign'

type CampaignDetailContextProps = {
    campaignData: CampaignTypeWithId
    setupStep: number
    products: ProductType[]
    categories: any
    nextStep: () => void
    prevStep: () => void
    setBannerFile: any
    onSubmit: (updatedData?: CampaignTypeWithId) => Promise<void>
    handleInputChange: (e: any, name: keyof CampaignTypeWithId, callback?: () => void) => void
    initCampaign: (campaign: CampaignTypeWithId) => void
    handleEditProductCampaign: (productCampaign: ProductCampaign) => Promise<ProductCampaign>
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
    const [categories, setCategories] = useState<BU[]>([])

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
        tags: '',
        productSKUs: [] as any,
        type: 1,
        _id: '',
        bu: '',
        cat: '',
        brand: ''
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
                value.forEach((item: any, index) => {
                    formData.append(`${key}[${index}]`, typeof item === 'object' ? JSON.stringify(item) : item)
                })
            } else if (typeof value === 'object') {
                // Convert object to JSON string
                formData.append(key, JSON.stringify(value))
            } else {
                formData.append(key, value as string | Blob)
            }
        })

        await _postCreateCampaign.mutateAsync(formData)
        setSetupStep(1)
    }

    const _getCategories = useGetCategories()
    const getCategories = async () => {
        try {
            const res = await _getCategories.mutateAsync()
            setCategories(res.data)
        } catch (error) {}
    }

    const _postProductCampaign = usePostProductOfCampaign()
    const handleEditProductCampaign = async (productCampaign: ProductCampaign) => {
        try {
            const body = {
                data: productCampaign,
                id: campaignData._id
            }

            const res = await _postProductCampaign.mutateAsync(body)
            return res.data
        } catch (error) {}
    }

    useEffect(() => {
        getCategories()
    }, [])

    const value = {
        campaignData,
        setupStep,
        products,
        categories,
        nextStep,
        prevStep,
        handleInputChange,
        setBannerFile,
        onSubmit,
        initCampaign,
        handleEditProductCampaign
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
