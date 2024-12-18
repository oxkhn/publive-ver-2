'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { usePostFootage } from '../api/footage/usePostFootage'
import { useGetCategories } from '../api/product/useGetCategories'
import { BU } from './ProductProvider'
import { FootageType, FootageTypeWithId } from '@/types/footage.type'
import { useGetAllFootage } from '../api/footage/useGetAllFootage'

type BrandFootageContextType = {
    categories: BU[]
    footages: FootageTypeWithId[]
    footageDetail: FootageTypeWithId | undefined
    handleInputChange: (e: any, name: keyof FootageTypeWithId, callback?: () => void) => void
    createOrUpdateFootage: (bannerFile: File) => Promise<void>
    getAll: () => Promise<void>
}

const BrandFootageContext = createContext<BrandFootageContextType | undefined>(undefined)

interface Props {
    children: React.ReactNode
}

export const BrandFootageProvider: React.FC<Props> = props => {
    const { children } = props
    const [categories, setCategories] = useState<BU[]>([])
    const [footages, setFootages] = useState<FootageTypeWithId[]>([])
    const [footageDetail, setFootageDetail] = useState<FootageTypeWithId>({
        brand: '',
        bu: '',
        cat: '',
        description: '',
        fileUrl: '',
        likes: 0,
        status: 'pending',
        tags: '',
        thumbnailUrl: '',
        title: '',
        views: 0
    })

    const _getCategories = useGetCategories()
    const getCategories = async () => {
        try {
            const res = await _getCategories.mutateAsync()
            setCategories(res.data)
        } catch (error) {}
    }

    const _postFootage = usePostFootage()
    const createOrUpdateFootage = async (bannerFile: any) => {
        try {
            const formData = new FormData()
            if (bannerFile) formData.append('file', bannerFile)

            Object.entries(footageDetail).forEach(([key, value]) => {
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

            const res = await _postFootage.mutateAsync(formData)
        } catch (error) {}
    }

    const _getAll = useGetAllFootage()
    const getAll = async () => {
        try {
            const res = await _getAll.mutateAsync()
            setFootages(res.data)
        } catch (error) {}
    }

    const handleInputChange = (
        value: any,
        name: keyof FootageTypeWithId,
        callback?: (updatedData: FootageTypeWithId) => void
    ) => {
        setFootageDetail(prevData => {
            const updatedData = {
                ...prevData,
                [name]: value
            }

            return updatedData
        })

        const updatedData = {
            ...footageDetail,
            [name]: value
        }

        if (callback) {
            callback(updatedData)
        }
    }

    useEffect(() => {
        getCategories()
        getAll()
    }, [])

    const value = { categories, footageDetail, footages, handleInputChange, createOrUpdateFootage, getAll }

    return <BrandFootageContext.Provider value={value}>{children}</BrandFootageContext.Provider>
}

export const useBrandFootageContext = () => {
    const context = useContext(BrandFootageContext)
    if (context === undefined) {
        throw new Error('useBrandFootageContext must be used within a BrandFootageContext')
    }
    return context
}
