import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useGetCRM = () => {
    return useMutation({
        mutationKey: ['GET_CRM'],
        mutationFn: async () => {
            const path = '/api/crm/get-all'
            const res = await axios.post(path)

            return res.data
        }
    })
}
