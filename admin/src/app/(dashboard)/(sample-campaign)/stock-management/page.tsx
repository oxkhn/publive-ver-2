import { ProductProvider } from '@/services/provider/ProductProvider'
import Action from '@/views/app/(sample-campaign)/stock-management/Action'
import ProductCard from '@/views/app/(sample-campaign)/stock-management/ProductCard'
import { TableProduct } from '@/views/app/(sample-campaign)/stock-management/TableProduct'
import { Grid } from '@mui/material'

const StockManagementPage = () => {
    return (
        <ProductProvider>
            <Grid container spacing={6}>
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
