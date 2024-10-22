import CustomTextField from '@/@core/components/mui/TextField'
import AppReactDropzone from '@/components/AppReactDropzone'
import { useCampaignEmailContext } from '@/services/provider/CampaignEmailProvider'
import { ProductListEnum, useProductContext } from '@/services/provider/ProductProvider'
import { PartnerType } from '@/types/partner.type'
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Typography
} from '@mui/material'
import { useParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'
import DialogCreateTemplate from './DialogCreateTemplate'
import { useModal } from '@/hooks/useModal'
import DialogSelectCreateMail from './DialogSelectCreateMail'

type Props = {
    open: boolean
    handleClose: any
}

const DialogConfigEmail = (props: Props) => {
    const { open, handleClose } = props
    const { campaignDetail, templates, handleInputCampaignChange, postConfig } = useCampaignEmailContext()

    const { isOpenModal, openModal, closeModal } = useModal()

    return (
        <>
            <DialogSelectCreateMail open={isOpenModal} handleClose={closeModal} />
            <Dialog open={open} fullWidth maxWidth='xs'>
                <DialogTitle className='flex  justify-between items-center'>
                    <p className='font-semibold'>Config a email</p>
                    <IconButton color='primary' onClick={handleClose}>
                        <i className='tabler-x' />
                    </IconButton>
                </DialogTitle>

                <DialogContent className='flex flex-col gap-4'>
                    <CustomTextField
                        label='Name'
                        fullWidth
                        value={campaignDetail?.name}
                        onChange={e => handleInputCampaignChange(e.target.value, 'name')}
                    />
                    <CustomTextField
                        label='Host'
                        fullWidth
                        value={campaignDetail?.host}
                        onChange={e => handleInputCampaignChange(e.target.value, 'host')}
                    />
                    <CustomTextField
                        label='Port'
                        fullWidth
                        value={campaignDetail?.port}
                        onChange={e => handleInputCampaignChange(e.target.value, 'port')}
                    />
                    <CustomTextField
                        label='Username'
                        fullWidth
                        value={campaignDetail?.username}
                        onChange={e => handleInputCampaignChange(e.target.value, 'username')}
                    />
                    <CustomTextField
                        label='Password'
                        fullWidth
                        value={campaignDetail?.password}
                        type='password'
                        onChange={e => handleInputCampaignChange(e.target.value, 'password')}
                    />
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
                </DialogContent>

                <DialogActions className='flex items-center justify-between'>
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
                            postConfig()
                            handleClose()
                        }}
                    >
                        Update config
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DialogConfigEmail
