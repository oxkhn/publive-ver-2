import { ProductProvider } from '@/services/provider/ProductProvider'
import Action from '@/views/app/(sample-campaign)/stock-management/Action'
import ProductCard from '@/views/app/(sample-campaign)/stock-management/ProductCard'
import { TableProduct } from '@/views/app/(sample-campaign)/stock-management/TableProduct'
import { Breadcrumbs, Grid, Link, Typography } from '@mui/material'

const StockManagementPage = () => {
    return (
        <ProductProvider>
            <Breadcrumbs aria-label='breadcrumb'>
                <Link underline='hover' color='inherit' href='/'>
                    Home
                </Link>
                <Typography sx={{ color: 'text.primary' }}>Stock Management</Typography>
            </Breadcrumbs>
            <Grid container spacing={6} className='mt-2'>
                <Grid item sm={12}>
                    <ProductCard />
                </Grid>
                <Grid item sm={12}>
                    <Action />
                </Grid>
                <Grid item sm={12}>
                    <TableProduct />
                </Grid>
            </Grid>
        </ProductProvider>
    )
}

export default StockManagementPage
