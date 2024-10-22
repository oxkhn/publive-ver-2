import { ResponseType } from '@/types/response.type'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type ResponseData = {
    accessToken: string
}

const useSignIn = () => {
    return useMutation({
        mutationKey: ['SIGN_IN'],
        mutationFn: async (body: { email: string; password: string }) => {
            const path = '/api/auth/login'

            const res = await axios.post(path, body)
            return res.data as ResponseType<ResponseData>
        }
    })
}

export default useSignIn
