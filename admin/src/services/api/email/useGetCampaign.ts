import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useGetCampaign = () => {
    return useMutation({
        mutationKey: ['GET_CAMPAIGN'],
        mutationFn: async (id: string) => {
            const path = '/api/email/campaign/' + id
            const res = await axios.get(path)

            return res.data
        }
    })
}
