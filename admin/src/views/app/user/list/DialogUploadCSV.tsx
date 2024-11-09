import CustomTextField from '@/@core/components/mui/TextField'
import AppReactDropzone from '@/components/AppReactDropzone'
import { useCrmContext } from '@/services/provider/CrmProvider'
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
    MenuItem,
    Typography
} from '@mui/material'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

type Props = {
    open: boolean
    handleClose: any
}

const DialogUploadCSV = (props: Props) => {
    const { open, handleClose } = props
    const { handleUploadCSV } = useCrmContext()
    const [fileList, setFileList] = useState<File[]>([])
    const [productListType, setProductListType] = useState<ProductListEnum>(ProductListEnum.HOT_DEAL)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFileList([...fileList, ...Array.from(event.target.files)])
        }
    }

    const handleDeleteFile = (index: number) => {
        setFileList(fileList.filter((_, i) => i !== index))
    }

    const handleSubmitFile = async () => {
        await handleUploadCSV(fileList[0])
        handleClose()
    }

    const downloadFile = () => {
        const link = document.createElement('a')
        // link.href = 'api/sampleProduct.xlsx'
        // link.setAttribute('download', 'sampleProduct.xlsx')
        // document.body.appendChild(link)
        // link.click()
        // link.remove()
    }

    return (
        <Dialog open={open} fullWidth>
            <DialogTitle className='flex  justify-between items-center'>
                <p className='font-semibold'>Select your csv file</p>
                <IconButton color='primary' onClick={handleClose}>
                    <i className='tabler-x' />
                </IconButton>
            </DialogTitle>

            <DialogContent className='flex flex-col gap-4'>
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

                <Divider className='my-4' />

                <div className='flex justify-end gap-2'>
                    {/* <Button component='label' startIcon={<i className='tabler-download' />} onClick={downloadFile}>
                        Download Sample file
                    </Button> */}
                    <Button variant='contained' onClick={handleSubmitFile}>
                        Upload File
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DialogUploadCSV
