import CustomTextField from '@/@core/components/mui/TextField'
import { CustomInput } from '@/components/CustomInput'
import EditorBasic from '@/components/Editer'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import { DialogContent, Grid, MenuItem } from '@mui/material'
import { useCampaignDetailContext } from '../../../../services/provider/CampaignDetailProvider'
import { useEffect, useState } from 'react'
import { BrandCategory, BU } from '@/services/provider/ProductProvider'

const CreateStep1 = () => {
    const { campaignData, handleInputChange, categories: categoriesData } = useCampaignDetailContext()

    const [selectedBU, setSelectedBU] = useState<string>('')
    const [selectedCategory, setSelectedCategory] = useState<string>('')
    const [selectedBrand, setSelectedBrand] = useState<string>('')
    
    const [categories, setCategories] = useState<BrandCategory[]>([])
    const [brands, setBrands] = useState<string[]>([])

    // Handle BU change
    const handleBUChange = (event: any) => {
        handleInputChange(event.target.value as string, 'bu')
        setSelectedBU(event.target.value as string)
        setSelectedCategory('') // Reset category when BU changes
        setSelectedBrand('') // Reset brand when BU changes
        handleInputChange('', 'cat')
        handleInputChange('', 'brand')
    }

    // Handle Category change
    const handleCategoryChange = (event: any) => {
        handleInputChange(event.target.value as string, 'cat')
        setSelectedCategory(event.target.value as string)
        setSelectedBrand('')
        handleInputChange('', 'brand')
    }

    // Handle Brand change
    const handleBrandChange = (event: any) => {
        handleInputChange(event.target.value as string, 'brand')
        setSelectedBrand(event.target.value as string)
    }

    useEffect(() => {
        if (campaignData) {
            setSelectedBU(campaignData?.bu || '')
        }
    }, [categoriesData, campaignData])

    useEffect(() => {
        // Update categories based on selected BU
        const updatedCategories = selectedBU
            ? categoriesData.find((bu: BU) => bu.bu === selectedBU)?.categories || []
            : []

        if (updatedCategories.length > 0) {
            setCategories(updatedCategories)
            setSelectedCategory(campaignData?.cat || '')
        }
    }, [selectedBU, categoriesData])

    useEffect(() => {
        const updatedBrands = selectedCategory ? categories.find(cat => cat.cat === selectedCategory)?.brands || [] : []
        if (updatedBrands.length > 0) {
            setBrands(updatedBrands)
            setSelectedBrand(campaignData?.brand || '')
        }
    }, [selectedCategory, categories])

    return (
        <DialogContent>
            <div className='flex flex-col gap-4'>
                <CustomTextField
                    label='Campaign name'
                    value={campaignData.name}
                    placeholder='Enter the campaign name'
                    onChange={e => {
                        handleInputChange(e.target.value, 'name')
                    }}
                />
                <CustomTextField
                    label='Brand name'
                    value={campaignData.brandName}
                    placeholder='Enter the brand name'
                    onChange={e => {
                        handleInputChange(e.target.value, 'brandName')
                    }}
                />

                <Grid container spacing={4}>
                    <Grid item sm={4}>
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
                    </Grid>
                    <Grid item sm={4}>
                        <CustomTextField
                            select
                            fullWidth
                            label='Category'
                            id='custom-select-category'
                            value={selectedCategory || ''}
                            onChange={handleCategoryChange}
                            disabled={!selectedBU}
                        >
                            <MenuItem value=''>Select Category</MenuItem>
                            {categories &&
                                categories?.map(cat => (
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
                            label='Brand'
                            id='custom-select-category'
                            value={selectedBrand}
                            onChange={handleBrandChange}
                            disabled={!selectedCategory}
                        >
                            <MenuItem value=''>Select Brand</MenuItem>
                            {brands &&
                                brands?.map(brand => (
                                    <MenuItem key={brand} value={brand}>
                                        {brand}
                                    </MenuItem>
                                ))}
                        </CustomTextField>
                    </Grid>
                </Grid>

                <CustomTextField
                    select
                    fullWidth
                    value={campaignData.status}
                    label='Status'
                    id='custom-select-category'
                    onChange={e => {
                        handleInputChange(e.target.value, 'status')
                    }}
                >
                    <MenuItem value='active'>Active</MenuItem>
                    <MenuItem value='inactive'>Inactive</MenuItem>
                    <MenuItem value='completed'>Completed</MenuItem>
                </CustomTextField>

                <AppReactDatepicker
                    selectsRange
                    startDate={campaignData.startDate}
                    endDate={campaignData.endDate}
                    onChange={(dates: any) => {
                        const [start, end] = dates
                        handleInputChange(end, 'endDate')
                        handleInputChange(start, 'startDate')
                    }}
                    shouldCloseOnSelect={false}
                    customInput={
                        <CustomInput
                            label='Campaign Dates'
                            start={campaignData.startDate as Date | number}
                            end={campaignData.endDate as Date | number}
                        />
                    }
                />

                <EditorBasic
                    label=''
                    placeholder=''
                    content={campaignData.description}
                    onContentChange={e => {
                        handleInputChange(e, 'description')
                    }}
                />
            </div>
        </DialogContent>
    )
}

export default CreateStep1
