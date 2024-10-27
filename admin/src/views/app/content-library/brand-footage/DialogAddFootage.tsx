'use client'

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    Typography
} from '@mui/material'
import { useState } from 'react'
import { useModal } from '@/hooks/useModal'
import { FootageType } from '@/types/footage.type'
import CustomTextField from '@/@core/components/mui/TextField'
import EditorBasic from '@/components/Editer'
import Image from 'next/image'

type Props = {
    open: boolean
    handleClose: any
    footage?: FootageType
}

const DialogAddFootage = (props: Props) => {
    const { open, handleClose, footage } = props

    const [fileReview, setFileReview] = useState<any>(null)

    const handleFileChange = (event: any) => {
        const file = event.target.files[0]
        if (file) {
            const fileURL = URL.createObjectURL(file)
            setFileReview(fileURL)
            // setBannerFile(file)
        }
    }

    return (
        <>
            <Dialog open={open} fullWidth>
                <DialogTitle className='flex  justify-between items-center'>
                    {!footage && <p className='font-semibold'>Add new a footage</p>}
                    {footage && <p className='font-semibold'>Edit</p>}

                    <IconButton color='primary' onClick={handleClose}>
                        <i className='tabler-x' />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <Grid container spacing={4}>
                        <Grid item sm={12}>
                            <CustomTextField fullWidth label='Title' />
                        </Grid>

                        <Grid item sm={12}>
                            <CustomTextField fullWidth label='Tags' />
                        </Grid>

                        <Grid item sm={12}>
                            <CustomTextField fullWidth label='Video Url' />
                        </Grid>

                        <Grid item sm={12}>
                            <div className='flex flex-col gap-4'>
                                <label className='text-sm'>
                                    Thumbnail image <span className='text-gray-400'>(ratio: 1/1)</span>
                                </label>
                                {fileReview && (
                                    <div className='relative h-[150px] w-[150px]'>
                                        <div className='absolute top-0 right-0'>
                                            <IconButton color='error'>
                                                <i className='tabler-trash' />
                                            </IconButton>
                                        </div>

                                        <Image
                                            src={fileReview}
                                            alt='file review'
                                            width={100}
                                            height={100}
                                            className=' h-[150px] w-[150px]'
                                        />
                                    </div>
                                )}
                                <Button component='label' variant='tonal' startIcon={<i className='tabler-plus' />}>
                                    Upload file
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
                                onContentChange={e => {
                                    // handleInput('description', e)
                                }}
                                // content={product?.description}
                                label='Description'
                                placeholder='Enter description'
                            />
                        </Grid>
                    </Grid>
                    <Divider className='my-4' />

                    <div className='flex justify-end gap-2'>
                        <Button variant='contained' color='primary'>
                            Add footage
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default DialogAddFootage
