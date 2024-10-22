import CustomTextField from '@/@core/components/mui/TextField'
import { CustomInput } from '@/components/CustomInput'
import EditorBasic from '@/components/Editer'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    Menu,
    MenuItem
} from '@mui/material'
import CreateStep1 from './CreateStep1'
import CreateStep2 from './CreateStep2'
import { useCampaignDetailContext } from '../../../../services/provider/CampaignDetailProvider'
import { useCampaignContext } from '@/services/provider/CampaignProvider'
import { toast } from 'react-toastify'
import { CampaignTypeWithId } from '@/types/campaign.type'

type Props = {
    open: boolean
    handleClose: any
    initCampaign?: CampaignTypeWithId
}

const DialogCreateCampaign = (props: Props) => {
    const { open, handleClose, initCampaign } = props
    const { setupStep, nextStep, prevStep, onSubmit } = useCampaignDetailContext()
    const { onReload } = useCampaignContext()

    const handleSubmit = async () => {
        toast
            .promise(onSubmit(), {
                pending: 'Đang khởi tạo campaign.',
                success: 'Tạo campaign thành công.',
                error: 'Tạo campaign thất bại.'
            })
            .then(() => {
                onReload()
                handleClose()
            })
    }

    return (
        <Dialog open={open} fullWidth>
            <DialogTitle className='flex  justify-between items-center'>
                <p className='font-semibold'>Create a campaign</p>
                <IconButton color='primary' onClick={handleClose}>
                    <i className='tabler-x' />
                </IconButton>
            </DialogTitle>
            {setupStep == 1 && <CreateStep1 />}
            {setupStep == 2 && <CreateStep2 />}

            <DialogActions>
                {setupStep > 1 && (
                    <Button variant='contained' color='info' onClick={prevStep}>
                        Prev
                    </Button>
                )}
                {setupStep < 2 && (
                    <Button variant='contained' color='info' onClick={nextStep}>
                        Next
                    </Button>
                )}
                {setupStep == 2 && (
                    <Button variant='contained' color='success' onClick={handleSubmit}>
                        Create Campaign
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    )
}

export default DialogCreateCampaign
