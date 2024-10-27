'use client'

import { Button, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useModal } from '@/hooks/useModal'
import { useCampaignEmailContext } from '@/services/provider/CampaignEmailProvider'

type Props = {
    open: boolean
    handleClose: any
    filename: string
}

const DialogReviewEmail = (props: Props) => {
    const { open, handleClose, filename } = props
    const { getTemplateContent } = useCampaignEmailContext()
    const [htmlContent, setHtmlContent] = useState<any>()

    const handleGetContent = async () => {
        const res = await getTemplateContent(filename)
        setHtmlContent(res)
    }

    useEffect(() => {
        handleGetContent()
    }, [filename])

    return (
        <>
            <Dialog open={open} fullWidth maxWidth='lg'>
                <DialogTitle className='flex  justify-between items-center'>
                    <p className='font-semibold'>Review Email</p>
                    <IconButton color='primary' onClick={handleClose}>
                        <i className='tabler-x' />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <div
                        className='mt-4 flex flex-col gap-2'
                        dangerouslySetInnerHTML={{ __html: htmlContent?.content || '' }}
                    ></div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default DialogReviewEmail
