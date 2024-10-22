import { ResponseType } from '@/types/response.type'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useGetTemplate = () => {
    return useMutation({
        mutationKey: ['CREATE_TEMPLATE'],
        mutationFn: async () => {
            const path = '/api/email/templates'
            const res = await axios.get(path)

            return res.data
        }
    })
}
