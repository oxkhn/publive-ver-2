import { Action } from '@/views/app/activity-management/kol-register/Action'
import { TableAffiliate } from '@/views/app/activity-management/kol-register/TableAffiliate'
import { Breadcrumbs, Grid, Link, Typography } from '@mui/material'

const KOLRegister = () => {
    return (
        <div>
            <Breadcrumbs aria-label='breadcrumb'>
                <Link underline='hover' color='inherit' href='/'>
                    Home
                </Link>
                <Link underline='hover' color='inherit' href='/activity-management'>
                    Activity Management
                </Link>
                <Typography sx={{ color: 'text.primary' }}>Winner List</Typography>
            </Breadcrumbs>
            <Grid container spacing={6} className='mt-2'>
                <Grid item sm={12}>
                    <Action />
                </Grid>
                <Grid item sm={12}>
                    <TableAffiliate />
                </Grid>
            </Grid>
        </div>
    )
}

export default KOLRegister
