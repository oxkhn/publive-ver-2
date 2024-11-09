'use client'
import CustomTextField from '@/@core/components/mui/TextField'
import { useCampaignDetailContext } from '@/services/provider/CampaignDetailProvider'
import { useCampaignContext } from '@/services/provider/CampaignProvider'
import { ProductType } from '@/types/product.type'
import { Button, Card, CardContent, IconButton } from '@mui/material'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

type Props = {
    product: ProductType
}

const ProductCard = (props: Props) => {
    const { product } = props

    const { handleEditProductCampaign } = useCampaignDetailContext()
    const [isEdit, setIsEdit] = useState(false)
    const [hc, setHc] = useState(0)
    const [coms, setComs] = useState(0)

    useEffect(() => {
        if (product) {
            setComs(product.coms * 100)
            setHc(product.hc)
        }
    }, [])

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

                    <CustomTextField
                        label='HC'
                        value={hc}
                        type='number'
                        onChange={(e: any) => {
                            setHc(Number(e.target.value))
                        }}
                    />
                    <CustomTextField
                        label='Commission'
                        value={coms}
                        type='number'
                        onChange={(e: any) => {
                            setComs(Number(e.target.value))
                        }}
                    />

                    <Button
                        variant='contained'
                        className='mt-auto w-full'
                        onClick={async () => {
                            const body = {
                                sku: product.sku,
                                hc: hc,
                                coms: coms / 100
                            }

                            await toast
                                .promise(handleEditProductCampaign(body), {
                                    pending: 'Saving data...',
                                    success: 'Update successful 👌',
                                    error: 'Update failed 🤯'
                                })
                                .then(res => {
                                    console.log(res)
                                    setHc(res.hc)
                                    setComs(res.coms * 100)
                                })
                                .finally(() => {
                                    setIsEdit(false)
                                })
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
                <div className='bg-green-500 h-full rounded flex-1 flex flex-col py-1 px-4'>
                    <p className='text-xs font-semibold text-start'>HC</p>
                    <p className='text-sm text-end'>{hc}</p>
                </div>
                <div className='bg-orange-400 h-full rounded flex-1 flex flex-col p-1 px-4'>
                    <p className='text-xs text-start'>Coms</p>
                    <p className='text-sm text-end'>{coms}%</p>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
