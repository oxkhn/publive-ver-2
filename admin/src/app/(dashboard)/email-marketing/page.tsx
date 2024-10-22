import { CampaignEmailProvider } from '@/services/provider/CampaignEmailProvider'
import Action from '@/views/app/email-marketing/Action'
import { TableCampaignEmail } from '@/views/app/email-marketing/TableCampaignEmail'
import { Grid } from '@mui/material'

const EmailMarketing = () => {
    return (
        <CampaignEmailProvider>
            <Grid container spacing={6}>
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

export default EmailMarketing
