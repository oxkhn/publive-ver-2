'use client'

import { Button, Card, CardContent, Divider, MenuItem } from '@mui/material'
import DialogSelectAddOption from './DialogSelectAddOption'
import { useModal } from '@/hooks/useModal'
import DialogFilter from './DialogFilter'
import { BrandCategory, BU, useProductContext } from '@/services/provider/ProductProvider'
import CustomTextField from '@/@core/components/mui/TextField'
import { useEffect, useState } from 'react'

const Action = () => {
    // hooks
    const { isOpenModal, closeModal, openModal: openAddProduct } = useModal()
    const { isOpenModal: isOpenFilter, closeModal: closeFilter, openModal: openFilter } = useModal()

    const { categories: categoriesData, getProductFilter, products } = useProductContext()

    const [selectedBU, setSelectedBU] = useState<string>('')
    const [selectedCategory, setSelectedCategory] = useState<string>('')
    const [selectedBrand, setSelectedBrand] = useState<string>('')
    const [publiser, setPubliser] = useState('')
    const [name, setName] = useState('')
    const [sku, setSku] = useState('')

    const categories: BrandCategory[] = selectedBU
        ? categoriesData.find((bu: BU) => bu.bu === selectedBU)?.categories || []
        : []

    // Get brands based on selected Category
    const brands: string[] = selectedCategory ? categories.find(cat => cat.cat === selectedCategory)?.brands || [] : []

    // Handle BU change
    const handleBUChange = (event: any) => {
        setSelectedBU(event.target.value as string)
        setSelectedCategory('') // Reset category when BU changes
        setSelectedBrand('') // Reset brand when BU changes
    }

    // Handle Category change
    const handleCategoryChange = (event: any) => {
        setSelectedCategory(event.target.value as string)
        setSelectedBrand('') // Reset brand when category changes
    }

    // Handle Brand change
    const handleBrandChange = (event: any) => {
        setSelectedBrand(event.target.value as string)
    }

    const handleGetProductFilter = () => {
        const body = {
            name,
            sku,
            bu: selectedBU,
            cat: selectedCategory,
            brand: selectedBrand,
            publiser
        }

        getProductFilter(body)
    }

    useEffect(() => {
        handleGetProductFilter()
    }, [sku, selectedBU, selectedCategory, selectedBrand, publiser])

    return (
        <Card>
            <DialogFilter open={isOpenFilter} handleClose={closeFilter} />
            <DialogSelectAddOption open={isOpenModal} handleClose={closeModal} />
            <CardContent className='flex justify-between'>
                <div className='flex items-center gap-4'>
                    <Button variant='outlined' color='primary' onClick={openFilter}>
                        Filter
                    </Button>
                    <p className='text-sm text-nowrap'>
                        Total product: <span className='text-primary font-semibold'>{products.length}</span>
                    </p>

                    <Divider orientation='vertical' className='mx-4' />
                    <div className='flex gap-2 w-[800px]'>
                        <CustomTextField
                            className='ml-4'
                            label='SKU ID'
                            fullWidth
                            value={sku}
                            onChange={e => setSku(e.target.value)}
                        />
                        <CustomTextField
                            select
                            fullWidth
                            label='Ngành hàng'
                            id='custom-select-category'
                            value={selectedBU}
                            onChange={handleBUChange}
                        >
                            <MenuItem value=''>All Categories</MenuItem>
                            {categoriesData?.map((bu: BU) => (
                                <MenuItem key={bu.bu} value={bu.bu}>
                                    {bu.bu}
                                </MenuItem>
                            ))}
                        </CustomTextField>

                        <CustomTextField
                            select
                            fullWidth
                            label='Category'
                            id='custom-select-category'
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            disabled={!selectedBU}
                        >
                            <MenuItem value=''>Select Category</MenuItem>
                            {categories?.map(cat => (
                                <MenuItem key={cat.cat} value={cat.cat}>
                                    {cat.cat}
                                </MenuItem>
                            ))}
                        </CustomTextField>

                        <CustomTextField
                            select
                            fullWidth
                            // value={filterBu}
                            label='Brand'
                            id='custom-select-category'
                            value={selectedBrand}
                            onChange={handleBrandChange}
                            disabled={!selectedCategory}
                        >
                            <MenuItem value=''>Select Brand</MenuItem>
                            {brands?.map(brand => (
                                <MenuItem key={brand} value={brand}>
                                    {brand}
                                </MenuItem>
                            ))}{' '}
                        </CustomTextField>

                        <CustomTextField
                            value={publiser}
                            select
                            fullWidth
                            label='Nền tảng'
                            id='custom-select-category'
                            onChange={e => setPubliser(e.target.value)}
                        >
                            <MenuItem value=''>All</MenuItem>
                            <MenuItem value='SP'>Shopee</MenuItem>
                            <MenuItem value='LZ'>Lazada</MenuItem>
                        </CustomTextField>
                    </div>
                </div>

                <Button
                    variant='contained'
                    color='success'
                    startIcon={<i className='tabler-plus' />}
                    onClick={openAddProduct}
                >
                    Add Product
                </Button>
            </CardContent>
        </Card>
    )
}

export default Action
