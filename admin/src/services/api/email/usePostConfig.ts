import { ResponseType } from '@/types/response.type'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const usePostConfig = () => {
    return useMutation({
        mutationKey: ['CREATE_CONFIG'],
        mutationFn: async (body: any) => {
            const path = '/api/email/config'
            const res = await axios.post(path, body)

            return res.data
        }
    })
}
