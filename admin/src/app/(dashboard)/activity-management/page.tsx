import { CampaignDetailProvider } from '@/services/provider/CampaignDetailProvider'
import CampaignProvider from '@/services/provider/CampaignProvider'
import Action from '@/views/app/activity-management/Action'
import { TableCampaign } from '@/views/app/activity-management/TableCampaign'
import { Grid } from '@mui/material'

const ActivityManagementPage = () => {
    return (
        <CampaignProvider>
            <CampaignDetailProvider>
                <Grid container spacing={6}>
                    <Grid item sm={12}>
                        <Action />
                    </Grid>
                    <Grid item sm={12}>
                        <TableCampaign />
                    </Grid>
                </Grid>
            </CampaignDetailProvider>
        </CampaignProvider>
    )
}

export default ActivityManagementPage
