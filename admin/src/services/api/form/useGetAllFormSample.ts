import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useGetAllFormSample = () => {
    return useMutation({
        mutationKey: ['GET_ALL_FORM_SAMPLE'],
        mutationFn: async (body: any) => {
            const path = '/api/form-register/get-all'
            const res = await axios.post(path, body)
            return res.data
        }
    })
}
