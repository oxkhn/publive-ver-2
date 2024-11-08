import { CampaignEmailProvider } from '@/services/provider/CampaignEmailProvider'
import Action from '@/views/app/email-marketing/email/Action'
import { TableEmail } from '@/views/app/email-marketing/email/TableEmail'
import { Breadcrumbs, Grid, Link, Typography } from '@mui/material'

const EmailPage = () => {
    return (
        <CampaignEmailProvider>
            <Breadcrumbs aria-label='breadcrumb' className='mb-2'>
            <Link underline='hover' color='inherit' href='/'>
                    Home
                </Link>
                <Link underline='hover' color='inherit' href='/email-marketing/'>
                    Email Marketing
                </Link>
                <Typography sx={{ color: 'text.primary' }}>Send Mail</Typography>
            </Breadcrumbs>
            <Grid container spacing={6} className='mt-0'>
                <TableEmail />
            </Grid>
        </CampaignEmailProvider>
    )
}

export default EmailPage
