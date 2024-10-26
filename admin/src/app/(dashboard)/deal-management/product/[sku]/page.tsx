import CustomTextField from '@/@core/components/mui/TextField'
import { ProductProvider } from '@/services/provider/ProductProvider'
import Action from '@/views/app/deal-management/product/Action'
import ProductDetail from '@/views/app/deal-management/product/ProductDetail'
import { Button, Card, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material'

const ProductDetailPage = () => {
    return (
        <ProductProvider>
            <div className='flex flex-col gap-4'>
                <Action />
                <ProductDetail />
            </div>
        </ProductProvider>
    )
}

export default ProductDetailPage
