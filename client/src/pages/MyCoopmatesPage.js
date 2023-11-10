import * as React from 'react';
import { Container, Box, Typography} from "@mui/material";
import { useState, useEffect } from "react";
import CoopmatesView from '../components/CoopmateView';

const MyCoopmatesPage = () => {
    const [userData, setUserData] = useState('');
    const [coopmates, setMyCoopmates] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const styles = {
        feed: {
            display: "flex",
            justifyContent: "center",
            maxWidth: "1200px",
            flexWrap: "wrap",
        },
        
    }
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
                setUserData(obj);
                if(obj.user.renterInfo){
                    setMyCoopmates(obj.user.coopmates);
                }
                setLoading(false);
            } catch (e) {
                console.log("error: " + e)
                
            }
        };

        getUserInfo();
    }, [userData, coopmates]);

    return (
        <Container sx={{ width: '100%' }}>
            <Box sx={{ m: 1 }} style={styles.feed}>
                {
                    coopmates.length > 0 ? (
                        coopmates.map(coopmate => {
                            return <CoopmatesView coopmate={coopmate} coopmateArr={coopmates} username={userData.username}/>;
                        })
                    ) : (
                        <Typography
                            sx={{
                                fontWeight: 600,
                                fontSize: 25,
                                color: "#AB191F",
                            }}
                        >
                            No Coopmates saved!
                        </Typography>
                    )
                }
            </Box>
        </Container>
    )
}
export default MyCoopmatesPage