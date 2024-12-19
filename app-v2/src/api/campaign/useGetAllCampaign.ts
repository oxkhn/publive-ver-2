import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { axiosWithoutAccessToken } from '../../../axiosConfig/axiosConfig'

export const useGetAllCampaign = () => {
    return useMutation({
        mutationKey: ['GET_ALL_CAMPAIGN'],
        mutationFn: async (body: any) => {
            const response = await axiosWithoutAccessToken.post('/campaign/all', body)
            return response.data
        }
    })
}
