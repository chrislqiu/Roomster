import RenterCreateAccountView from "../components/RenterCreateAccounView"
import {Container, Box} from "@mui/material"

const RenterCreateAccountPage = () => {
    return (
        <Container sx={{width: '100%'}}>
            <Box sx={{m: 1}}>
                <RenterCreateAccountView text={"Renter Create Account"}/>
            </Box>
        </Container>
    )
}
export default RenterCreateAccountPage;