'use server'

import { CrmProvider } from '@/services/provider/CrmProvider'
import UserList from '@/views/app/user/list'

const UserPage = async () => {
    return (
        <CrmProvider>
            <UserList />
        </CrmProvider>
    )
}

export default UserPage
