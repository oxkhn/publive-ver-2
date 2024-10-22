import { ProductType } from '@/types/product.type'
import { Card, CardContent } from '@mui/material'
import Image from 'next/image'

type Props = {
    product: ProductType
}

const ProductCard = (props: Props) => {
    const { product } = props

    return (
        <div className='flex flex-col gap-2 rounded-md bg-white shadow-sm p-3 border border-gray-200'>
            <Image
                className='w-full h-fit rounded  aspect-square'
                src={product.imageList[0]}
                alt=''
                width={100}
                height={100}
            />
            <p className='text-sm font-semibold line-clamp-2'>{product.productName}</p>
            <div className='flex gap-2 items-center'>
                <div className='bg-orange-400 h-full rounded flex-1 flex flex-col items-center p-1'>
                    <p className='text-xs'>HC</p>
                </div>
                <div className='bg-blue-400 h-full rounded flex-1 flex flex-col items-center p-1'>
                    <p className='text-xs'>Coms</p>
                    <p>{product.commission}</p>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
