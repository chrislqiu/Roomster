import React, { useState, useEffect } from "react";
import { Container, Box, Typography, CircularProgress } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PropertyView from "../components/PropertyView";
import { faWindowRestore } from "@fortawesome/free-solid-svg-icons";
import CardPlaceholder from "../components/CardPlaceholder";

const FavCoopPage = ({ login }) => {
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState('');
    const [favCoopsArr, setFavCoopsArr] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const res = await fetch('http://localhost:8000/auth/current-user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });
                
                const getData = await res.json();
                
                const obj = JSON.parse(JSON.stringify(getData));
                setUsername(obj.username);
                setUserData(obj);
                if(obj.user.renterInfo){
                    setFavCoopsArr(obj.user.renterInfo.favCoops);
                }
                setLoading(false);
            } catch (e) {
                console.log("error: " + e)
                
            }
        };

        getUserInfo();
    }, [userData, favCoopsArr]);

    const styles = {
        feed: {
            display: "flex",
            justifyContent: "center",
            maxWidth: "1200px",
            flexWrap: "wrap",
        },
        loadingSpinner: {
            color: "secondaryColor", // Change the color here
        },
    };

    return (
        <Container sx={{ width: '100%' }}>
            <Box sx={{ marginTop: 3 }} style={styles.feed}>
                {loading ? ( // Display loading spinner while loading
                    <div style={styles.feed}>
                    {
                        /*
                         * TODO:
                         * add a full screen of placeholders
                         */
                    }
                        <CardPlaceholder isCoopmateCard={false}/>
                        <CardPlaceholder isCoopmateCard={false}/>
                        <CardPlaceholder isCoopmateCard={false}/>
                        <CardPlaceholder isCoopmateCard={false}/>
                        <CardPlaceholder isCoopmateCard={false}/>
                        <CardPlaceholder isCoopmateCard={false}/>
                        <CardPlaceholder isCoopmateCard={false}/>
                        <CardPlaceholder isCoopmateCard={false}/>
                        
                    </div> 
                ) : (
                    favCoopsArr.length > 0 ? (
                        favCoopsArr.map(cards => {
                            return <PropertyView data={cards} favCoops={true} login={login} />;
                        })
                    ) : (
                        <Typography
                            sx={{
                                fontWeight: 600,
                                fontSize: 25,
                                color: "secondaryColor",
                            }}
                        >
                            No properties favorited!
                        </Typography>
                    )
                )}
            </Box>
        </Container>
    );
};

export default FavCoopPage;
