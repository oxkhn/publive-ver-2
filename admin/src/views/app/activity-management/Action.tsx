'use client'
import { Button, Card, CardContent, MenuItem } from '@mui/material'
import DialogCreateCampaign from './DialogCreateCampaing'
import { useModal } from '@/hooks/useModal'
import CustomTextField from '@/@core/components/mui/TextField'
import { useCampaignContext } from '@/services/provider/CampaignProvider'

const Action = () => {
    const { isOpenModal, openModal, closeModal } = useModal()
    const { handleFilterChange } = useCampaignContext()
    return (
        <Card>
            <DialogCreateCampaign open={isOpenModal} handleClose={closeModal} />

            <CardContent className='flex justify-between'>
                <div className='flex items-center gap-4'>
                    <CustomTextField
                        select
                        fullWidth
                        label='Campaign type'
                        id='custom-select-category'
                        defaultValue={0}
                        onChange={e => {
                            handleFilterChange(Number(e.target.value), 'type')
                        }}
                    >
                        <MenuItem value='0'>All</MenuItem>
                        <MenuItem value='1'>Chiến thần livestream</MenuItem>
                        <MenuItem value='2'>Chiến thần đu đơn</MenuItem>
                    </CustomTextField>

                    <CustomTextField
                        label='Campaign name'
                        placeholder='Enter campaign name'
                        onChange={e => {
                            handleFilterChange(e.target.value, 'name')
                        }}
                    />
                </div>

                <Button
                    variant='contained'
                    color='success'
                    startIcon={<i className='tabler-plus' />}
                    onClick={openModal}
                >
                    Add Campaign
                </Button>
            </CardContent>
        </Card>
    )
}

export default Action
