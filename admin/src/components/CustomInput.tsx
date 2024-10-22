'use client'
import CustomTextField from '@/@core/components/mui/TextField'
import { TextFieldProps } from '@mui/material'
import { forwardRef } from 'react'
import { format, addDays } from 'date-fns'

type CustomInputProps = TextFieldProps & {
    label: string
    end: Date | number
    start: Date | number
}

export const CustomInput = forwardRef((props: CustomInputProps, ref) => {
    const { label, start, end, ...rest } = props

    const startDate = format(start, 'MM/dd/yyyy')
    const endDateFormatted = end !== null ? ` - ${format(end, 'MM/dd/yyyy')}` : ''

    const value = `${startDate}${endDateFormatted}`

    return <CustomTextField fullWidth inputRef={ref} {...rest} label={label} value={value} />
})
