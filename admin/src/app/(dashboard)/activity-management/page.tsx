import { CampaignDetailProvider } from '@/services/provider/CampaignDetailProvider'
import CampaignProvider from '@/services/provider/CampaignProvider'
import Action from '@/views/app/activity-management/Action'
import { TableCampaign } from '@/views/app/activity-management/TableCampaign'
import { Breadcrumbs, Grid, Link, Typography } from '@mui/material'

const ActivityManagementPage = () => {
    return (
        <CampaignProvider>
            <CampaignDetailProvider>
                <Breadcrumbs aria-label='breadcrumb' className='mb-2'>
                    <Link underline='hover' color='inherit' href='/'>
                        Home
                    </Link>
                    <Typography sx={{ color: 'text.primary' }}>Activity Management</Typography>
                </Breadcrumbs>
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
