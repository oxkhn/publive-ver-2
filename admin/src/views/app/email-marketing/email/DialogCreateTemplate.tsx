import CustomTextField from '@/@core/components/mui/TextField'
import AppReactDropzone from '@/components/AppReactDropzone'
import EditorBasic from '@/components/Editer'
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
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'
import DialogReviewEmailCustom from './DialogReviewEmailCustom'
import { useModal } from '@/hooks/useModal'

type Props = {
    open: boolean
    handleClose: any
}

const DialogCreateTemplate = (props: Props) => {
    const { open, handleClose } = props
    const { createTemplateCustom, getTemplate } = useCampaignEmailContext()
    const { isOpenModal, openModal, closeModal } = useModal()
    const [content, setContent] = useState('')
    const [templateName, setTemplateName] = useState('')
    const [fileReview, setFileReview] = useState<any>(null)
    const [bannerFile, setBannerFile] = useState()

    const handleFileChange = (event: any) => {
        const file = event.target.files[0]
        if (file) {
            const fileURL = URL.createObjectURL(file)
            setFileReview(fileURL)
            setBannerFile(file)
        }
    }

    const handleCreateMail = () => {
        toast
            .promise(createTemplateCustom(bannerFile, content, templateName), {
                pending: 'Creating email template...',
                success: 'Email template created successfully! 🎉',
                error: 'Failed to create email template. Please try again. 🚫'
            })
            .then(() => {
                getTemplate()
                handleClose()
            })
    }

    return (
        <Dialog open={open} fullWidth maxWidth='sm'>
            <DialogReviewEmailCustom
                open={isOpenModal}
                handleClose={closeModal}
                banner={fileReview}
                content={content}
            />
            <DialogTitle className='flex  justify-between items-center'>
                <p className='font-semibold'>Create a Mail</p>
                <IconButton color='primary' onClick={handleClose}>
                    <i className='tabler-x' />
                </IconButton>
            </DialogTitle>

            <DialogContent className='flex flex-col gap-4'>
                <Grid container spacing={4}>
                    <Grid item sm={12}>
                        <CustomTextField
                            fullWidth
                            label='Template name'
                            value={templateName}
                            onChange={e => {
                                setTemplateName(e.target.value)
                            }}
                        />
                    </Grid>
                    <Grid item sm={12}>
                        <div className='flex flex-col gap-4 w'>
                            <label className='text-sm'>Banner (Ratio: 10:3)</label>
                            {fileReview && (
                                <div className='relative h-[150px] w-full bg-gray-400'>
                                    <div className='absolute top-0 right-0'>
                                        <IconButton
                                            color='error'
                                            onClick={() => {
                                                setFileReview(null)
                                            }}
                                        >
                                            <i className='tabler-trash' />
                                        </IconButton>
                                    </div>

                                    <Image
                                        src={fileReview}
                                        alt='file review'
                                        width={300}
                                        height={100}
                                        className='w-full h-full'
                                    />
                                </div>
                            )}
                            <Button component='label' variant='tonal' startIcon={<i className='tabler-plus' />}>
                                Upload banner
                                <input
                                    type='file'
                                    accept='image/png, image/jpeg, image/jpg'
                                    hidden
                                    multiple
                                    onChange={handleFileChange}
                                />
                            </Button>
                        </div>
                    </Grid>
                    <Grid item sm={12}>
                        <EditorBasic
                            label='Email content'
                            placeholder=''
                            content={content}
                            onContentChange={e => {
                                setContent(e)
                            }}
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions className='flex items-center justify-end'>
                <Button variant='tonal' color='primary' onClick={openModal}>
                    Review
                </Button>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => {
                        handleCreateMail()
                    }}
                >
                    Create template
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogCreateTemplate
