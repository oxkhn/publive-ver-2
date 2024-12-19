import { SampleProductProvider } from '@/services/provider/SampleProductProvider'
import { TableSampleProduct } from '@/views/app/sample-product/TableSampleProduct'
import { Breadcrumbs, Grid, Link, Typography } from '@mui/material'

const ProductManagement = () => {
    return (
        <SampleProductProvider>
            <Breadcrumbs aria-label='breadcrumb'>
                <Link underline='hover' color='inherit' href='/'>
                    Home
                </Link>
                <Typography sx={{ color: 'text.primary' }}>Product Management</Typography>
            </Breadcrumbs>
            <Grid container spacing={6} className='mt-2'>
                <Grid item sm={12} alignItems='end'>
                    {/* <Action /> */}
                </Grid>
                <Grid item sm={12}>
                    <TableSampleProduct />
                </Grid>
            </Grid>
        </SampleProductProvider>
    )
}

export default ProductManagement
