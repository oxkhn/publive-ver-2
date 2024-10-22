import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useCreateEmail = () => {
    return useMutation({
        mutationKey: ['CREATE_EMAIL'],
        mutationFn: async (body: any) => {
            const path = '/api/email/create-email/'
            const res = await axios.post(path, body)

            return res.data
        }
    })
}
