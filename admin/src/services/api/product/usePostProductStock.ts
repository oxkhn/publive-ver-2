import { ResponseType } from '@/types/response.type'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const usePostProductStock = () => {
    return useMutation({
        mutationKey: ['CREATE_PRODUCT_STOCK'],
        mutationFn: async (body: any) => {
            const path = '/api/product/update-stock'
            const res = await axios.post(path, body)

            return res.data as ResponseType<string>
        }
    })
}
