import { ProductType } from '@/types/product.type'
import { ResponseType } from '@/types/response.type'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const usePostProductOfCampaign = () => {
    return useMutation({
        mutationKey: ['POST_PRODUCT_OF_CAMPAIGN'],
        mutationFn: async (body: any) => {
            const path = '/api/campaign/' + body.id + '/update-product'
            const res = await axios.post(path, body.data)
            return res.data
        }
    })
}
