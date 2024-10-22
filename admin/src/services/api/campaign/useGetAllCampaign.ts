import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useGetAllCampaign = () => {
    return useMutation({
        mutationKey: ['GET_ALL_CAMPAIGN'],
        mutationFn: async (body: any) => {
            const response = await axios.post('/api/campaign/all', body)
            return response.data
        }
    })
}
