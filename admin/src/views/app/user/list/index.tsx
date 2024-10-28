// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports

// Component Imports
import UserListTable from './UserListTable'
import UserListCards from './UserListCards'
import { UsersType } from '@/types/userTypes'

import { db as userData } from '@/data/userList'

export const getUserData = async () => {
    return userData
}

const UserList = async () => {
    const data = await getUserData()

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <UserListCards />
            </Grid>
            <Grid item xs={12}>
                <UserListTable tableData={data} />
            </Grid>
        </Grid>
    )
}

export default UserList
