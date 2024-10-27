'use client'

import { Button, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import { useState } from 'react'
import { useModal } from '@/hooks/useModal'
import DialogSelectProduct from './DialogSelectProduct'

type Props = {
    open: boolean
    handleClose: any
}

const DialogSelectAddOption = (props: Props) => {
    const { open, handleClose } = props

    const { isOpenModal, closeModal, openModal: openAddProduct } = useModal()

    return (
        <>
            <DialogSelectProduct open={isOpenModal} handleClose={closeModal} />
            <Dialog open={open} fullWidth>
                <DialogTitle className='flex  justify-between items-center'>
                    <p className='font-semibold'>Select method</p>
                    <IconButton color='primary' onClick={handleClose}>
                        <i className='tabler-x' />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <div className='mt-4 flex flex-col gap-2'>
                        <Button
                            variant='text'
                            onClick={() => {
                                handleClose()
                                openAddProduct()
                            }}
                        >
                            Select product from system
                        </Button>
                        {/* <Button variant='text' disabled>
                            Upload via CSV file
                        </Button>
                        <Button variant='text' disabled>
                            Upload Array SKU
                        </Button> */}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default DialogSelectAddOption
