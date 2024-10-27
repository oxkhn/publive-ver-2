'use client'

import { Button, Card, CardContent } from '@mui/material'
import DialogAddFootage from './DialogAddFootage'
import { useModal } from '@/hooks/useModal'

const Action = () => {
    const { openModal: openModalAddFootage, isOpenModal: isOpenModalAddFootage, closeModal: closeModal } = useModal()
    return (
        <Card>
            <DialogAddFootage open={isOpenModalAddFootage} handleClose={closeModal} />
            <CardContent className='flex justify-end'>
                <Button
                    variant='contained'
                    color='success'
                    startIcon={<i className='tabler-plus' />}
                    onClick={openModalAddFootage}
                >
                    Upload Content
                </Button>
            </CardContent>
        </Card>
    )
}

export default Action
