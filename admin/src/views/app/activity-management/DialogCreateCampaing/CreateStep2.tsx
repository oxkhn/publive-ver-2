'use client'
import CustomAutocomplete from '@/@core/components/mui/Autocomplete'
import CustomTextField from '@/@core/components/mui/TextField'
import { CustomInput } from '@/components/CustomInput'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import { Button, Chip, DialogContent, IconButton, MenuItem } from '@mui/material'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useCampaignDetailContext } from '../../../../services/provider/CampaignDetailProvider'

const optionExample = [
    { title: 'Tags #1', value: 'Tags #1' },
    { title: 'Tags #2', value: 'Tags #2' },
    { title: 'Tags #3', value: 'Tags #3' }
]

const CreateStep2 = () => {
    const { campaignData, setBannerFile, handleInputChange } = useCampaignDetailContext()
    const [fileReview, setFileReview] = useState<any>(null)

    const handleFileChange = (event: any) => {
        const file = event.target.files[0]
        if (file) {
            const fileURL = URL.createObjectURL(file)
            setFileReview(fileURL)
            setBannerFile(file)
        }
    }

    useEffect(() => {
        if (campaignData.banner) setFileReview(campaignData.banner)
    }, [campaignData])

    return (
        <DialogContent>
            <div className='flex flex-col gap-4'>
                <CustomTextField
                    select
                    fullWidth
                    label='Campaign type'
                    id='custom-select-category'
                    defaultValue={campaignData.type}
                    onChange={e => {
                        handleInputChange(e.target.value, 'type')
                    }}
                >
                    <MenuItem value='1'>Chiến thần livestream</MenuItem>
                    <MenuItem value='2'>Chiến thần đu đơn</MenuItem>
                </CustomTextField>

                {/* <CustomAutocomplete
                    multiple
                    limitTags={2}
                    options={optionExample}
                    // id='autocomplete-limit-tags'
                    getOptionLabel={option => option.title || ''}
                    defaultValue={optionExample.filter(i => campaignData.tags.includes(i.value))}
                    renderInput={params => (
                        <CustomTextField {...params} label='Hashtags' placeholder='Choose hashtags' />
                    )}
                    renderTags={(tagValue, getTagProps) =>
                        tagValue.map((option, index) => (
                            <Chip label={option.title} {...(getTagProps({ index }) as {})} key={index} size='small' />
                        ))
                    }
                    onChange={(event, newValue) => {
                        const newTags = newValue.map(i => i.value)
                        handleInputChange(newTags, 'tags')
                    }}
                /> */}

                <CustomTextField
                    label='Hashtag'
                    value={campaignData.tags}
                    placeholder='Enter tags'
                    onChange={event => {
                        handleInputChange(event.target.value, 'tags')
                    }}
                />

                <CustomTextField
                    label='Register Link'
                    value={campaignData.registerLink}
                    placeholder='Enter register link'
                    onChange={e => handleInputChange(e.target.value, 'registerLink')}
                />
                <AppReactDatepicker
                    selectsRange
                    startDate={campaignData.registerStartDate}
                    endDate={campaignData.registerEndDate}
                    onChange={(dates: any) => {
                        const [start, end] = dates
                        handleInputChange(end, 'registerEndDate')
                        handleInputChange(start, 'registerStartDate')
                    }}
                    shouldCloseOnSelect={false}
                    customInput={
                        <CustomInput
                            label='Register Dates'
                            start={campaignData.registerStartDate as Date | number}
                            end={campaignData.registerEndDate as Date | number}
                        />
                    }
                />

                <div className='flex flex-col gap-4'>
                    <label className='text-sm'>Banner (Ratio: 10:3)</label>
                    {fileReview && (
                        <div className='relative h-[150px] w-full bg-gray-400'>
                            <div className='absolute top-0 right-0'>
                                <IconButton color='error'>
                                    <i className='tabler-trash' />
                                </IconButton>
                            </div>

                            <Image
                                src={fileReview}
                                alt='file review'
                                width={300}
                                height={100}
                                className='w-full h-full'
                            />
                        </div>
                    )}
                    <Button component='label' variant='tonal' startIcon={<i className='tabler-plus' />}>
                        Upload image
                        <input
                            type='file'
                            accept='image/png, image/jpeg, image/jpg'
                            hidden
                            multiple
                            onChange={handleFileChange}
                        />
                    </Button>
                </div>
            </div>
        </DialogContent>
    )
}

export default CreateStep2
