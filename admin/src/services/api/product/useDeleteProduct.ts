import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useDeleteProduct = () => {
    return useMutation({
        mutationKey: ['GET_DELETE_PRODUCT'],
        mutationFn: async (sku: any) => {
            const response = await axios.delete('/api/product/' + sku)
            return response.data
        }
    })
}
