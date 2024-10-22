import { FormSampleProvider } from '@/services/provider/FormProvider'
import FormDetail from '@/views/app/(sample-campaign)/sample-request-management/FormDetail'
import { Card, CardContent, Grid } from '@mui/material'

const FormDetailPage = () => {
    return (
        <FormSampleProvider>
            <FormDetail />
        </FormSampleProvider>
    )
}

export default FormDetailPage
