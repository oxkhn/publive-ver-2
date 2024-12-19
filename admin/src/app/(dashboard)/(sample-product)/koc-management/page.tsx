import { SampleProductProvider } from '@/services/provider/SampleProductProvider'
import { TableKOCRegister } from '@/views/app/sample-product/TableKOCRegister'
import { Breadcrumbs, Grid, Link, Typography } from '@mui/material'

const SampleProduct = () => {
    return (
        <SampleProductProvider>
            <Breadcrumbs aria-label='breadcrumb'>
                <Link underline='hover' color='inherit' href='/'>
                    Home
                </Link>
                <Typography sx={{ color: 'text.primary' }}>KOC management</Typography>
            </Breadcrumbs>
            <Grid container spacing={6} className='mt-2'>
                <Grid item sm={12} alignItems='end'>
                    {/* <Action /> */}
                </Grid>
                <Grid item sm={12}>
                    <TableKOCRegister />
                </Grid>
            </Grid>
        </SampleProductProvider>
    )
}

export default SampleProduct
