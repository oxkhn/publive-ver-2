import { FormSampleProvider } from '@/services/provider/FormProvider'
import FormDetail from '@/views/app/(sample-campaign)/sample-request-management/FormDetail'
import { Breadcrumbs, Card, CardContent, Grid, Link, Typography } from '@mui/material'

const FormDetailPage = () => {
    return (
        <FormSampleProvider>
            <Breadcrumbs aria-label='breadcrumb'>
                <Link underline='hover' color='inherit' href='/'>
                    Home
                </Link>
                <Link underline='hover' color='inherit' href='/sample-request-management'>
                    Sample Request Managament
                </Link>
                <Typography sx={{ color: 'text.primary' }}>Form Detail</Typography>
            </Breadcrumbs>
            <Grid className='mt-4'>
                <FormDetail />
            </Grid>
        </FormSampleProvider>
    )
}

export default FormDetailPage
