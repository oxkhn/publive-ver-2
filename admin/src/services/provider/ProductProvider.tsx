'use client'
import { ChildrenType } from '@/@core/types'
import { createContext, useContext, useEffect, useState } from 'react'
import { usePostProductViaCsv } from '../api/product/usePostProductViaCsv'
import { toast } from 'react-toastify'
import { ProductType } from '@/types/product.type'
import { useGetAllProduct } from '../api/product/useGetAllProduct'
import { usePostProductStock } from '../api/product/usePostProductStock'
import { useGetCategories } from '../api/product/useGetCategories'

export enum ProductListEnum {
    TOP_COMMISSION = 1,
    HOT_DEAL = 2,
    TOP_SELL = 3
}

// Define the types for the data structure
export interface BrandCategory {
    cat: string
    brands: string[]
}

export interface BU {
    bu: string
    categories: BrandCategory[]
}

type ProductListType = ProductListEnum.HOT_DEAL | ProductListEnum.TOP_COMMISSION | ProductListEnum.TOP_SELL

type ProductContextProps = {
    products: ProductType[]
    listType: ProductListEnum
    setListType: any
    categories: any
    getProductFilter: (body: any) => void
    createProductViaCsv: (file: File, type: ProductListType) => void
    updateStock: (file: File) => void
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined)

type Props = ChildrenType & {}

export const ProductProvider = (props: Props) => {
    //state
    const [products, setProducts] = useState<ProductType[]>([])
    const [listType, setListType] = useState<ProductListEnum>(ProductListEnum.TOP_COMMISSION)
    const [categories, setCategories] = useState<BU[]>([])

    const _getCategories = useGetCategories()
    const getCategories = async () => {
        try {
            const res = await _getCategories.mutateAsync()
            setCategories(res.data)
        } catch (error) {}
    }

    const _getAllProduct = useGetAllProduct()
    const getAllProduct = async () => {
        const body = {
            filterType: listType
        }
        await _getAllProduct.mutateAsync(body).then(res => {
            setProducts(res.data)
        })
    }

    const _postProductCsv = usePostProductViaCsv()
    const createProductViaCsv = async (file: File, type: ProductListType) => {
        const form = new FormData()
        form.append('file', file)
        form.append('productType', type.toString())

        await _postProductCsv
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

    const _postProductStock = usePostProductStock()
    const updateStock = async (file: File) => {
        const form = new FormData()
        form.append('file', file)

        await _postProductStock
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

    const getProductFilter = async (body: any) => {
        body['filterType'] = listType
        await _getAllProduct.mutateAsync(body).then(res => {
            setProducts(res.data)
        })
    }

    useEffect(() => {
        getCategories()
    }, [])

    useEffect(() => {
        getAllProduct()
    }, [listType])

    const value = { products, listType, categories, createProductViaCsv, updateStock, setListType, getProductFilter }

    return <ProductContext.Provider value={value}>{props.children}</ProductContext.Provider>
}

export const useProductContext = () => {
    const context = useContext(ProductContext)
    if (context === undefined) {
        throw new Error('useProductContext must be used within a ProductContext')
    }
    return context
}
