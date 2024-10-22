import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useGetAllProduct = () => {
  return useMutation({
    mutationKey: ['GET_ALL_PRODUCT'],
    mutationFn: async (body: any) => {
      const response = await axios.post('/api/product', body)

      return response.data
    }
  })
}
