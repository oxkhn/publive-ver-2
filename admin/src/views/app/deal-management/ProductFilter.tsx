import CustomTextField from '@/@core/components/mui/TextField'
import { Card, CardContent, Divider, Drawer } from '@mui/material'

const ProductFilter = () => {
    return (
        <Drawer open>
            <div className='flex flex-col gap-4 p-4'>
                <p>Product filter</p>

                <Divider />

                <CustomTextField label='Product name' />
                <CustomTextField label='Product name' />
            </div>
        </Drawer>
    )
}

export default ProductFilter
