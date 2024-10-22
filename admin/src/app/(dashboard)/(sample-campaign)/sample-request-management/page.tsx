import { FormSampleProvider } from '@/services/provider/FormProvider'
import { TableForm } from '@/views/app/(sample-campaign)/sample-request-management/TableForm'
import { Grid } from '@mui/material'

const SampleRequestManagementPage = () => {
    return (
        <FormSampleProvider>
            <Grid container spacing={6}>
                <Grid item sm={12}>
                    <TableForm />
                </Grid>
            </Grid>
        </FormSampleProvider>
    )
}

export default SampleRequestManagementPage
