import PropertyViewMore from "../components/PropertyView";
import FeaturedProperties from "../components/FeaturedProperties";
import React from "react"
import SearchBar from "../components/SearchBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Container, Box } from "@mui/material";

/*
 * Main Page View with the property cards
 */
const MainPage = ({ login }) => {
    /*
     * propertyInfo, setPropertyInfo to hold the card information from the server
     */
    const [propertyInfo, setPropertyInfo] = React.useState([])
    const [numberSelected, setNumberSelected] = React.useState();

    React.useEffect(() => {
        const getPropertyInfo = async () => {
            const res = await fetch('http://localhost:8000/cards/all-cards')
            const getData = await res.json()
            const obj = JSON.parse(JSON.stringify(getData));
            setPropertyInfo(obj);
        }
        getPropertyInfo()
    }, [])
    const [filteredProperties, setFilteredProperties] = React.useState(propertyInfo);
    //const [sortedProperties, setSortedProperties] = React.useState(propertyInfo);
    const [sortOption, setSortOption] = React.useState('None');

    const [input, setInput] = React.useState('')

    // const sortData = (data, sortingOption) => {    
    //     if (sortingOption === 'Price') {
    //       return data.sort((a, b) => a.propertyInfo.cost - b.propertyInfo.cost);
    //     } else if (sortingOption === 'Distance') {
    //       return data.sort((a, b) => a.propertyInfo.distance - b.propertyInfo.distance);
    //     } else {
    //       return data;
    //     }
    //   };

    React.useEffect(() => {
        const filteredPropertyInfo = propertyInfo.filter((property) => {
          return property.propertyInfo.propertyName.toLowerCase().includes(input.toLowerCase());
        });
        /* SET DEFAULT PAGE TO ALL */
        setFilteredProperties(filteredPropertyInfo)
    }, [input, propertyInfo]);

    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const toastMessage = params.get("toast");

        if (toastMessage === "ResetErr") {
            toast.error('Error resetting password', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                style: {
                    background: "#F6EBE1", 
                  },
            });
        }
    }, []);
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
            <SearchBar data={propertyInfo} setInput={setInput} setFilteredOptions={setFilteredProperties} setNumberSelected={setNumberSelected} setSortOptions={setSortOption}/>
            {console.log(filteredProperties)}
            {(input === '' && numberSelected === 0) &&
            <Box sx={{ m: 4 }} style={styles.feed}>
                <FeaturedProperties data={propertyInfo} style={styles.feed} login={login} />
            </Box>
            }
            <Box sx={{ m: 1 }} style={styles.feed}>
                {
                   /*
                    * Maps each Property Information object to its own "card"
                    */

                    filteredProperties.map((cards) => {
                        return <PropertyViewMore data={cards} login={login}/>
                        }
                    )
                }
            </Box>
        </Container>
    )
}
export default MainPage;