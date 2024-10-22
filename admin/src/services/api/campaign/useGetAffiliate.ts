import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useGetAffiliate = () => {
    return useMutation({
        mutationKey: ['GET_AFFILIATE'],
        mutationFn: async (campaignId: string) => {
            const path = '/api/campaign/' + campaignId + '/affiliate'
            const response = await axios.post(path)
            return response.data
        }
    })
}
