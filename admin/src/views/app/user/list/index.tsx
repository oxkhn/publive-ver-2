// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports

// Component Imports
import UserListTable from './UserListTable'
import UserListCards from './UserListCards'
import { UsersType } from '@/types/userTypes'

const UserList = ({ userData }: { userData?: UsersType[] }) => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <UserListCards />
            </Grid>
            <Grid item xs={12}>
                <UserListTable tableData={userData} />
            </Grid>
        </Grid>
    )
}

export default UserList
