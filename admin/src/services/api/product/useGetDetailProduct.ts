import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useGetDetailProduct = () => {
    return useMutation({
        mutationKey: ['GET_DETAIL_PRODUCT'],
        mutationFn: async (sku: any) => {
            const response = await axios.get('/api/product/' + sku)

            return response.data
        }
    })
}
