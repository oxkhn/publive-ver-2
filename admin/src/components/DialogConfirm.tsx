// components/DialogConfirm.tsx
import {  Button, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material'

interface DialogConfirmProps {
  isDialogVisible: boolean
  setIsDialogVisible: (value: boolean) => void
  onDeleted: () => void
  onCancel: () => void
  message: string
}

const DialogConfirm: React.FC<DialogConfirmProps> = ({
  isDialogVisible,
  setIsDialogVisible,
  onDeleted,
  onCancel,
  message
}) => {
  return (
    <Dialog open={isDialogVisible} maxWidth={'sm'} fullWidth={true}>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
        <div className='flex justify-end gap-6 mt-4'>
          <Button
            color='error'
            onClick={() => {
              onDeleted()
              setIsDialogVisible(false)
            }}
          >
            Delete
          </Button>
          <Button
            variant='contained'
            onClick={() => {
              onCancel()
              setIsDialogVisible(false)
            }}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DialogConfirm
