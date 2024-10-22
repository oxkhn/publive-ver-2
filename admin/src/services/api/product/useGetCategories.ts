import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useGetCategories = () => {
    return useMutation({
        mutationKey: ['GET_ALL_PRODUCT'],
        mutationFn: async () => {
            const path = '/api/product/categories'
            const response = await axios.get(path)

            return response.data
        }
    })
}
