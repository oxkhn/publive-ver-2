import AppReactDropzone from '@/components/AppReactDropzone'
import { useCampaignEmailContext } from '@/services/provider/CampaignEmailProvider'
import { ProductListEnum, useProductContext } from '@/services/provider/ProductProvider'
import {
    Box,
    Button,
    Dialog,
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

type Props = {
    open: boolean
    handleClose: any
}

const DialogUploadTemplate = (props: Props) => {
    const { open, handleClose } = props
    const { uploadTemplate, getEmails, getTemplate } = useCampaignEmailContext()
    const { campaignEmailId } = useParams()
    const [fileList, setFileList] = useState<File[]>([])

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFileList([...fileList, ...Array.from(event.target.files)])
        }
    }

    const handleDeleteFile = (index: number) => {
        setFileList(fileList.filter((_, i) => i !== index))
    }

    const handleSubmitFile = async () => {
        await uploadTemplate(fileList[0])
        getTemplate()
        handleClose()
    }

    return (
        <Dialog open={open} fullWidth>
            <DialogTitle className='flex  justify-between items-center'>
                <p className='font-semibold'>Upload email template</p>
                <IconButton color='primary' onClick={handleClose}>
                    <i className='tabler-x' />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                {fileList.length > 0 && (
                    <List>
                        {fileList.map((file, index) => (
                            <ListItem key={index}>
                                <p>{index + 1}.</p>
                                <ListItemText primary={file.name} />
                                <IconButton
                                    color='error'
                                    onClick={() => {
                                        handleDeleteFile(index)
                                    }}
                                >
                                    <i className='tabler-trash' />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                )}

                <div className='flex justify-between'>
                    <Button component='label' variant='tonal' startIcon={<i className='tabler-plus' />}>
                        Add file
                        <input type='file' accept='.html' hidden multiple onChange={handleFileChange} />
                    </Button>
                </div>

                <Divider className='my-4' />

                <div className='flex justify-end gap-2'>
                    <Button variant='contained' color='primary' onClick={handleSubmitFile}>
                        Upload
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DialogUploadTemplate
