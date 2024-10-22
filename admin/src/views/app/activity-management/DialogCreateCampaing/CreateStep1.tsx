import CustomTextField from '@/@core/components/mui/TextField'
import { CustomInput } from '@/components/CustomInput'
import EditorBasic from '@/components/Editer'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import { DialogContent, MenuItem } from '@mui/material'
import { useCampaignDetailContext } from '../../../../services/provider/CampaignDetailProvider'

const CreateStep1 = () => {
    const { campaignData, handleInputChange } = useCampaignDetailContext()

    return (
        <DialogContent>
            <div className='flex flex-col gap-4'>
                <CustomTextField
                    label='Campaign name'
                    value={campaignData.name}
                    placeholder='Enter the campaign name'
                    onChange={e => {
                        handleInputChange(e.target.value, 'name')
                    }}
                />
                <CustomTextField
                    label='Brand name'
                    value={campaignData.brandName}
                    placeholder='Enter the brand name'
                    onChange={e => {
                        handleInputChange(e.target.value, 'brandName')
                    }}
                />
                <CustomTextField
                    select
                    fullWidth
                    value={campaignData.status}
                    label='Status'
                    id='custom-select-category'
                    onChange={e => {
                        handleInputChange(e.target.value, 'status')
                    }}
                >
                    <MenuItem value='active'>Active</MenuItem>
                    <MenuItem value='inactive'>Inactive</MenuItem>
                    <MenuItem value='completed'>Completed</MenuItem>
                </CustomTextField>

                <AppReactDatepicker
                    selectsRange
                    startDate={campaignData.startDate}
                    endDate={campaignData.endDate}
                    onChange={(dates: any) => {
                        const [start, end] = dates
                        handleInputChange(end, 'endDate')
                        handleInputChange(start, 'startDate')
                    }}
                    shouldCloseOnSelect={false}
                    customInput={
                        <CustomInput
                            label='Campaign Dates'
                            start={campaignData.startDate as Date | number}
                            end={campaignData.endDate as Date | number}
                        />
                    }
                />

                <EditorBasic
                    content={campaignData.description}
                    onContentChange={e => {
                        handleInputChange(e, 'description')
                    }}
                />
            </div>
        </DialogContent>
    )
}

export default CreateStep1
