import LoginView from "../components/LoginView"
import {Container, Box} from "@mui/material"

const LoginPage = () => {
    return (
        <Container sx={{width: '100%'}}>
            <Box sx={{m: 1}}>
                <LoginView text={"Login"}/>
            </Box>
        </Container>

    )
}
export default LoginPage;