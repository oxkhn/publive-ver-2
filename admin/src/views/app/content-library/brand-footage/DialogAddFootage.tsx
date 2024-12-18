'use client'

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    MenuItem,
    Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useModal } from '@/hooks/useModal'
import { FootageType } from '@/types/footage.type'
import CustomTextField from '@/@core/components/mui/TextField'
import EditorBasic from '@/components/Editer'
import Image from 'next/image'
import { useBrandFootageContext } from '@/services/provider/BrandFootageProvider'
import { BrandCategory, BU } from '@/services/provider/ProductProvider'
import { toast } from 'react-toastify'

type Props = {
    open: boolean
    handleClose: any
    footage?: FootageType
}

const DialogAddFootage = (props: Props) => {
    const { open, handleClose, footage } = props
    const {
        categories: categoriesData,
        footageDetail,
        createOrUpdateFootage,
        handleInputChange
    } = useBrandFootageContext()

    const [fileReview, setFileReview] = useState<any>(null)
    const [bannerFile, setBannerFile] = useState<File>()

    const handleFileChange = (event: any) => {
        const file = event.target.files[0]
        if (file) {
            const fileURL = URL.createObjectURL(file)
            setFileReview(fileURL)
            setBannerFile(file)
        }
    }

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
        if (footageDetail) {
            setSelectedBU(footageDetail?.bu || '')
        }
    }, [categoriesData, footageDetail])

    useEffect(() => {
        // Update categories based on selected BU
        const updatedCategories = selectedBU
            ? categoriesData.find((bu: BU) => bu.bu === selectedBU)?.categories || []
            : []

        if (updatedCategories.length > 0) {
            setCategories(updatedCategories)
            setSelectedCategory(footageDetail?.cat || '')
        }
    }, [selectedBU, categoriesData])

    useEffect(() => {
        const updatedBrands = selectedCategory ? categories.find(cat => cat.cat === selectedCategory)?.brands || [] : []
        if (updatedBrands.length > 0) {
            setBrands(updatedBrands)
            setSelectedBrand(footageDetail?.brand || '')
        }
    }, [selectedCategory, categories])

    const handleSubmit = () => {
        if (bannerFile)
            toast
                .promise(createOrUpdateFootage(bannerFile), {
                    pending: 'Initializing footage...',
                    success: 'Footage initialized successfully.',
                    error: 'Footage creation failed.'
                })
                .then(() => {
                    handleClose()
                })
        else {
            toast.error('Footage creation failed.')
        }
    }

    return (
        <>
            <Dialog open={open} fullWidth>
                <DialogTitle className='flex  justify-between items-center'>
                    {!footage && <p className='font-semibold'>Add new a footage</p>}
                    {footage && <p className='font-semibold'>Edit</p>}

                    <IconButton color='primary' onClick={handleClose}>
                        <i className='tabler-x' />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <Grid container spacing={4}>
                        <Grid item sm={12}>
                            <CustomTextField
                                fullWidth
                                label='Title'
                                value={footageDetail?.title}
                                onChange={e => handleInputChange(e.target.value, 'title')}
                            />
                        </Grid>

                        <Grid item sm={12}>
                            <CustomTextField
                                fullWidth
                                label='Tags'
                                title={footageDetail?.tags}
                                onChange={e => handleInputChange(e.target.value, 'tags')}
                            />
                        </Grid>

                        <Grid item sm={12}>
                            <CustomTextField
                                fullWidth
                                label='Video Url'
                                title={footageDetail?.fileUrl}
                                onChange={e => handleInputChange(e.target.value, 'fileUrl')}
                            />
                        </Grid>

                        <Grid item sm={12} container spacing={4}>
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

                        <Grid item sm={12}>
                            <div className='flex flex-col gap-4'>
                                <label className='text-sm'>
                                    Thumbnail image <span className='text-gray-400'>(ratio: 1/1)</span>
                                </label>
                                {fileReview && (
                                    <div className='relative h-[150px] w-[150px]'>
                                        <div className='absolute top-0 right-0'>
                                            <IconButton color='error'>
                                                <i className='tabler-trash' />
                                            </IconButton>
                                        </div>

                                        <Image
                                            src={fileReview}
                                            alt='file review'
                                            width={100}
                                            height={100}
                                            className=' h-[150px] w-[150px]'
                                        />
                                    </div>
                                )}
                                <Button component='label' variant='tonal' startIcon={<i className='tabler-plus' />}>
                                    Upload file
                                    <input
                                        type='file'
                                        accept='image/png, image/jpeg, image/jpg'
                                        hidden
                                        multiple
                                        onChange={handleFileChange}
                                    />
                                </Button>
                            </div>
                        </Grid>

                        <Grid item sm={12}>
                            <EditorBasic
                                onContentChange={e => handleInputChange(e, 'fileUrl')}
                                content={footageDetail?.description}
                                label='Description'
                                placeholder='Enter description'
                            />
                        </Grid>
                    </Grid>
                    <Divider className='my-4' />

                    <div className='flex justify-end gap-2'>
                        <Button variant='contained' color='primary' onClick={handleSubmit}>
                            Add footage
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default DialogAddFootage
