'use client'
import { ChildrenType } from '@/@core/types'
import { createContext, useContext, useEffect, useState } from 'react'
import { usePostProductViaCsv } from '../api/product/usePostProductViaCsv'
import { toast } from 'react-toastify'
import { ProductType } from '@/types/product.type'
import { useGetAllProduct } from '../api/product/useGetAllProduct'
import { usePostProductStock } from '../api/product/usePostProductStock'
import { useGetCategories } from '../api/product/useGetCategories'
import { useGetDetailProduct } from '../api/product/useGetDetailProduct'
import { usePostProductDetail } from '../api/product/usePostProductDetail'

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
    product: ProductType | undefined
    listType: ProductListEnum
    setListType: any
    categories: any
    getDetail: (sku: string) => void
    getProductFilter: (body: any) => void
    createProductViaCsv: (file: File, type: ProductListType) => void
    updateStock: (file: File) => void
    handleInput: (field: keyof ProductType, value: any) => void
    createOrUpdateProduct: () => void
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined)

type Props = ChildrenType & {}

export const ProductProvider = (props: Props) => {
    //state
    const [products, setProducts] = useState<ProductType[]>([])
    const [product, setProduct] = useState<ProductType | undefined>(undefined)
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

    const getDetail = async (sku: string) => {
        try {
            const body = {
                sku: sku
            }

            const res = await _getAllProduct.mutateAsync(body)
            if (res.data && res.data.length) {
                setProduct(res.data[0])
            }
        } catch (error) {}
    }

    useEffect(() => {
        getCategories()
    }, [])

    const handleInput = (field: keyof ProductType, value: any) => {
        setProduct(prev => ({ ...prev, [field]: value }) as ProductType)
    }

    const _createOrUpdate = usePostProductDetail()
    const createOrUpdateProduct = async () => {
        try {
            await _createOrUpdate.mutateAsync(product)
            toast.success(`Product updated successfully!`)
        } catch (error) {
            toast.error('Upload product fail.')
        }
    }

    useEffect(() => {
        getAllProduct()
    }, [listType])

    const value = {
        products,
        product,
        listType,
        categories,
        createProductViaCsv,
        updateStock,
        setListType,
        getProductFilter,
        getDetail,
        handleInput,
        createOrUpdateProduct
    }

    return <ProductContext.Provider value={value}>{props.children}</ProductContext.Provider>
}

export const useProductContext = () => {
    const context = useContext(ProductContext)
    if (context === undefined) {
        throw new Error('useProductContext must be used within a ProductContext')
    }
    return context
}
