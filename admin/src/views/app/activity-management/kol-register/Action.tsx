'use client'
import { Button, Card, CardContent } from '@mui/material'
import DialogUploadCSV from './DialogUploadCSV'
import { useModal } from '@/hooks/useModal'

export const Action = () => {
    const { isOpenModal, openModal, closeModal } = useModal()

    return (
        <Card>
            <DialogUploadCSV open={isOpenModal} handleClose={closeModal} />
            <CardContent className='flex justify-end'>
                <Button
                    variant='contained'
                    color='success'
                    startIcon={<i className='tabler-plus' />}
                    onClick={openModal}
                >
                    Add Performance
                </Button>
            </CardContent>
        </Card>
    )
}
