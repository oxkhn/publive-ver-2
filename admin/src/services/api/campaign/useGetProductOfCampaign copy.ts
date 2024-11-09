import { ProductType } from '@/types/product.type'
import { ResponseType } from '@/types/response.type'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const useGetProductOfCampaign = () => {
    return useMutation({
        mutationKey: ['GET_PRODUCT_OF_CAMPAIGN'],
        mutationFn: async (id: string) => {
            const path = '/api/campaign/' + id + '/product'
            const res = await axios.post(path)
            return res.data as ResponseType<ProductType[]>
        }
    })
}

export default useGetProductOfCampaign
