import ChangePWView from "../components/ChangePWView"
import DeleteAccView from "../components/DeleteAccView"
import {Container, Box} from "@mui/material"

const Settings = () => {
    return (
        <Container sx={{width: '100%'}}>
            <Box sx={{m: 1}}>
                <ChangePWView text={"Change password"}/>
            </Box>
            <Box sx={{m: 1}}>
                <DeleteAccView text={"Delete account"}/>
            </Box>
        </Container>

    )
}
export default Settings;