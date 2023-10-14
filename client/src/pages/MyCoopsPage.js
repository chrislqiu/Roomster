import React from "react"
import PropertyViewMore from "../components/PropertyView"
import { Container, Box } from "@mui/material";

const MyCoopsPage = () => {
    /*
     * propertyInfo, setPropertyInfo to hold the card information from the server
     */
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
    const styles = {
        feed: {
            display: "flex",
            justifyContent: "center",
            maxWidth: "1200px",
            flexWrap: "wrap",
        },
        
    }
    return (
        <Container sx={{ width: '100%' }}>
           
            <Box sx={{ m: 1 }} style={styles.feed}>
                {
                   /*
                    * Maps each Property Information object to its own "card"
                    */
                    propertyInfo.map(cards => {
                        return <PropertyViewMore data={cards} myCoops={true}/>
                        }
                    )
                }
            </Box>
        </Container>
    )
}
export default MyCoopsPage;
