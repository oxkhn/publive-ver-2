'use client'
import { useProductContext } from '@/services/provider/ProductProvider'
import { Button } from '@mui/material'

const Action = () => {
    const { createOrUpdateProduct } = useProductContext()

    return (
        <div className='flex justify-between items-center'>
            <div className='flex flex-col gap-1'>
                <p className='text-2xl font-medium'>Add a new product</p>
                <p className='text-[15px]'>Orders placed across your store</p>
            </div>

            <div className='flex gap-4'>
                <Button variant='tonal' color='secondary'>
                    Discard
                </Button>
                <Button variant='contained' color='primary' onClick={createOrUpdateProduct}>
                    Save
                </Button>
            </div>
        </div>
    )
}

export default Action
