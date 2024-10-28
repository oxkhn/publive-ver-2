import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useGetEmailsLogs = () => {
    return useMutation({
        mutationKey: ['GET_EMIAL_LOGS'],
        mutationFn: async (id: string) => {
            const path = '/api/email/mail-log/' + id
            const res = await axios.get(path)

            return res.data
        }
    })
}
