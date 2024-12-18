import { BrandFootageProvider } from '@/services/provider/BrandFootageProvider'
import Action from '@/views/app/content-library/brand-footage/Action'
import { TableFootage } from '@/views/app/content-library/brand-footage/TableFootage'
import { Grid } from '@mui/material'

const BrandFootage = () => {
    return (
        <BrandFootageProvider>
            <Grid container>
                <Grid item sm={12}>
                    <Action />
                </Grid>
                <Grid item sm={12}>
                    <TableFootage />
                </Grid>
            </Grid>
        </BrandFootageProvider>
    )
}

export default BrandFootage
