import CustomTextField from '@/@core/components/mui/TextField'
import { CustomInput } from '@/components/CustomInput'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import { useCampaignEmailContext } from '@/services/provider/CampaignEmailProvider'
import { Button, Card, CardContent, Grid, IconButton, MenuItem } from '@mui/material'
import DialogSelectAddOption from './DialogSelectAddOption'
import { useModal } from '@/hooks/useModal'
import DialogSelectCreateMail from './DialogSelectCreateMail'
import DialogReviewEmail from '../DialogReviewEmail'

const MailInfo = () => {
    const { handleInputCampaignChange, campaignDetail, templates, postConfig } = useCampaignEmailContext()
    const { isOpenModal, openModal, closeModal } = useModal()
    const { isOpenModal: isOpenModalReview, openModal: openModalReview, closeModal: closeModalReview } = useModal()

    return (
        <div>
            <DialogSelectCreateMail open={isOpenModal} handleClose={closeModal} />
            <DialogReviewEmail
                open={isOpenModalReview}
                handleClose={closeModalReview}
                filename={campaignDetail?.templatePath || ''}
            />

            <p className='font-semibold mb-2'>Mail Info</p>
            <Card>
                <CardContent className='flex flex-col gap-4'>
                    <Grid container spacing={4}>
                        <Grid item sm={4}>
                            <CustomTextField
                                label='Name'
                                fullWidth
                                onChange={e => {
                                    handleInputCampaignChange(e.target.value, 'name')
                                }}
                                value={campaignDetail?.name}
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <CustomTextField
                                label='Subject'
                                fullWidth
                                onChange={e => {
                                    handleInputCampaignChange(e.target.value, 'subject')
                                }}
                                value={campaignDetail?.subject}
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <CustomTextField
                                label='Publisher'
                                className='z-19'
                                select
                                value={campaignDetail?.publisher}
                                defaultValue={campaignDetail?.publisher}
                                fullWidth
                                id='custom-select-category'
                                onChange={e => {
                                    handleInputCampaignChange(e.target.value, 'publisher')
                                }}
                            >
                                <MenuItem value='lazada'>Lazada</MenuItem>
                                <MenuItem value='shopee'>Shopee</MenuItem>
                            </CustomTextField>
                        </Grid>
                        <Grid item sm={4}>
                            <AppReactDatepicker
                                selectsRange
                                startDate={campaignDetail?.startDate}
                                endDate={campaignDetail?.endDate}
                                onChange={(dates: any) => {
                                    const [start, end] = dates
                                    handleInputCampaignChange(start, 'startDate')
                                    handleInputCampaignChange(end, 'endDate')
                                }}
                                shouldCloseOnSelect={false}
                                customInput={
                                    <CustomInput
                                        label='Campaign email time'
                                        start={campaignDetail?.startDate || new Date()}
                                        end={campaignDetail?.endDate || new Date()}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <AppReactDatepicker
                                showTimeSelect
                                timeFormat='HH:mm'
                                timeIntervals={15}
                                selected={campaignDetail?.pushlishTime ? new Date(campaignDetail.pushlishTime) : null}
                                id='date-time-picker'
                                dateFormat='dd/MM/yyyy h:mm aa'
                                onChange={(date: Date | null) => {
                                    if (date) {
                                        handleInputCampaignChange(date, 'pushlishTime') // Assuming `handleInputCampaignChange` updates `campaignDetail.pushlishTime`
                                    }
                                }}
                                customInput={<CustomTextField label='Pushlish time' fullWidth />}
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <CustomTextField
                                label='Status'
                                className='z-19'
                                select
                                value={campaignDetail?.status}
                                defaultValue={campaignDetail?.status}
                                fullWidth
                                id='custom-select-category'
                                onChange={e => {
                                    handleInputCampaignChange(e.target.value, 'status')
                                }}
                            >
                                <MenuItem value='edit'>Edit</MenuItem>
                                <MenuItem value='ready_to_send'>Ready To Send</MenuItem>
                                <MenuItem value='completed'>Completed</MenuItem>
                                <MenuItem value='cancel'>Cancel</MenuItem>
                            </CustomTextField>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item sm={4}>
                            <CustomTextField
                                select
                                fullWidth
                                label='Email template'
                                id='custom-select-category'
                                value={campaignDetail?.templatePath}
                                onChange={e => {
                                    handleInputCampaignChange(e.target.value, 'templatePath')
                                }}
                            >
                                {templates.map((item, index) => (
                                    <MenuItem value={item.path}>{item.filename}</MenuItem>
                                ))}
                            </CustomTextField>
                        </Grid>
                        <Grid item sm={4} className='flex items-end'>
                            <Button onClick={openModalReview}>Review Email</Button>

                            <Button onClick={openModal}>Create new email</Button>
                        </Grid>
                    </Grid>

                    <div className='flex justify-end' onClick={postConfig}>
                        <Button variant='contained'>Save edit</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default MailInfo
