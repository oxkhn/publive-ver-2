import { ResponseType } from '@/types/response.type'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useGetTemplateContent = () => {
    return useMutation({
        mutationKey: ['CREATE_TEMPLATE_CONTENT'],
        mutationFn: async (filename: string) => {
            const path = '/api/email/template/' + filename
            const res = await axios.get(path)

            return res.data
        }
    })
}
