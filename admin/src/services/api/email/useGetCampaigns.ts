import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useGetCampaigns = () => {
    return useMutation({
        mutationKey: ['GET_CAMPAIGN'],
        mutationFn: async () => {
            const path = '/api/email/all'
            const res = await axios.post(path)

            return res.data
        }
    })
}
