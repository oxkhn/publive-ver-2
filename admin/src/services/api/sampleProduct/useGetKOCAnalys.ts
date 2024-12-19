import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useGetKOCAnalys = () => {
    return useMutation({
        mutationKey: ['GET_KOC_ANALYS'],
        mutationFn: async () => {
            const path = '/form-register/user-analys'
            const res = await axios.get(process.env.NEXT_PUBLIC_API_HOST +  path)
            
            return res.data 
        }
    })
}
