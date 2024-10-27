import { ProductProvider } from '@/services/provider/ProductProvider'
import Action from '@/views/app/deal-management/Action'
import ProductFilter from '@/views/app/deal-management/ProductFilter'
import Tab from '@/views/app/deal-management/Tab'
import { TableProduct } from '@/views/app/deal-management/TableProduct'
import { Breadcrumbs, Button, Card, CardContent, Grid, Link, Typography } from '@mui/material'

const DealManagementPage = () => {
    return (
        <ProductProvider>
            <Grid container spacing={4}>
                <Grid item sm={12} alignItems='end'>
                    <Action />
                </Grid>
                <Tab />
                <Grid item sm={12}>
                    <TableProduct />
                </Grid>
            </Grid>
        </ProductProvider>
    )
}

export default DealManagementPage
