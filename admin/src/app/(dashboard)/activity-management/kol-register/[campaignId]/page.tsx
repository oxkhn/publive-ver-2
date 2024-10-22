import { Action } from '@/views/app/activity-management/kol-register/Action'
import { TableAffiliate } from '@/views/app/activity-management/kol-register/TableAffiliate'
import { Grid } from '@mui/material'

const KOLRegister = () => {
    return (
        <Grid container spacing={6}>
            <Grid item sm={12}>
                <Action />
            </Grid>
            <Grid item sm={12}>
                <TableAffiliate />
            </Grid>
        </Grid>
    )
}

export default KOLRegister
