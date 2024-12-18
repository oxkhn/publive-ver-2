import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useGetAllFootage = () => {
    return useMutation({
        mutationKey: ['GET_All_FOOTAGE'],
        mutationFn: async () => {
            const response = await axios.post('/api/footage/')

            return response.data
        }
    })
}
