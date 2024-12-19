import { TraffictMeasurementProvider } from '@/services/provider/TrafficMeasurementProvider'
import Action from '@/views/app/email-marketing/Action'
import { TableTrafficMeasurement } from '@/views/app/traffict-measurement/TableTrafficMeasurement'
import { Breadcrumbs, Grid, Link, Typography } from '@mui/material'

const TrafficMeasurement = () => {
    return (
        <TraffictMeasurementProvider>
            <Breadcrumbs aria-label='breadcrumb'>
                <Link underline='hover' color='inherit' href='/'>
                    Home
                </Link>
                <Typography sx={{ color: 'text.primary' }}>Traffic measurement</Typography>
            </Breadcrumbs>
            <Grid container spacing={6} className='mt-2'>
                <Grid item sm={12} alignItems='end'>
                    {/* <Action /> */}
                </Grid>
                <Grid item sm={12}>
                    <TableTrafficMeasurement />
                </Grid>
            </Grid>
        </TraffictMeasurementProvider>
    )
}

export default TrafficMeasurement
