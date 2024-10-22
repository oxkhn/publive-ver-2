'use client'
import { useModal } from '@/hooks/useModal'
import { Button, Card, CardContent } from '@mui/material'
import CustomTextField from '@/@core/components/mui/TextField'
import { useCampaignEmailContext } from '@/services/provider/CampaignEmailProvider'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import DialogUploadCSV from './DialogUploadCSV'

const Action = () => {
    const { openModal, isOpenModal, closeModal } = useModal()
    return (
        <div>
            <DialogUploadCSV open={isOpenModal} handleClose={closeModal} />
            <Card>
                <CardContent className='flex justify-end gap-4'>
                    <div className='flex justify-end gap-4'>
                        <Button
                            variant='contained'
                            color='success'
                            startIcon={<i className='tabler-plus' />}
                            onClick={openModal}
                        >
                            Add Stock
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Action
