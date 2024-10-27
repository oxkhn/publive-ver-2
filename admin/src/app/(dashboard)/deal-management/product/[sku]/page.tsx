import CustomTextField from '@/@core/components/mui/TextField'
import { ProductProvider } from '@/services/provider/ProductProvider'
import Action from '@/views/app/deal-management/product/Action'
import ProductDetail from '@/views/app/deal-management/product/ProductDetail'
import { Breadcrumbs, Button, Card, CardContent, CardHeader, Divider, Grid, Link, Typography } from '@mui/material'

const ProductDetailPage = () => {
    return (
        <ProductProvider>
            <Breadcrumbs aria-label='breadcrumb'>
                <Link underline='hover' color='inherit' href='/'>
                    Home
                </Link>
                <Link underline='hover' color='inherit' href='/deal-management'>
                    Deal Management
                </Link>
                <Typography sx={{ color: 'text.primary' }}>Product Detail</Typography>
            </Breadcrumbs>
            <div className='flex flex-col gap-4 mt-2'>
                <Action />
                <ProductDetail />
            </div>
        </ProductProvider>
    )
}

export default ProductDetailPage
