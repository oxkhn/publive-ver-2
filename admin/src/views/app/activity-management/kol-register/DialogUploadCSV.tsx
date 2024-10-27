import AppReactDropzone from '@/components/AppReactDropzone'
import { usePostPreformanceAffiliate } from '@/services/api/campaign/usePostPreformanceAffiliate'
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
import { toast } from 'react-toastify'

type Props = {
    open: boolean
    handleClose: any
}

const DialogUploadCSV = (props: Props) => {
    const { campaignId } = useParams()
    const { open, handleClose } = props
    const [fileList, setFileList] = useState<File[]>([])

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFileList([...fileList, ...Array.from(event.target.files)])
        }
    }

    const handleDeleteFile = (index: number) => {
        setFileList(fileList.filter((_, i) => i !== index))
    }

    const _postFile = usePostPreformanceAffiliate()
    const handleSubmitFile = async () => {
        const formData = new FormData()
        formData.append('file', fileList[0])
        formData.append('campaignId', campaignId as string)

        toast
            .promise(_postFile.mutateAsync(formData), {
                pending: 'Đang save ...',
                success: 'Upload file thành công',
                error: 'Upload file thất bại'
            })
            .finally(() => {
                handleClose()
            })
    }

    const downloadFile = () => {
        const link = document.createElement('a')
        link.href = '/api/sampleAffiliate.xlsx'
        link.setAttribute('download', 'sampleAffiliate.xlsx')
        document.body.appendChild(link)
        link.click()
        link.remove()
    }

    return (
        <Dialog open={open} fullWidth>
            <DialogTitle className='flex  justify-between items-center'>
                <p className='font-semibold'>Select your csv file</p>
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
                        <input
                            type='file'
                            accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                            hidden
                            multiple
                            onChange={handleFileChange}
                        />
                    </Button>
                </div>

                <Divider className='my-4' />

                <div className='flex justify-end gap-2'>
                    <Button component='label' startIcon={<i className='tabler-download' />} onClick={downloadFile}>
                        Download Sample file
                    </Button>
                    <Button variant='contained' color='success' onClick={handleSubmitFile}>
                        Add File
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DialogUploadCSV
