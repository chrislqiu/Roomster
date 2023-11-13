import * as React from 'react';
import { Container, Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import CoopmatesView from '../components/CoopmateView';

const CoopmatesPage = ({ }) => {
    const [allCoopmates, setAllCoopmates] = React.useState([])
    const [myCoopmates, setMyCoopmates] = React.useState([]);
    const [userData, setUserData] = React.useState('');
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
                setMyCoopmates(obj.user.coopmates);
                
            } catch (e) {
                console.log("error: " + e)
                
            }
        };

        getUserInfo();
    }, [ myCoopmates]);
    React.useEffect(() => {
        const getCoopmateInfo = async () => {
            const res = await fetch('http://localhost:8000/auth/coopmates')
            const getData = await res.json()
            const obj = JSON.parse(JSON.stringify(getData));
            setAllCoopmates(obj);
        }
        getCoopmateInfo()
    }, [allCoopmates])
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
            {console.log(userData.username)}
        <Box sx={{ m: 1 }} style={styles.feed}>
            {console.log(myCoopmates)}
              {
                    allCoopmates.length > 0 ? (
                        allCoopmates.map(coopmate => {
                            console.log(userData)
                            return <CoopmatesView coopmate={coopmate} coopmatesArr={myCoopmates} username={userData.username} userData={userData}/>;
                        })
                    ) : (
                        <Typography
                            sx={{
                                fontWeight: 600,
                                fontSize: 25,
                                color: "#AB191F",
                            }}
                        >
                            No Coopmates!
                        </Typography>
                    )
                }
        </Box>
    </Container>

    );
    
}
export default CoopmatesPage;