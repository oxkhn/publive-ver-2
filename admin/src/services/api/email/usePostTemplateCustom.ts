import { ResponseType } from '@/types/response.type'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const usePostTemplateCustom = () => {
    return useMutation({
        mutationKey: ['CREATE_TEMPLATE'],
        mutationFn: async (body: any) => {
            const path = '/api/email/create-email-custom'
            const res = await axios.post(path, body)

            return res.data
        }
    })
}
