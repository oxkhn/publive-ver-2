import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useGetDetailFootage = () => {
    return useMutation({
        mutationKey: ['GET_DETAIL_FOOTAGE'],
        mutationFn: async (_id: any) => {
            const response = await axios.get('/api/footage/' + _id)

            return response.data
        }
    })
}
