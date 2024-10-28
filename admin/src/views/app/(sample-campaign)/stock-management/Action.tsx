'use client'
import { useModal } from '@/hooks/useModal'
import {
    Button,
    Card,
    CardContent,
    FormControlLabel,
    Grid,
    MenuItem,
    Radio,
    RadioGroup,
    Typography
} from '@mui/material'
import CustomTextField from '@/@core/components/mui/TextField'
import { useCampaignEmailContext } from '@/services/provider/CampaignEmailProvider'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import DialogUploadCSV from './DialogUploadCSV'
import { BrandCategory, BU, useProductContext } from '@/services/provider/ProductProvider'

const Action = () => {
    const { openModal, isOpenModal, closeModal } = useModal()

    const { categories: categoriesData, getProductFilter, products } = useProductContext()

    const [selectedBU, setSelectedBU] = useState<string>('')
    const [selectedCategory, setSelectedCategory] = useState<string>('')
    const [selectedBrand, setSelectedBrand] = useState<string>('')
    const [publiser, setPubliser] = useState('')
    const [name, setName] = useState('')
    const [sku, setSku] = useState('')
    const [inStock, setInStock] = useState(true)

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
        <div>
            <DialogUploadCSV open={isOpenModal} handleClose={closeModal} />
            <Card>
                <CardContent className='flex justify-between gap-4'>
                    <div className='flex gap-4 min-w-[500px] items-end'>
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

                        {/* <CustomTextField
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
                        </CustomTextField> */}

                        {/* <CustomTextField
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
                        </CustomTextField> */}

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

                        <RadioGroup row className='flex gap-2'>
                            <FormControlLabel
                                className='text-nowrap'
                                value={inStock}
                                control={<Radio size='medium' />}
                                label='In stock'
                            />
                        </RadioGroup>
                        <RadioGroup row className='flex gap-2'>
                            <FormControlLabel
                                className='text-nowrap'
                                value={inStock}
                                control={<Radio size='medium' />}
                                label='Out of stock'
                            />
                        </RadioGroup>
                    </div>
                    <div className='flex justify-end gap-4'>
                        <Button
                            variant='contained'
                            color='success'
                            startIcon={<i className='tabler-plus' />}
                            onClick={openModal}
                        >
                            Upload Stock
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Action
