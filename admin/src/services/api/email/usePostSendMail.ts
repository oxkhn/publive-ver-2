import { ResponseType } from '@/types/response.type'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const usePostSendMail = () => {
    return useMutation({
        mutationKey: ['SEND_EMAIL'],
        mutationFn: async (body: any) => {
            const path = '/api/email/' + body.id + '/send-mail'
            const res = await axios.post(path, body.data)

            return res.data as ResponseType<string>
        }
    })
}
