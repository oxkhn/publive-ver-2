import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useGetSampleProductAnalys = () => {
    return useMutation({
        mutationKey: ['GET_SAMPLE_PRODUCT'],
        mutationFn: async () => {
            const path = '/form-register/product-analys'
            const res = await axios.get(process.env.NEXT_PUBLIC_API_HOST +  path)
            
            return res.data 
        }
    })
}
