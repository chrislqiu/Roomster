import PropertyViewMore from "../components/PropertyView";
import React from "react"

import { Container, Box } from "@mui/material";

const MainPage = () => {
    const [propertyInfo, setPropertyInfo] = React.useState([])
    React.useEffect(() => {
        const getPropertyInfo = async () => {
            const res = await fetch('http://localhost:8000/cards/all-cards')
            const getData = await res.json()
            const obj = JSON.parse(JSON.stringify(getData));
            setPropertyInfo(obj);
        }
        getPropertyInfo()
    }, [])
    return (
        <Container sx={{ width: '100%' }}>
            {console.log(propertyInfo)}
            <Box sx={{ m: 1 }}>
                {
                    propertyInfo.map(cards => {
                        return <PropertyViewMore text={"This is where the property card box will go"} data={cards} />
                        }
                    )
                }
            </Box>
        </Container>
    )
}
export default MainPage;