import { ProductProvider } from '@/services/provider/ProductProvider'
import Action from '@/views/app/deal-management/Action'
import ProductFilter from '@/views/app/deal-management/ProductFilter'
import Tab from '@/views/app/deal-management/Tab'
import { TableProduct } from '@/views/app/deal-management/TableProduct'
import { Breadcrumbs, Button, Card, CardContent, Grid, Link, Typography } from '@mui/material'

const DealManagementPage = () => {
    return (
        <ProductProvider>
            <Breadcrumbs aria-label='breadcrumb'>
                <Link underline='hover' color='inherit' href='/'>
                    MUI
                </Link>
                <Link underline='hover' color='inherit' href='/material-ui/getting-started/installation/'>
                    Core
                </Link>
                <Typography sx={{ color: 'text.primary' }}>Breadcrumbs</Typography>
            </Breadcrumbs>
            <Grid container spacing={4} className='mt-4'>
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
