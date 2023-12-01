import * as React from 'react';
import { Container, Box, Typography} from "@mui/material";
import { useState, useEffect } from "react";
import CoopmatesView from '../components/CoopmateView';

const MyCoopmatesPage = () => {
    const [userData, setUserData] = useState('');
    const [myCoopmates, setMyCoopmates] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [allCoopmates, setAllCoopmates] = React.useState([])
    const styles = {
        feed: {
            display: "flex",
            justifyContent: "center",
            maxWidth: "1200px",
            flexWrap: "wrap",
        },
        
    }
    React.useEffect(() => {
        const getAllCoopmates = async () => {
            const res = await fetch('http://localhost:8000/auth/coopmates')
            const getData = await res.json()
            const obj = JSON.parse(JSON.stringify(getData));
           // console.log(obj)
           // console.log(myCoopmates.map(coopmate => console.log(`myCoopmates: ${coopmate._id}`)))
           // console.log(obj.map(coopmate => console.log(`allCoopmates: ${coopmate._id}`)))
           // const filteredCoopmates = obj.filter(coopmate => myCoopmates.includes(coopmate.renterInfo._id));
            setAllCoopmates(obj);
        }
        //console.log(allCoopmates.map(coopmate => console.log(coopmate._id)))
        getAllCoopmates()
    }, [allCoopmates])

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
                //allCoopmates.map(mate => console.log("all ", mate._id.toString()))
                //obj.user.coopmates.map(mate => console.log("my ", mate._id.toString()))
                const favCoopmates = allCoopmates.filter(coopmateUnsaved =>
                    obj.user.coopmates.some(coopmateSaved => coopmateUnsaved._id.toString() === coopmateSaved._id.toString())
                );

                setMyCoopmates(favCoopmates);

                console.log(myCoopmates)
                setLoading(false);
            } catch (e) {
                console.log("error: " + e)
                
            }
        };

        getUserInfo();
    }, [myCoopmates]);

    //const filteredCoopmates = allCoopmates.filter(coopmate => myCoopmates.includes(coopmate._id));
    //setAllCoopmates(filteredCoopmates)

    return (
        <Container sx={{ width: '100%' }}>
            <Box sx={{ m: 1 }} style={styles.feed}>
       
                {
                    myCoopmates.length > 0 ? 
                    (
                        myCoopmates.map(coopmate => {
                            return <CoopmatesView coopmate={coopmate} coopmatesArr={myCoopmates} username={userData.username}
                            />;
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