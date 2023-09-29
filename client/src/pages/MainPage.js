import PropertyViewMore from "../components/PropertyView";
import { Container, Box } from "@mui/material";
const MainPage = () => {
    return (
    <Container sx={{width: '100%'}}>
        <Box sx={{m: 1}}>
        <PropertyViewMore text={"CompanyName"}/>
        </Box>
    </Container>
    )
}
export default MainPage;