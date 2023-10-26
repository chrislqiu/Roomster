import AdminLogin from "../components/AdminLogin"
import {Container, Box} from "@mui/material"

const AdminPage = () => {
    return (
        <Container sx={{width: '100%'}}>
            <Box sx={{m: 1}}>
                <AdminLogin />
            </Box>
        </Container>

    )
}
export default AdminPage;