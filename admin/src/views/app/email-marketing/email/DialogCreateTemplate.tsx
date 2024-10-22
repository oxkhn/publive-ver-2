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
    Grid,
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

type Props = {
    open: boolean
    handleClose: any
}

const DialogCreateTemplate = (props: Props) => {
    const { open, handleClose } = props

    return (
        <Dialog open={open} fullWidth maxWidth='sm'>
            <DialogTitle className='flex  justify-between items-center'>
                <p className='font-semibold'>Create a Mail</p>
                <IconButton color='primary' onClick={handleClose}>
                    <i className='tabler-x' />
                </IconButton>
            </DialogTitle>

            <DialogContent className='flex flex-col gap-4'>
                <Grid></Grid>
            </DialogContent>

            <DialogActions className='flex items-center justify-end'>
                <Button variant='contained' color='primary'>
                    Create template
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogCreateTemplate
