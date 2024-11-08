'use client'
import CustomTextField from '@/@core/components/mui/TextField'
import { ProductType } from '@/types/product.type'
import { Button, Card, CardContent, IconButton } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'

type Props = {
    product: ProductType
}

const ProductCard = (props: Props) => {
    const { product } = props
    const [isEdit, setIsEdit] = useState(false)

    return (
        <div className='flex flex-col relative gap-2 rounded-md bg-white shadow-sm p-3 border border-gray-200'>
            <div
                className='absolute top-2 right-4 h-10 w-10 rounded-full grid place-items-center bg-gray-300/50 hover:bg-gray-300 cursor-pointer'
                onClick={() => {
                    setIsEdit(true)
                }}
            >
                <i className='tabler-pencil-minus text-primary' />
            </div>
            {isEdit && (
                <div className='flex flex-col gap-4 items-center p-4 absolute inset-0 bg-white z-10 rounded-md'>
                    <div className='flex justify-between items-center w-full'>
                        <p className='font-medium'>Edit</p>
                        <IconButton
                            color='primary'
                            onClick={() => {
                                setIsEdit(false)
                            }}
                        >
                            <i className='tabler-x' />
                        </IconButton>
                    </div>

                    <CustomTextField label='HC' />
                    <CustomTextField label='Commission' />

                    <Button
                        variant='contained'
                        className='mt-auto w-full'
                        onClick={() => {
                            setIsEdit(false)
                        }}
                    >
                        Save
                    </Button>
                </div>
            )}

            <Image
                className='w-full h-fit rounded  aspect-square'
                src={product.imageList[0]}
                alt=''
                width={100}
                height={100}
            />
            <p className='text-sm font-semibold line-clamp-2'>{product.productName}</p>
            <div className='flex gap-2 items-center'>
                <div className='bg-green-500 h-full rounded flex-1 flex flex-col items-center p-1'>
                    <p className='text-xs'>HC</p>
                </div>
                <div className='bg-orange-400 h-full rounded flex-1 flex flex-col items-center p-1'>
                    <p className='text-xs'>Coms</p>
                    <p className='text-sm'>{product.commission * 100}%</p>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
