'use client'
import { ProductListEnum, useProductContext } from '@/services/provider/ProductProvider'
import { Button, Grid } from '@mui/material'

const Tab = () => {
    const { listType, setListType } = useProductContext()
    return (
        <Grid item sm={12} alignItems='end' className='flex gap-4'>
            <Button
                variant='text'
                color={listType == ProductListEnum.TOP_COMMISSION ? 'primary' : 'secondary'}
                onClick={() => {
                    setListType(ProductListEnum.TOP_COMMISSION)
                }}
            >
                Hoa Hồng Cao Nhất
            </Button>
            <Button
                variant='text'
                color={listType == ProductListEnum.HOT_DEAL ? 'primary' : 'secondary'}
                onClick={() => {
                    setListType(ProductListEnum.HOT_DEAL)
                }}
            >
                Hot deal Livestream
            </Button>
            <Button
                variant='text'
                color={listType == ProductListEnum.TOP_SELL ? 'primary' : 'secondary'}
                onClick={() => {
                    setListType(ProductListEnum.TOP_SELL)
                }}
            >
                Top bán chạy
            </Button>
        </Grid>
    )
}

export default Tab
