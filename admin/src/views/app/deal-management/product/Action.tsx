'use client'
import { useProductContext } from '@/services/provider/ProductProvider'
import { Breadcrumbs, Button, Link, Typography } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'

const Action = () => {
    const router = useRouter()
    const { sku } = useParams()
    const { createOrUpdateProduct } = useProductContext()

    return (
        <div className='flex flex-col gap-4'>
            {/* <Breadcrumbs aria-label='breadcrumb'>
                <Link underline='hover' color='inherit' href='/'>
                    MUI
                </Link>
                <Link underline='hover' color='inherit' href='/material-ui/getting-started/installation/'>
                    Core
                </Link>
                <Typography sx={{ color: 'text.primary' }}>Breadcrumbs</Typography>
            </Breadcrumbs> */}
            <div className='flex justify-between items-center'>
                {sku == 'create' ? (
                    <>
                        <div className='flex flex-col gap-1'>
                            <p className='text-2xl font-medium'>Add a new product</p>
                            <p className='text-[15px]'>Orders placed across your store</p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='flex flex-col gap-1'>
                            <p className='text-2xl font-medium'> Edit product</p>
                            <p className='text-[15px]'>Orders placed across your store</p>
                        </div>
                    </>
                )}

                <div className='flex gap-4'>
                    <Button
                        variant='tonal'
                        color='secondary'
                        onClick={() => {
                            router.push('/deal-management')
                        }}
                    >
                        Discard
                    </Button>
                    <Button variant='contained' color='primary' onClick={createOrUpdateProduct}>
                        Save
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Action
