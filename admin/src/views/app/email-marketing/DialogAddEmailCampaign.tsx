import CustomTextField from '@/@core/components/mui/TextField'
import AppReactDropzone from '@/components/AppReactDropzone'
import { CustomInput } from '@/components/CustomInput'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import { useCampaignEmailContext } from '@/services/provider/CampaignEmailProvider'
import { ProductListEnum, useProductContext } from '@/services/provider/ProductProvider'
import { CampaignEmailType } from '@/types/campaignEmail.type'
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
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Typography
} from '@mui/material'
import zIndex from '@mui/material/styles/zIndex'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'
import DialogSelectCreateMail from './email/DialogSelectCreateMail'
import { useModal } from '@/hooks/useModal'

type Props = {
    open: boolean
    handleClose: any
}

const DialogAddEmailCampaign = (props: Props) => {
    const { open, handleClose } = props
    const { createCampaign, templates, handleInputCampaignChange, campaignDetail } = useCampaignEmailContext()
    const { isOpenModal, openModal, closeModal } = useModal()

    return (
        <Dialog
            open={open}
            fullWidth
            maxWidth='xs'
            PaperProps={{
                style: { overflow: 'visible' }
            }}
        >
            <DialogSelectCreateMail open={isOpenModal} handleClose={closeModal} />

            <DialogTitle className='flex  justify-between items-center'>
                <p className='font-semibold'>Create a email campaign</p>
                <IconButton color='primary' onClick={handleClose}>
                    <i className='tabler-x' />
                </IconButton>
            </DialogTitle>

            <DialogContent className='flex flex-col gap-4 overflow-auto'>
                <Grid container spacing={4}>
                    <Grid item sm={12}>
                        <CustomTextField
                            label='Name'
                            fullWidth
                            onChange={e => {
                                console.log(e.target.value)
                                handleInputCampaignChange(e.target.value, 'name')
                            }}
                            value={campaignDetail?.name}
                        />
                    </Grid>
                    <Grid item sm={12}>
                        <CustomTextField
                            label='Publisher'
                            className='z-19'
                            select
                            value={campaignDetail?.publisher}
                            defaultValue={campaignDetail?.publisher}
                            fullWidth
                            id='custom-select-category'
                            onChange={e => {
                                handleInputCampaignChange(e.target.value, 'publisher')
                            }}
                        >
                            <MenuItem value='lazada'>Lazada</MenuItem>
                            <MenuItem value='shopee'>Shopee</MenuItem>
                        </CustomTextField>
                    </Grid>
                    <Grid item sm={12}>
                        <AppReactDatepicker
                            selectsRange
                            startDate={new Date()}
                            endDate={new Date()}
                            onChange={(dates: any) => {
                                const [start, end] = dates

                                handleInputCampaignChange(start, 'startDate')
                                handleInputCampaignChange(end, 'endDate')
                            }}
                            shouldCloseOnSelect={false}
                            customInput={
                                <CustomInput
                                    label='Campaign email time'
                                    start={campaignDetail?.startDate || new Date()}
                                    end={campaignDetail?.endDate || new Date()}
                                />
                            }
                        />
                    </Grid>
                    <Grid item sm={12}>
                        <AppReactDatepicker
                            showTimeSelect
                            timeFormat='HH:mm'
                            timeIntervals={15}
                            selected={campaignDetail?.pushlishTime || new Date()}
                            id='date-time-picker'
                            dateFormat='MM/dd/yyyy h:mm aa'
                            onChange={(date: any) => {
                                console.log(date)
                                handleInputCampaignChange(date, 'pushlishTime')
                            }}
                            customInput={<CustomTextField label='Pushlish email' fullWidth />}
                        />
                    </Grid>
                    <Grid item sm={12}>
                        <CustomTextField
                            select
                            fullWidth
                            label='Email template'
                            id='custom-select-category'
                            value={campaignDetail?.templatePath}
                            onChange={e => {
                                handleInputCampaignChange(e.target.value, 'templatePath')
                            }}
                        >
                            {templates.map((item, index) => (
                                <MenuItem value={item.path}>{item.filename}</MenuItem>
                            ))}
                        </CustomTextField>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions className='flex justify-between'>
                <Button
                    variant='text'
                    color='primary'
                    onClick={() => {
                        handleClose()
                        openModal()
                    }}
                >
                    Create template
                </Button>
                <Button
                    variant='contained'
                    color='success'
                    onClick={() => {
                        createCampaign()
                        handleClose()
                    }}
                >
                    Create Campaign
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogAddEmailCampaign
