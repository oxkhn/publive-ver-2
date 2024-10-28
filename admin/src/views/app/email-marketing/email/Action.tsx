'use client'
import { useModal } from '@/hooks/useModal'
import { Button, Card, CardContent, Chip, IconButton } from '@mui/material'
import DialogSelectAddOption from './DialogSelectAddOption'
import CustomTextField from '@/@core/components/mui/TextField'
import { useCampaignEmailContext } from '@/services/provider/CampaignEmailProvider'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import DialogConfigEmail from './DialogConfigEmail'
import { toast } from 'react-toastify'
import DialogMailLogs from './DialogMailLogs'

interface Props {
    sendMailSelect: () => void
}

const Action = (props: Props) => {
    const { isOpenModal, openModal, closeModal } = useModal()
    const { isOpenModal: isOpenConfig, openModal: openConfig, closeModal: closeConfig } = useModal()
    const { isOpenModal: isOpenMailLog, openModal: openMailLog, closeModal: closeMailLog } = useModal()
    const [searchValue, setSearchValue] = useState('')
    const { campaignEmailId } = useParams()
    const { handleFilterEmail, initCampaign, campaignDetail } = useCampaignEmailContext()

    useEffect(() => {
        initCampaign(campaignEmailId as string)
    }, [])

    return (
        <div>
            <DialogConfigEmail open={isOpenConfig} handleClose={closeConfig} />
            <DialogSelectAddOption open={isOpenModal} handleClose={closeModal} />
            <DialogMailLogs open={isOpenMailLog} handleClose={closeMailLog} campaignId={campaignEmailId as string} />
            <Card>
                <CardContent className='flex justify-between gap-4'>
                    <div className='flex gap-2 items-center'>
                        <i className='tabler-playstation-circle text-green-500'></i>
                        <p className='text-[16px] capitalize'>{campaignDetail?.status}</p>
                    </div>
                    <div className='flex justify-end gap-4'>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={() => {
                                if (campaignDetail?.status == 'ready_to_send') props.sendMailSelect()
                                else {
                                    toast.error('Mail status not ready to send')
                                }
                            }}
                        >
                            Send Mail Selected
                        </Button>

                        <Button
                            variant='contained'
                            color='primary'
                            startIcon={<i className='tabler-plus' />}
                            onClick={openModal}
                        >
                            Upload Email
                        </Button>

                        <IconButton color='secondary' onClick={openConfig}>
                            <i className='tabler-settings' />
                        </IconButton>
                        <IconButton
                            color='secondary'
                            onClick={() => {
                                openMailLog()
                            }}
                        >
                            <i className='tabler-logs' />
                        </IconButton>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Action
