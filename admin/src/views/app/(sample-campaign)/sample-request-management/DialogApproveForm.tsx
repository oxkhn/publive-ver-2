'use client'

import { Button, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import { useState } from 'react'
import { useModal } from '@/hooks/useModal'

type Props = {
    open: boolean
    handleClose: any
}

const DialogApproveForm = (props: Props) => {
    const { open, handleClose } = props

    const { isOpenModal, closeModal, openModal: openAddProduct } = useModal()

    return (
        <>
            <Dialog open={open} maxWidth='xs' fullWidth>
                <DialogTitle className='flex  justify-between items-center'>
                    <p className='font-semibold'>Agree to approve the application</p>
                    <IconButton color='primary' onClick={handleClose}>
                        <i className='tabler-x' />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <div className='mt-4 flex gap-4'>
                        <Button variant='outlined' color='error' className='flex-1'>
                            Cancel request
                        </Button>
                        <Button variant='contained' color='primary' className='flex-1'>
                            Approve
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default DialogApproveForm
