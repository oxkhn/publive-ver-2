'use client'

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    MenuItem,
    SelectChangeEvent,
    Slider,
    Typography
} from '@mui/material'
import DialogUploadCSV from './DialogUploadCSV'
import { useState } from 'react'
import { useModal } from '@/hooks/useModal'
import CustomTextField from '@/@core/components/mui/TextField'
import { BrandCategory, BU, useProductContext } from '@/services/provider/ProductProvider'

type Props = {
    open: boolean
    handleClose: any
}

const DialogFilter = (props: Props) => {
    const { open, handleClose } = props
    const { categories: categoriesData, getProductFilter } = useProductContext()

    const [selectedBU, setSelectedBU] = useState<string>('')
    const [selectedCategory, setSelectedCategory] = useState<string>('')
    const [selectedBrand, setSelectedBrand] = useState<string>('')
    const [publiser, setPubliser] = useState('')
    const [commission, setCommission] = useState(20)
    const [name, setName] = useState('')
    const [sku, setSku] = useState('')

    // Get categories based on selected BU
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

    const handleReset = () => {
        setCommission(20)
        setName('')
        setSelectedBU('')
        setSelectedBrand('')
        setSelectedCategory('')
        setPubliser('')
        setSku('')
    }

    return (
        <>
            <Dialog open={open} fullWidth>
                <DialogTitle className='flex flex-col'>
                    <IconButton className='ml-auto' color='secondary' onClick={handleClose}>
                        <i className='tabler-x' />
                    </IconButton>
                    <div className='flex mt-2 justify-between items-center'>
                        <p className='font-semibold'>Property Filter</p>
                        <Button color='primary' variant='text' onClick={handleReset}>
                            Reset all
                        </Button>
                    </div>
                </DialogTitle>

                <DialogContent>
                    <Grid container spacing={6}>
                        <Grid item sm={12}>
                            <CustomTextField fullWidth label='SKU' value={sku} onChange={e => setSku(e.target.value)} />
                        </Grid>
                        <Grid item sm={12}>
                            <CustomTextField
                                fullWidth
                                label='Product Name'
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <CustomTextField
                                select
                                fullWidth
                                label='Ngành hàng'
                                id='custom-select-category'
                                value={selectedBU}
                                onChange={handleBUChange}
                            >
                                <MenuItem value='all'>All Categories</MenuItem>
                                {categoriesData.map((bu: BU) => (
                                    <MenuItem key={bu.bu} value={bu.bu}>
                                        {bu.bu}
                                    </MenuItem>
                                ))}
                            </CustomTextField>
                        </Grid>
                        <Grid item sm={4}>
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
                                {categories.map(cat => (
                                    <MenuItem key={cat.cat} value={cat.cat}>
                                        {cat.cat}
                                    </MenuItem>
                                ))}
                            </CustomTextField>
                        </Grid>
                        <Grid item sm={4}>
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
                                {brands.map(brand => (
                                    <MenuItem key={brand} value={brand}>
                                        {brand}
                                    </MenuItem>
                                ))}{' '}
                            </CustomTextField>
                        </Grid>
                        <Grid item sm={12} className='flex flex-col gap-2'>
                            <Typography className='font-medium text-sm'>Commission</Typography>
                            <Slider
                                value={commission}
                                onChange={(event, newValue) => setCommission(newValue as number)}
                                marks
                                min={0}
                                max={40}
                                step={1}
                                valueLabelDisplay='on'
                                aria-labelledby='label-always-visible-slider'
                            />
                        </Grid>

                        <Grid item sm={6}>
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
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={() => {
                            handleClose()
                            handleGetProductFilter()
                        }}
                    >
                        Apply fillter
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DialogFilter
