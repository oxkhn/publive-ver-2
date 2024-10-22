import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useGetEmails = () => {
    return useMutation({
        mutationKey: ['GET_CAMPAIGN'],
        mutationFn: async (body: { id: string; data: any }) => {
            const path = '/api/email/' + body.id + '/all-email'
            const res = await axios.post(path, body.data)

            return res.data
        }
    })
}
