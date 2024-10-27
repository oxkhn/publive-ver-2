'use client'
import { useModal } from '@/hooks/useModal'
import { Button, Card, CardContent, IconButton } from '@mui/material'
import DialogSelectAddOption from './DialogSelectAddOption'
import CustomTextField from '@/@core/components/mui/TextField'
import { useCampaignEmailContext } from '@/services/provider/CampaignEmailProvider'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import DialogConfigEmail from './DialogConfigEmail'

interface Props {
    sendMailSelect: () => void
}

const Action = (props: Props) => {
    const { isOpenModal, openModal, closeModal } = useModal()
    const { isOpenModal: isOpenConfig, openModal: openConfig, closeModal: closeConfig } = useModal()
    const [searchValue, setSearchValue] = useState('')
    const { campaignEmailId } = useParams()
    const { handleFilterEmail, initCampaign } = useCampaignEmailContext()

    useEffect(() => {
        initCampaign(campaignEmailId as string)
    }, [])

    return (
        <div>
            <DialogConfigEmail open={isOpenConfig} handleClose={closeConfig} />
            <DialogSelectAddOption open={isOpenModal} handleClose={closeModal} />
            <Card>
                <CardContent className='flex justify-between gap-4'>
                    <CustomTextField
                        placeholder='Email or Name'
                        onChange={e => {
                            setSearchValue(e.target.value)
                            handleFilterEmail(e.target.value, campaignEmailId as string)
                        }}
                    />
                    <div className='flex justify-end gap-4'>
                        <Button variant='contained' color='primary' onClick={props.sendMailSelect}>
                            Send Mail Selected
                        </Button>

                        <Button
                            variant='contained'
                            color='success'
                            startIcon={<i className='tabler-plus' />}
                            onClick={openModal}
                        >
                            Add Email
                        </Button>
                        <IconButton color='secondary' onClick={openConfig}>
                            <i className='tabler-settings' />
                        </IconButton>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Action
