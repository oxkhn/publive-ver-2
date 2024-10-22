'use client'

import { Button, Card, CardContent } from '@mui/material'
import DialogSelectAddOption from './DialogSelectAddOption'
import { useModal } from '@/hooks/useModal'
import DialogFilter from './DialogFilter'
import { useProductContext } from '@/services/provider/ProductProvider'

const Action = () => {
    // hooks
    const { isOpenModal, closeModal, openModal: openAddProduct } = useModal()
    const { isOpenModal: isOpenFilter, closeModal: closeFilter, openModal: openFilter } = useModal()

    const { products } = useProductContext()
    return (
        <Card>
            <DialogFilter open={isOpenFilter} handleClose={closeFilter} />
            <DialogSelectAddOption open={isOpenModal} handleClose={closeModal} />
            <CardContent className='flex justify-between'>
                <div className='flex items-center gap-4'>
                    <Button variant='outlined' color='primary' onClick={openFilter}>
                        Filter
                    </Button>
                    <p className='text-sm'>
                        Total product show: <span className='text-primary font-semibold'>{products.length}</span>
                    </p>
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
