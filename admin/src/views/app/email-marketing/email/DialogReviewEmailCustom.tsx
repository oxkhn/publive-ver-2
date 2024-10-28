'use client'

import { Button, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useModal } from '@/hooks/useModal'
import { useCampaignEmailContext } from '@/services/provider/CampaignEmailProvider'
import EmailTemplate from './EmailTemplate'

type Props = {
    open: boolean
    handleClose: any
    content: string
    banner: string
}

const DialogReviewEmailCustom = (props: Props) => {
    const { open, handleClose, banner, content } = props

    return (
        <>
            <Dialog open={open} fullWidth>
                <DialogTitle className='flex  justify-between items-center'>
                    <p className='font-semibold'>Review Email</p>
                    <IconButton color='primary' onClick={handleClose}>
                        <i className='tabler-x' />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <EmailTemplate content={content} bannerUrl={banner} />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default DialogReviewEmailCustom
