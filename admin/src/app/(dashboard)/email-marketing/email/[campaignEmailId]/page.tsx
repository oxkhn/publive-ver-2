import { CampaignEmailProvider } from '@/services/provider/CampaignEmailProvider'
import Action from '@/views/app/email-marketing/email/Action'
import { TableEmail } from '@/views/app/email-marketing/email/TableEmail'
import { Grid } from '@mui/material'

const EmailPage = () => {
    return (
        <CampaignEmailProvider>
            <Grid container spacing={6}>
                <TableEmail />
            </Grid>
        </CampaignEmailProvider>
    )
}

export default EmailPage
