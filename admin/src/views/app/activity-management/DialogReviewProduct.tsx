'use client'

import { Button, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import { useState } from 'react'
import { useModal } from '@/hooks/useModal'
import DialogSelectProduct from './DialogSelectProduct'
import { useCampaignDetailContext } from '@/services/provider/CampaignDetailProvider'
import ProductCard from './ProductCard'
import DialogCreateCampaign from './DialogCreateCampaing'
import DialogSelectAddOption from './DialogSelectAddOption'

type Props = {
    open: boolean
    handleClose: any
}

const DialogReviewProduct = (props: Props) => {
    const { open, handleClose } = props
    const { isOpenModal, openModal, closeModal } = useModal()

    const { products } = useCampaignDetailContext()
    return (
        <>
            <DialogSelectAddOption open={isOpenModal} handleClose={closeModal} />

            <Dialog open={open} fullWidth maxWidth={'lg'}>
                <DialogTitle className='flex  justify-between items-center'>
                    <p className='font-semibold'>Review Product</p>

                    <div className='flex gap-4 items-center'>
                        <Button
                            variant='contained'
                            color='primary'
                            startIcon={<i className='tabler-plus' />}
                            onClick={() => {
                                openModal()
                                handleClose()
                            }}
                        >
                            Add Product
                        </Button>
                        <IconButton color='primary' onClick={handleClose}>
                            <i className='tabler-x' />
                        </IconButton>
                    </div>
                </DialogTitle>

                <DialogContent>
                    <div className='mt-4 grid lg:grid-cols-5 sm:grid-cols-3 gap-2'>
                        {products.map((item, index) => (
                            <ProductCard product={item} />
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default DialogReviewProduct
