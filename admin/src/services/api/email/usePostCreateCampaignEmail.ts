import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const usePostCreateCampaignEmail = () => {
    return useMutation({
        mutationKey: ['CREATE_CAMPAIGN_EMAIL'],
        mutationFn: async (data: any) => {
            const path = '/api/email/campaign'
            const res = await axios.post(path, data)
            return res.data
        }
    })
}
