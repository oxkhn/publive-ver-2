import { CampaignEmailProvider } from '@/services/provider/CampaignEmailProvider'
import Action from '@/views/app/email-marketing/Action'
import { TableCampaignEmail } from '@/views/app/email-marketing/TableCampaignEmail'
import { Breadcrumbs, Grid, Link, Typography } from '@mui/material'

const TrafficMeasurement = () => {
    return (
        <CampaignEmailProvider>
            <Breadcrumbs aria-label='breadcrumb'>
                <Link underline='hover' color='inherit' href='/'>
                    Home
                </Link>
                <Typography sx={{ color: 'text.primary' }}>Traffic measurement</Typography>
            </Breadcrumbs>
            <Grid container spacing={6} className='mt-2'>
                <Grid item sm={12} alignItems='end'>
                    <Action />
                </Grid>
                <Grid item sm={12}>
                    <TableCampaignEmail />
                </Grid>
            </Grid>
        </CampaignEmailProvider>
    )
}

export default TrafficMeasurement
