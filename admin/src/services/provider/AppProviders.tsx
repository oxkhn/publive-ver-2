import { ChildrenType } from '@/@core/types'
import { AuthProvider } from './AuthProvider'
import TanstackProvider from './TanstackProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ConfirmProvider } from './ConfirmProvider'

export const AppProviders = (props: ChildrenType) => {
    return (
        <TanstackProvider>
            <ToastContainer autoClose={2000} />
            <ConfirmProvider>
                <AuthProvider>{props.children}</AuthProvider>
            </ConfirmProvider>
        </TanstackProvider>
    )
}
