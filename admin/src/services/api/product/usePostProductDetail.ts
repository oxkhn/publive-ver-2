import { ResponseType } from '@/types/response.type'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const usePostProductDetail = () => {
    return useMutation({
        mutationKey: ['CREATE_PRODUCT_UPDATE'],
        mutationFn: async (body: any) => {
            const path = '/api/product/create-or-update'
            const res = await axios.post(path, body)

            return res.data as ResponseType<string>
        }
    })
}
