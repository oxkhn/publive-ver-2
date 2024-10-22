import CustomTextField from '@/@core/components/mui/TextField'
import { ProductProvider } from '@/services/provider/ProductProvider'
import Action from '@/views/app/deal-management/Action'
import ProductDetail from '@/views/app/deal-management/product/ProductDetail'
import { Button, Card, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material'

const ProductDetailPage = () => {
    return (
        <ProductProvider>
            <Grid container spacing={4}>
                <Grid item sm={12}>
                    <div className='flex justify-end'>
                        <Button>Save</Button>
                    </div>
                </Grid>
                <Grid item sm={6}>
                    <Card>
                        <CardHeader>
                            <p></p>
                        </CardHeader>
                        <CardContent>
                            <Grid container spacing={4}>
                                <Grid item sm={12}>
                                    <CustomTextField label='Product Name' fullWidth />
                                </Grid>
                                <Grid item sm={12}>
                                    <CustomTextField label='Description' fullWidth multiline minRows={2} />
                                </Grid>

                                <Grid item sm={6}>
                                    <CustomTextField label='SKU' fullWidth />
                                </Grid>
                                <Grid item sm={6}>
                                    <CustomTextField label='Shop SKU' fullWidth />
                                </Grid>
                                <Grid item sm={12}>
                                    <Divider flexItem />
                                </Grid>

                                <Grid item sm={12}>
                                    <CustomTextField label='Product Link' fullWidth />
                                </Grid>
                                <Grid item sm={12}>
                                    <CustomTextField label='Affiliate Link' fullWidth />
                                </Grid>
                                <Grid item sm={12}>
                                    <Divider flexItem />
                                </Grid>
                                <Grid item sm={12}>
                                    <CustomTextField label='Product Gift Name' fullWidth />
                                </Grid>
                                <Grid item sm={12}>
                                    <CustomTextField label='Product Gift Link' fullWidth />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item sm={6}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={4}>
                                <Grid item sm={6}>
                                    <CustomTextField label='Price' fullWidth />
                                </Grid>
                                <Grid item sm={6}>
                                    <CustomTextField label='Discound Price' fullWidth />
                                </Grid>
                                <Grid item sm={6}>
                                    <CustomTextField label='Commission' fullWidth />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ProductProvider>
    )
}

export default ProductDetailPage
