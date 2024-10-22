import { ResponseType } from '@/types/response.type'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const usePostEmailViaCsv = () => {
    return useMutation({
        mutationKey: ['CREATE_EMAIL_CSV'],
        mutationFn: async (body: any) => {
            const path = '/api/email/create/csv/' + body.id
            const res = await axios.post(path, body.formData)

            return res.data as ResponseType<string>
        }
    })
}
