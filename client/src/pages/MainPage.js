import PropertyViewMore from "../components/PropertyView";
import FeaturedProperties from "../components/FeaturedProperties";
import React from "react"
import SearchBar from "../components/SearchBar";

import { Container, Box } from "@mui/material";

/*
 * Main Page View with the property cards
 */
const MainPage = ({login}) => {
    /*
     * propertyInfo, setPropertyInfo to hold the card information from the server
     */
    const [propertyInfo, setPropertyInfo] = React.useState([])
    const [filteredPropertyInfo, setFilteredPropertyInfo] = React.useState([]);

    React.useEffect(() => {
        const getPropertyInfo = async () => {
            const res = await fetch('http://localhost:8000/cards/all-cards')
            const getData = await res.json()
            const obj = JSON.parse(JSON.stringify(getData));
            setPropertyInfo(obj);
        }
        getPropertyInfo()
    }, [])

    const [input, setInput] = React.useState('')
    React.useEffect(() => {
        const filteredPropertyInfo = propertyInfo.filter((property) => {
          return property.propertyInfo.propertyName.toLowerCase().includes(input.toLowerCase());
        });
        setFilteredPropertyInfo(filteredPropertyInfo);
      }, [input, propertyInfo]);
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

            <SearchBar data={propertyInfo} setInput={setInput}/>
            {input == '' &&
            <Box sx={{ m: 4 }} style={styles.feed}>
                <FeaturedProperties data={propertyInfo} style={styles.feed} login={login}/>
            </Box>
            }
            <Box sx={{ m: 1 }} style={styles.feed}>
                {
                   /*
                    * Maps each Property Information object to its own "card"
                    */
                    //propertyInfo.map(cards => {
                    filteredPropertyInfo.map((cards) => {
                        return <PropertyViewMore data={cards} login={login}/>
                        }
                    )
                }
            </Box>
        </Container>
    )
}
export default MainPage;