import { FormSampleProvider } from '@/services/provider/FormProvider'
import { TableForm } from '@/views/app/(sample-campaign)/sample-request-management/TableForm'
import { Breadcrumbs, Grid, Link, Typography } from '@mui/material'

const SampleRequestManagementPage = () => {
    return (
        <FormSampleProvider>
            <Breadcrumbs aria-label='breadcrumb'>
                <Link underline='hover' color='inherit' href='/'>
                    Home
                </Link>
                <Typography sx={{ color: 'text.primary' }}>Sample Request Managament</Typography>
            </Breadcrumbs>
            <Grid container spacing={6} className='mt-2'>
                <Grid item sm={12}>
                    <TableForm />
                </Grid>
            </Grid>
        </FormSampleProvider>
    )
}

export default SampleRequestManagementPage
