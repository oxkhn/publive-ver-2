'use client'

import CustomTextField from '@/@core/components/mui/TextField'
import EditorBasic from '@/components/Editer'
import { usePostImage } from '@/services/api/product/usePostImage'
import { BrandCategory, BU, useProductContext } from '@/services/provider/ProductProvider'
import { Box, Button, Card, CardContent, Grid, IconButton, InputAdornment, MenuItem, Typography } from '@mui/material'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const ProductDetail = () => {
    const router = useRouter()
    const { sku } = useParams()
    const { categories: categoriesData, product, getDetail, handleInput } = useProductContext()

    const [selectedBU, setSelectedBU] = useState<string>('')
    const [selectedCategory, setSelectedCategory] = useState<string>('')
    const [selectedBrand, setSelectedBrand] = useState<string>('')

    const [categories, setCategories] = useState<BrandCategory[]>([])
    const [brands, setBrands] = useState<string[]>([])

    // Handle BU change
    const handleBUChange = (event: any) => {
        handleInput('bu', event.target.value as string)
        setSelectedBU(event.target.value as string)
        setSelectedCategory('')
        setSelectedBrand('')
    }

    // Handle Category change
    const handleCategoryChange = (event: any) => {
        handleInput('cat', event.target.value as string)
        setSelectedCategory(event.target.value as string)
        setSelectedBrand('')
    }

    // Handle Brand change
    const handleBrandChange = (event: any) => {
        handleInput('brand', event.target.value as string)
        setSelectedBrand(event.target.value as string)
    }

    useEffect(() => {
        if (sku) {
            getDetail(sku as string)
        }
    }, [sku])

    useEffect(() => {
        // Get categories based on selected BU
        const _categories: BrandCategory[] = selectedBU
            ? categoriesData.find((bu: BU) => bu.bu === selectedBU)?.categories || []
            : []

        // Get brands based on selected Category
        const _brands: string[] = selectedCategory
            ? categories.find(cat => cat.cat === selectedCategory)?.brands || []
            : []

        setCategories(_categories)
        setBrands(_brands)

        if (product) {
            setSelectedBU(product?.bu || '')
            setSelectedCategory(product?.cat || '')
            setSelectedBrand(product?.brand || '')
            setImages(product.imageList)
        }
    }, [categoriesData, product])

    const [images, setImages] = useState<string[]>([]) // Existing image URLs
    const [newImages, setNewImages] = useState<File[]>([]) // New image files

    // Handle new image selection
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files) {
            setNewImages(prev => [...prev, ...Array.from(files)])
        }
    }

    const handleImageDelete = (index: number, isExisting: boolean) => {
        if (isExisting) {
            setImages(prev => prev.filter((_, i) => i !== index))
        } else {
            setNewImages(prev => prev.filter((_, i) => i !== index))
        }
    }

    const _uploadImage = usePostImage()
    const uploadToS3 = async (file: File): Promise<string> => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            const result = await _uploadImage.mutateAsync(formData)
            return result.data
        } catch (error) {
            throw new Error('')
            // throw new Error(`Failed to upload image: ${error.message}`)
        }
    }

    const handleSaveImages = async () => {
        try {
            toast
                .promise(Promise.all(newImages.map(file => uploadToS3(file))), {
                    pending: 'Uploading ...',
                    success: 'Images uploaded successfully!'
                })
                .then(res => {
                    const arr = [...images, ...res]
                    setNewImages([])
                    handleInput('imageList', arr)
                })
        } catch (error) {
            toast.error('Failed to upload images')
        }
    }

    return (
        <Grid container spacing={6}>
            <Grid item sm={8}>
                <Card>
                    <CardContent>
                        <Grid container spacing={6}>
                            <Grid item sm={12}>
                                <p className='text-lg font-medium'>Product Infor</p>
                            </Grid>
                            <Grid item sm={12}>
                                <CustomTextField
                                    value={product?.productName}
                                    label='Product Name'
                                    multiline
                                    rows={2}
                                    fullWidth
                                    onChange={e => handleInput('productName', e.target.value)}
                                ></CustomTextField>
                            </Grid>
                            <Grid item sm={4}>
                                <CustomTextField value={product?.sku} label='SKU' disabled fullWidth></CustomTextField>
                            </Grid>
                            <Grid item sm={4}>
                                <CustomTextField
                                    label='Shop SKU'
                                    value={product?.shopSku}
                                    disabled
                                    fullWidth
                                ></CustomTextField>
                            </Grid>
                            <Grid item sm={4}>
                                <CustomTextField
                                    label='Publisher'
                                    select
                                    value={product?.publisher}
                                    defaultValue={product?.publisher}
                                    fullWidth
                                    id='custom-select-category'
                                    onChange={e => {
                                        handleInput('publisher', e.target.value)
                                    }}
                                >
                                    <MenuItem value='lazada'>Lazada</MenuItem>
                                    <MenuItem value='shopee'>Shopee</MenuItem>
                                </CustomTextField>{' '}
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
                                    {brands?.map(brand => (
                                        <MenuItem key={brand} value={brand}>
                                            {brand}
                                        </MenuItem>
                                    ))}
                                </CustomTextField>
                            </Grid>

                            <Grid item sm={12} spacing={4}>
                                <EditorBasic
                                    onContentChange={e => {
                                        handleInput('description', e)
                                    }}
                                    content={product?.description}
                                    label='Description'
                                    placeholder='Enter description'
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                <Card className='mt-6'>
                    <CardContent>
                        <Grid container spacing={6}>
                            <Grid item sm={12}>
                                <p className='text-lg font-medium'>Image</p>
                            </Grid>

                            <Grid item sm={12} className='flex items-center gap-4'>
                                <div className=''>
                                    <input
                                        type='file'
                                        accept='image/*'
                                        onChange={handleImageUpload}
                                        multiple
                                        style={{ display: 'none' }}
                                        id='image-upload'
                                    />
                                    <label htmlFor='image-upload'>
                                        <div className='h-20 w-20 grid place-items-center border rounded-md border-dashed hover:bg-gray-200 cursor-pointer'>
                                            <i className='tabler-plus'></i>
                                        </div>
                                    </label>
                                </div>
                                {/* Existing Images */}
                                {images.map((imageSrc, index) => (
                                    <div
                                        key={`existing-${index}`}
                                        className='h-20 w-20 relative border border-dashed grid place-items-center'
                                    >
                                        <div
                                            className='absolute right-0 top-0 h-5 w-5 grid place-items-center rounded-full hover:bg-slate-200 cursor-pointer'
                                            onClick={() => handleImageDelete(index, true)}
                                        >
                                            <i className='tabler-trash h-4 w-4 text-error'></i>
                                        </div>
                                        <Image
                                            src={imageSrc}
                                            alt={`Image ${index + 1}`}
                                            className='h-16 w-16'
                                            width={56}
                                            height={56}
                                        />
                                    </div>
                                ))}
                                {/* New Images (not yet uploaded) */}
                                {newImages.map((file, index) => {
                                    const imageUrl = URL.createObjectURL(file)
                                    return (
                                        <div
                                            key={`new-${index}`}
                                            className='h-20 w-20 relative  border border-dashed grid place-items-center'
                                        >
                                            <div
                                                className='absolute right-0 top-0 h-5 w-5 grid place-items-center rounded-full hover:bg-slate-200 cursor-pointer'
                                                onClick={() => handleImageDelete(index, false)}
                                            >
                                                <i className='tabler-trash h-4 w-4 text-error'></i>
                                            </div>
                                            <Image
                                                src={imageUrl}
                                                alt={`New Image ${index + 1}`}
                                                className='h-16 w-16'
                                                width={56}
                                                height={56}
                                            />
                                        </div>
                                    )
                                })}
                            </Grid>

                            <Grid item sm={6}>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={handleSaveImages}
                                    disabled={newImages.length === 0}
                                >
                                    Save Images
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item sm={4}>
                <Card>
                    <CardContent>
                        <Grid container spacing={6}>
                            <Grid item sm={12}>
                                <p className='text-lg font-medium'>Pricing</p>
                            </Grid>
                            <Grid item sm={12}>
                                <CustomTextField
                                    label='Price'
                                    fullWidth
                                    onChange={e => handleInput('price', e.target.value)}
                                    value={product?.price}
                                ></CustomTextField>
                            </Grid>
                            <Grid item sm={12}>
                                <CustomTextField
                                    label='Discount price'
                                    fullWidth
                                    value={product?.discountPrice}
                                    onChange={e => handleInput('discountPrice', e.target.value)}
                                ></CustomTextField>
                            </Grid>

                            <Grid item sm={12}>
                                <CustomTextField
                                    label='Commission'
                                    fullWidth
                                    type='number'
                                    value={(product?.commission || 0) * 100}
                                    onChange={e => handleInput('commission', Number(e.target.value) / 100)}
                                ></CustomTextField>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                <Card className='mt-6'>
                    <CardContent>
                        <Grid container spacing={6}>
                            <Grid item sm={12}>
                                <p className='text-lg font-medium'>Affiliate</p>
                            </Grid>

                            <Grid item sm={12}>
                                <CustomTextField
                                    label='Affiliate link'
                                    fullWidth
                                    type='url'
                                    value={product?.affiliateLink}
                                    onChange={e => handleInput('affiliateLink', e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <i className='tabler-link' />
                                            </InputAdornment>
                                        )
                                    }}
                                ></CustomTextField>
                            </Grid>
                            <Grid item sm={12}>
                                <CustomTextField
                                    label='Registered Count'
                                    value={product?.registeredCount}
                                    fullWidth
                                    disabled
                                ></CustomTextField>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                <Card className='mt-6'>
                    <CardContent>
                        <Grid container spacing={6}>
                            <Grid item sm={12}>
                                <p className='text-lg font-medium'>Product Link</p>
                            </Grid>

                            <Grid item sm={12}>
                                <CustomTextField
                                    label='Product link'
                                    fullWidth
                                    type='url'
                                    value={product?.productLink}
                                    onChange={e => handleInput('productLink', e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <i className='tabler-link' />
                                            </InputAdornment>
                                        )
                                    }}
                                ></CustomTextField>
                            </Grid>
                            <Grid item sm={12}>
                                <CustomTextField
                                    label='Gift link'
                                    fullWidth
                                    type='url'
                                    value={product?.productGiftLink}
                                    onChange={e => handleInput('productGiftLink', e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <i className='tabler-link' />
                                            </InputAdornment>
                                        )
                                    }}
                                ></CustomTextField>
                            </Grid>
                            <Grid item sm={12}>
                                <CustomTextField
                                    label='Gift name'
                                    value={product?.productGift}
                                    onChange={e => handleInput('productGift', e.target.value)}
                                    fullWidth
                                ></CustomTextField>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default ProductDetail
