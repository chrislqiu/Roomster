import React from "react"
import { Container, Box } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PropertyView from "../components/PropertyView";

const FavCoopPage = ({login}) => {
    const [propertyInfo, setPropertyInfo] = React.useState([])
    const [username, setUsername] = React.useState('')
    /* TODO:
     *  change this so it only gets the users favorite coops from the db
     *  later
     */

    React.useEffect(() => {
        const getUserInfo = async () => {
            const res = await fetch('http://localhost:8000/auth/current-user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            })
            const getData = await res.json()
            const obj = JSON.parse(JSON.stringify(getData));
            setUsername(obj.username)
        }
        getUserInfo()
    }, [])
    React.useEffect(() => {
        const getPropertyInfo = async () => {
            const res = await fetch('http://localhost:8000/cards/fav-coops-cards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username: username}),
                credentials: 'include'
            })
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
            <Box sx={{ marginTop: 3 }} style={styles.feed}>
                {
                   /*
                    * Maps each Property Information object to its own "card"
                    */
                    propertyInfo.map(cards => {
                        /* TODO:
                         * make it so the card doesnt show/page refreshes when 
                         * fav coops is unfavorited
                         */
                        return <PropertyView data={cards} favCoops={true} login={login}/>
                        }
                    )
                }
            </Box>
        </Container>
    )
}

export default FavCoopPage;