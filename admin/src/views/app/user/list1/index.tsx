// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports

// Component Imports
import UserListTable from './UserListTable'
import UserListCards from './UserListCards'

const UserList1 = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <UserListCards />
            </Grid>
            <Grid item xs={12}>
                <UserListTable />
            </Grid>
        </Grid>
    )
}

export default UserList1
