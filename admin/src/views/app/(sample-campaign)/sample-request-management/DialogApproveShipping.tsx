'use client'

import { Button, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import { useState } from 'react'
import { useModal } from '@/hooks/useModal'
import CustomTextField from '@/@core/components/mui/TextField'

type Props = {
    open: boolean
    handleClose: any
}

const DialogApproveShipping = (props: Props) => {
    const { open, handleClose } = props

    const { isOpenModal, closeModal, openModal: openAddProduct } = useModal()

    return (
        <>
            <Dialog open={open} maxWidth='xs' fullWidth>
                <DialogTitle className='flex  justify-between items-center'>
                    <p className='font-semibold'>Add shipping method</p>
                    <IconButton color='primary' onClick={handleClose}>
                        <i className='tabler-x' />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <CustomTextField label='Shipping link' fullWidth />
                    <div className='mt-4 flex gap-4'>
                        <Button variant='contained' color='primary' className='flex-1'>
                            Approve
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default DialogApproveShipping
