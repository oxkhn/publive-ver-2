import { ResponseType } from '@/types/response.type'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const usePostProductViaCsv = () => {
    return useMutation({
        mutationKey: ['CREATE_PRODUCT'],
        mutationFn: async (body: any) => {
            const path = '/api/product/create/csv'
            const res = await axios.post(path, body)

            return res.data as ResponseType<string>
        }
    })
}
