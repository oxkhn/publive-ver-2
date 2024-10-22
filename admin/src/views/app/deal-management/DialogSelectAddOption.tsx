'use client'

import { Button, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import DialogUploadCSV from './DialogUploadCSV'
import { useState } from 'react'
import { useModal } from '@/hooks/useModal'

type Props = {
    open: boolean
    handleClose: any
}

const DialogSelectAddOption = (props: Props) => {
    const { open, handleClose } = props

    const { isOpenModal, closeModal, openModal: openAddProduct } = useModal()

    return (
        <>
            <DialogUploadCSV open={isOpenModal} handleClose={closeModal} />
            <Dialog open={open} fullWidth>
                <DialogTitle className='flex  justify-between items-center'>
                    <p className='font-semibold'>Select add new method</p>
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
                            Upload via CSV file
                        </Button>
                        <Button variant='text' disabled>
                            Create from template
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default DialogSelectAddOption
