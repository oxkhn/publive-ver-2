import { ResponseType } from '@/types/response.type'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const usePostTemplate = () => {
    return useMutation({
        mutationKey: ['CREATE_TEMPLATE'],
        mutationFn: async (body: any) => {
            const path = '/api/email/template'
            const res = await axios.post(path, body)

            return res.data as ResponseType<string>
        }
    })
}
