'use client'

import { Button, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import { useState } from 'react'
import { useModal } from '@/hooks/useModal'
import DialogUploadCSV from './DialogUploadCSV'
import DialogAddEmail from './DialogAddEmail'
import DialogUploadTemplate from './DialogUploadTemplate'
import DialogCreateTemplate from './DialogCreateTemplate'

type Props = {
    open: boolean
    handleClose: any
}

const DialogSelectCreateMail = (props: Props) => {
    const { open, handleClose } = props

    const { isOpenModal: isOpenCsv, closeModal: closeCsv, openModal: openCsv } = useModal()
    const { isOpenModal: isOpenAdd, closeModal: closeAdd, openModal: openAdd } = useModal()

    return (
        <>
            <DialogCreateTemplate open={isOpenAdd} handleClose={closeAdd} />
            <DialogUploadTemplate open={isOpenCsv} handleClose={closeCsv} />
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
                                openCsv()
                            }}
                        >
                            Upload template
                        </Button>
                        <Button
                            variant='text'
                            onClick={() => {
                                handleClose()
                                openAdd()
                            }}
                        >
                            Create template
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default DialogSelectCreateMail
