'use client'

import { Button, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useModal } from '@/hooks/useModal'
import { useCampaignEmailContext } from '@/services/provider/CampaignEmailProvider'
import EmailTemplate from './EmailTemplate'
import { useGetEmailsLogs } from '@/services/api/email/useGetEmailsLogs'
import { calculateTimePassed } from '@/utils/string'

type Props = {
    open: boolean
    handleClose: any
    campaignId: string
}

const DialogMailLogs = (props: Props) => {
    const { open, handleClose, campaignId } = props
    const [logs, setLogs] = useState([])

    const _getMailLog = useGetEmailsLogs()
    const handleGetData = async () => {
        try {
            const res = await _getMailLog.mutateAsync(campaignId)
            setLogs(res.data)
        } catch (error) {}
    }

    useEffect(() => {
        handleGetData()
    }, [open])

    return (
        <>
            <Dialog open={open} fullWidth>
                <DialogTitle className='flex  justify-between items-center'>
                    <p className='font-semibold'>Mail Logs</p>
                    <IconButton color='primary' onClick={handleClose}>
                        <i className='tabler-x' />
                    </IconButton>
                </DialogTitle>

                <DialogContent className='flex flex-col gap-2'>
                    {logs.map((_: any, index) => (
                        <div key={index} className='px-4 py-1 rounded bg-gray-300/40 flex justify-between'>
                            <p>{_.recipient}</p>
                            <div className='flex gap-4 text-xs'>
                                <p>{calculateTimePassed(_?.sentAt)}</p>
                                <p className={`${_.status == 'sent' ? 'text-green-500' : 'text-red-400'} capitalize`}>
                                    {_.status}
                                </p>
                            </div>
                        </div>
                    ))}
                </DialogContent>
            </Dialog>
        </>
    )
}

export default DialogMailLogs
