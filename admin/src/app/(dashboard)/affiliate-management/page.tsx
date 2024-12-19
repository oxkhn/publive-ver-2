import { AffiliateProvider } from '@/services/provider/AffiliateManagementProdvider'
import { CampaignDetailProvider } from '@/services/provider/CampaignDetailProvider'
import { TableAffiliateManagement } from '@/views/app/affiliate-management/TableAffiliateManagement'
import { Breadcrumbs, Grid, Link, Typography } from '@mui/material'

const AffiliateManagementPage = () => {
    return (
        <AffiliateProvider>
            <Breadcrumbs aria-label='breadcrumb' className='mb-2'>
                <Link underline='hover' color='inherit' href='/'>
                    Home
                </Link>
                <Typography sx={{ color: 'text.primary' }}>Affiliate Management</Typography>
            </Breadcrumbs>
            <Grid container spacing={6}>
                <Grid item sm={12}>
                    {/* <Action /> */}
                </Grid>
                <Grid item sm={12}>
                    <TableAffiliateManagement />
                </Grid>
            </Grid>
        </AffiliateProvider>
    )
}

export default AffiliateManagementPage
