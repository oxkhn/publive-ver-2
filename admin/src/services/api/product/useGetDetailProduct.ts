import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useGetDetailProduct = () => {
    return useMutation({
        mutationKey: ['GET_DETAIL_PRODUCT'],
        mutationFn: async (id: any) => {
            const response = await axios.post('/api/product/' + id)

            return response.data
        }
    })
}
