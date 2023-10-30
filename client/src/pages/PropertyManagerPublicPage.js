import React from "react"
import { Container, Box, Typography } from "@mui/material";
import PropertyViewMore from "../components/PropertyView"
import { useSearchParams } from "react-router-dom";

const PropertyManagerPublicPage = () => {
    const [searchparams] = useSearchParams();
    const companyInfo = {
        companyName: searchparams.get("companyName")
    }
    const [property, setProperty] = React.useState([])
    const [filteredProperty, setFilteredProperty] = React.useState([]);
    const [input, setInput] = React.useState('')

    React.useEffect(() => {
        const sendCompanyName = async () => {
            await fetch('http://localhost:8000/cards/sendCompanyName', {
                method: "POST",
                headers: {'Content-type': "application/json"},
                body: JSON.stringify(companyInfo)
            }).then(res => res.json())
            .then(data => setProperty(data))
        }
        sendCompanyName();
        /*const getProperty = async () => {
            const res = await fetch('http://localhost:8000/cards/all-cards')
            const getData = await res.json()
            const obj = JSON.parse(JSON.stringify(getData));
            setProperty(obj);
        }
        getProperty()*/
    }, [])

    const styles = {
        header: {
            margin: "-20px 0 20px 0",
            fontWeight: "600",
            fontSize: "18pt",
            color: "#AB191F",
            padding: "0 25px",
        },
        feed: {
            display: "flex",
            justifyContent: "center",
            maxWidth: "1200px",
            flexWrap: "wrap",
        }
    }
    return (
        <Container sx={{ width: '100%' }}>
            <Typography style={styles.header}> 
                {"Properties from " + companyInfo.companyName}
            </Typography >
           
            <Box sx={{ m: 1 }} style={styles.feed}>
                {
                   <Box sx={{ m: 1 }} style={styles.feed}>
                        {
                        /*
                            * Maps each Property Information object to its own "card"
                            */
                            //propertyInfo.map(cards => {
                            property.map((cards) => {
                                return <PropertyViewMore data={cards}/>
                                }
                            )
                        }
                    </Box>
                }
            </Box>
        </Container>
    )
}
export default PropertyManagerPublicPage;