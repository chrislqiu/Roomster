import * as React from 'react';
import { Container, Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import CoopmatesView from '../components/CoopmateView';
import FavoriteCoopmates from '../components/FavoriteCoopmate';
import CardPlaceholder from '../components/CardPlaceholder';
import { faV } from '@fortawesome/free-solid-svg-icons';

const CoopmatesPage = ({ }) => {
    const [allCoopmates, setAllCoopmates] = React.useState([])
    const [myCoopmates, setMyCoopmates] = React.useState([]);
    const [userData, setUserData] = React.useState('');
    const [loading, setLoading] = useState(true); // Add loading state

    React.useEffect(() => {
        const getAllCoopmates = async () => {
            const res = await fetch('http://localhost:8000/auth/coopmates')
            const getData = await res.json()
            const obj = JSON.parse(JSON.stringify(getData));
           // console.log(obj)
           // console.log(myCoopmates.map(coopmate => console.log(`myCoopmates: ${coopmate._id}`)))
           // console.log(obj.map(coopmate => console.log(`allCoopmates: ${coopmate._id}`)))
           
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

                const favCoopmates = allCoopmates.filter(coopmateUnsaved =>
                    obj.user.coopmates.some(coopmateSaved => coopmateUnsaved.renterInfo._id.toString() === coopmateSaved._id.toString())
                );
                
                setMyCoopmates(favCoopmates);
                setLoading(false);
                console.log(myCoopmates)
             
            } catch (e) {
                console.log("error: " + e)
                
            }
        };

        getUserInfo();
    }, [myCoopmates]);
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
            <Box sx={{ m: 4 }} style={styles.feed}>
            {
                <FavoriteCoopmates coopmateArr={myCoopmates} username={userData.username} userData={userData} style={styles.feed}  loading={loading}/> 
               }
            </Box>
        <Box sx={{ m: 1 }} style={styles.feed}>
              { loading === false  ? 
                    (allCoopmates.length > 0 ? (
                        allCoopmates.filter(coopmates => coopmates._id.toString() !== userData.user._id.toString()).map(coopmate => {
                           // console.log(userData)
                            return <CoopmatesView coopmate={coopmate} coopmatesArr={myCoopmates} username={userData.username} userData={userData}/>;
                        })
                    ) : (

                    <Box>
                       
                        <Typography
                    variant="h5"
                    color="#AB191F"
                    sx={{ m: 10, textAlign: 'center' }}
                    fontWeight={500}
                >
                            No Coopmates!
                        </Typography>
                        </Box>
                    ))
                    :
                    <Box>
                        <CardPlaceholder isCoopmateCard={true}/>
                    </Box>

                }
        </Box>
    </Container>

    );
    
}
export default CoopmatesPage;