// MUI Imports
import Grid from '@mui/material/Grid'

// Components Imports
// import CongratulationsJohn from '@views/dashboard/Congratulations'
// import StatisticsCard from '@views/apps/ecommerce/dashboard/StatisticsCard'
// import LineChartProfit from '@views/apps/ecommerce/dashboard/LineChartProfit'
// import RadialBarChart from '@views/apps/ecommerce/dashboard/RadialBarChart'
// import DonutChartGeneratedLeads from '@views/apps/ecommerce/dashboard/DonutChartGeneratedLeads'
// import RevenueReport from '@views/apps/ecommerce/dashboard/RevenueReport'
// import EarningReports from '@views/apps/ecommerce/dashboard/EarningReports'
// import PopularProducts from '@views/apps/ecommerce/dashboard/PopularProducts'
// import Orders from '@views/apps/ecommerce/dashboard/Orders'
// import Transactions from '@views/apps/ecommerce/dashboard/Transactions'
// import InvoiceListTable from '@views/apps/ecommerce/dashboard/InvoiceListTable'
import CardStatVertical from '@/components/card-statistics/Vertical'

// Data Imports
import { getInvoiceData } from '@/app/server/actions'
import CongratulationsJohn from '@/views/app/dashboard/Congratulations'
import StatisticsCard from '@/views/app/dashboard/StatisticsCard'
import LineChartProfit from '@/views/app/dashboard/LineChartProfit'
import RadialBarChart from '@/views/app/dashboard/RadialBarChart'
import RevenueReport from '@/views/app/dashboard/RevenueReport'
import EarningReports from '@/views/app/dashboard/EarningReports'
import PopularProducts from '@/views/app/dashboard/PopularProducts'
import Orders from '@/views/app/dashboard/Orders'
import Transactions from '@/views/app/dashboard/Transactions'
import InvoiceListTable from '@/views/app/dashboard/InvoiceListTable'
import DonutChartGeneratedLeads from '@/views/app/dashboard/ecommerce/DonutChartGeneratedLeads'

import DistributedBarChartOrder from '@/views/app/user/dashboard/DistributedBarChartOrder'
import LineAreaYearlySalesChart from '@/views/app/user/dashboard/LineAreaYearlySalesChart'
import BarChartRevenueGrowth from '@/views/app/user/dashboard/BarChartRevenueGrowth'
import EarningReportsWithTabs from '@/views/app/user/dashboard/EarningReportsWithTabs'
import RadarSalesChart from '@/views/app/user/dashboard/RadarSalesChart'
import SalesByCountries from '@/views/app/user/dashboard/SalesByCountries'
import ProjectStatus from '@/views/app/user/dashboard/ProjectStatus'
import ActiveProjects from '@/views/app/user/dashboard/ActiveProjects'
import ActivityTimeline from '@/views/app/user/dashboard/ActivityTimeline'
import LogisticsDeliveryExceptions from '@/views/app/dashboard/ecommerce/LogisticsDeliveryExceptions'
import { Card, CardContent, MenuItem } from '@mui/material'
import CustomTextField from '@/@core/components/mui/TextField'
import ApexLineChart from '@/views/app/dashboard/ecommerce/ApexLineChart'
import ApexAreaChart from '@/views/app/dashboard/ecommerce/ApexAreaChart'
import { getServerMode } from '@/@core/utils/serverHelpers'
import LastTransaction from '@/views/app/dashboard/LastTransaction'
import LastProduct from '@/views/app/dashboard/LastProduct'

/**
 * ! If you need data using an API call, uncomment the below API code, update the `process.env.API_URL` variable in the
 * ! `.env` file found at root of your project and also update the API endpoints like `/apps/invoice` in below example.
 * ! Also, remove the above server action import and the action itself from the `src/app/server/actions.ts` file to clean up unused code
 * ! because we've used the server action for getting our static data.
 */

/* const getInvoiceData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/apps/invoice`)

  if (!res.ok) {
    throw new Error('Failed to fetch invoice data')
  }

  return res.json()
}
 */

const EcommerceDashboard = async () => {
    // Vars
    const invoiceData = await getInvoiceData()
    const serverMode = getServerMode()

    return (
        <Grid container spacing={6}>
            {/* <Grid item xs={12} md={4}>
                <CongratulationsJohn />
            </Grid> */}
            <Grid item xs={12}>
                <Card>
                    <CardContent className='flex justify-end items-center'>
                        <p>Updated 10:20 today</p>
                    </CardContent>
                </Card>
            </Grid>

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

            <Grid item xs={12} md={4}>
                <LogisticsDeliveryExceptions />
            </Grid>
            <Grid item xs={12}>
                <ApexLineChart />
            </Grid>
            <Grid item xs={12} md={12}>
                <ApexAreaChart />
            </Grid>

            {/* <Grid item xs={12} md={6} lg={4}>
                <RadarSalesChart />
            </Grid> */}
            <Grid item xs={12}>
                {/* <SalesByCountries /> */}
                <LastTransaction serverMode={serverMode} />
            </Grid>
            <Grid item xs={12}>
                {/* <SalesByCountries /> */}
                <LastProduct serverMode={serverMode} />
            </Grid>

            {/* <Grid item xs={12} md={6} lg={4}>
                <ProjectStatus />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <ActiveProjects />
            </Grid> */}
            {/* 
            <Grid item xs={12} md={12}>
                <StatisticsCard />
            </Grid> */}
            {/* <Grid item xs={12} sm={6} lg={4}>
                <EarningReports />
            </Grid>
            <Grid item xs={12} xl={4}>
                <Grid container spacing={6}>
                    <Grid item xs={12} sm={6} md={3} xl={6}>
                        <LineChartProfit />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} xl={6}>
                        <RadialBarChart />
                    </Grid>
                    <Grid item xs={12} md={6} xl={12}>
                        <DonutChartGeneratedLeads />
                    </Grid>
                </Grid>
            </Grid> */}
            <Grid item xs={12} xl={12}>
                <RevenueReport />
            </Grid>

            <Grid item xs={12} sm={6} lg={4}>
                <PopularProducts />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
                <Orders />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
                <Transactions />
            </Grid>
            <Grid item xs={12} lg={12}>
                <InvoiceListTable invoiceData={invoiceData} />
            </Grid>
        </Grid>
    )
}

export default EcommerceDashboard
