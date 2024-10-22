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

const DialogAddEmail = (props: Props) => {
    const { open, handleClose } = props
    const { createEmail, getEmails } = useCampaignEmailContext()
    const { campaignEmailId } = useParams()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    return (
        <Dialog open={open} fullWidth maxWidth='xs'>
            <DialogTitle className='flex  justify-between items-center'>
                <p className='font-semibold'>Create a email</p>
                <IconButton color='primary' onClick={handleClose}>
                    <i className='tabler-x' />
                </IconButton>
            </DialogTitle>

            <DialogContent className='flex flex-col gap-4'>
                <CustomTextField label='Name' fullWidth onChange={e => setName(e.target.value)} value={name} />
                <CustomTextField
                    label='Email'
                    type='email'
                    fullWidth
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                />
            </DialogContent>

            <DialogActions>
                <Button
                    variant='contained'
                    color='success'
                    onClick={() => {
                        if (name == '' || email == '') {
                            toast.error('Please enter value.')
                            return
                        }

                        const newEmail: PartnerType = {
                            name,
                            email,
                            campaignId: campaignEmailId as string
                        }

                        createEmail(newEmail)
                        setName('')
                        setEmail('')
                        handleClose()
                    }}
                >
                    Create Email
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogAddEmail
