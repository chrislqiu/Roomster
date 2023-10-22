import ResetPWView from "../components/ResetPWView"
import { Container, Box } from "@mui/material"

const ResetPWPage = () => {
    return (
        <Container sx={{ width: '100%', minHeight: '100vh' }}>
            <Box sx={{ m: 1 }}>
                <ResetPWView />
            </Box>
        </Container>
    )
}

export default ResetPWPage;
