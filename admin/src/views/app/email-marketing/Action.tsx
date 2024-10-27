'use client'
import { useModal } from '@/hooks/useModal'
import { Button, Card, CardContent } from '@mui/material'
import DialogAddEmailCampaign from './DialogAddEmailCampaign'

const Action = () => {
    const { isOpenModal, openModal, closeModal } = useModal()
    return (
        <div>
            <Card>
                <DialogAddEmailCampaign open={isOpenModal} handleClose={closeModal} />
                <CardContent className='flex justify-end'>
                    <Button
                        variant='contained'
                        color='primary'
                        startIcon={<i className='tabler-plus' />}
                        onClick={openModal}
                    >
                        Create Email Campaign
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default Action
