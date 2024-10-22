import CustomTextField from '@/@core/components/mui/TextField'
import AppReactDropzone from '@/components/AppReactDropzone'
import { useCampaignEmailContext } from '@/services/provider/CampaignEmailProvider'
import { ProductListEnum, useProductContext } from '@/services/provider/ProductProvider'
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
    Typography
} from '@mui/material'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'

type Props = {
    open: boolean
    handleClose: any
}

const DialogAddEmailCampaign = (props: Props) => {
    const { open, handleClose } = props
    const { createCampaign } = useCampaignEmailContext()

    const [name, setName] = useState('')
    const [note, setNote] = useState('')

    return (
        <Dialog open={open} fullWidth maxWidth='xs'>
            <DialogTitle className='flex  justify-between items-center'>
                <p className='font-semibold'>Create a email campaign</p>
                <IconButton color='primary' onClick={handleClose}>
                    <i className='tabler-x' />
                </IconButton>
            </DialogTitle>

            <DialogContent className='flex flex-col gap-4'>
                <CustomTextField label='Name' fullWidth onChange={e => setName(e.target.value)} value={name} />
                <CustomTextField label='Note' fullWidth onChange={e => setNote(e.target.value)} value={note} />
            </DialogContent>

            <DialogActions>
                <Button
                    variant='contained'
                    color='success'
                    onClick={() => {
                        if (name == '') {
                            toast.error('Please enter name.')
                            return
                        }
                        createCampaign(name, note)
                        setName('')
                        setNote('')
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
