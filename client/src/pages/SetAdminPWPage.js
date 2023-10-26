import SetAdminPWView from "../components/SetAdminPWView"
import { Container, Box } from "@mui/material"

const SetAdminPWPage = () => {
    return (
        <Container sx={{ width: '100%', minHeight: '100vh' }}>
            <Box sx={{ m: 1 }}>
                <SetAdminPWView />
            </Box>
        </Container>
    )
}

export default SetAdminPWPage;
