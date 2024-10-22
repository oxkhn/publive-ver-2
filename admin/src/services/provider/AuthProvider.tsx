'use client'

import { ChildrenType } from '@/@core/types'
import useSignIn from '@/services/api/auth/useSignIn'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

type AuthContextProps = {
    accessToken: string | undefined
    signIn: (username: string, password: string) => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

type Props = ChildrenType & {}

export const AuthProvider = (props: Props) => {
    //hooks
    const router = useRouter()
    const pathname = usePathname()

    //state
    const [accessToken, setAccessToken] = useState<string>()

    const _postSignIn = useSignIn()
    const signIn = async (username: string, password: string) => {
        const body = {
            email: username,
            password
        }

        await _postSignIn
            .mutateAsync(body)
            .then(res => {
                const _accessToken = res.data.accessToken
                Cookies.set('accessToken', _accessToken, { expires: 7 })
                setAccessToken(_accessToken)

                toast.success('Đăng nhập thành công.')
                setTimeout(() => {
                    router.push('/')
                }, 500)
            })
            .catch(error => {
                toast.error('Đăng nhập lỗi!')
            })
    }

    useEffect(() => {
        const _accessToken = Cookies.get('accessToken')
        setAccessToken(_accessToken)

        if (!_accessToken) {
            router.push('/login')
        } else {
            router.replace(pathname)
        }
    }, [])

    const value = {
        accessToken,
        signIn
    }

    return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
}

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuthContext must be used within a AuthProvider')
    }
    return context
}
