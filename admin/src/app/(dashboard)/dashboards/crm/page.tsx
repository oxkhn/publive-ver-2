// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports

import CardStatVertical from '@/components/card-statistics/Vertical'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'
import DistributedBarChartOrder from '@/views/app/user/dashboard/DistributedBarChartOrder'
import LineAreaYearlySalesChart from '@/views/app/user/dashboard/LineAreaYearlySalesChart'
import BarChartRevenueGrowth from '@/views/app/user/dashboard/BarChartRevenueGrowth'
import EarningReportsWithTabs from '@/views/app/user/dashboard/EarningReportsWithTabs'
import RadarSalesChart from '@/views/app/user/dashboard/RadarSalesChart'
import SalesByCountries from '@/views/app/user/dashboard/SalesByCountries'
import ProjectStatus from '@/views/app/user/dashboard/ProjectStatus'
import ActiveProjects from '@/views/app/user/dashboard/ActiveProjects'
import LastTransaction from '@/views/app/user/dashboard/LastTransaction'
import ActivityTimeline from '@/views/app/user/dashboard/ActivityTimeline'

const DashboardCRM = () => {
    // Vars
    const serverMode = getServerMode()

    return (
        <Grid container spacing={6}>
            <Grid item xs={12} sm={6} md={4} lg={2}>
                <DistributedBarChartOrder />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2}>
                <LineAreaYearlySalesChart />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2}>
                <CardStatVertical
                    title='GMV/Affiliate'
                    subtitle='MTD'
                    stats='2.1 M'
                    avatarColor='error'
                    avatarIcon='tabler-credit-card'
                    avatarSkin='light'
                    avatarSize={44}
                    chipText='+12.2%'
                    chipColor='success'
                    chipVariant='tonal'
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2}>
                <CardStatVertical
                    title='Total Spending'
                    subtitle='MTD'
                    stats='24.67k'
                    avatarColor='success'
                    avatarIcon='tabler-currency-dollar'
                    avatarSkin='light'
                    avatarSize={44}
                    chipText='+24.67%'
                    chipColor='success'
                    chipVariant='tonal'
                />
            </Grid>
            <Grid item xs={12} md={8} lg={4}>
                <BarChartRevenueGrowth />
            </Grid>
            <Grid item xs={12} lg={8}>
                <EarningReportsWithTabs />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <RadarSalesChart />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <SalesByCountries />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <ProjectStatus />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <ActiveProjects />
            </Grid>
            <Grid item xs={12} md={6}>
                <LastTransaction serverMode={serverMode} />
            </Grid>
            <Grid item xs={12} md={6}>
                <ActivityTimeline />
            </Grid>
        </Grid>
    )
}

export default DashboardCRM
