import React, { useEffect, useState } from "react";
import AdminLogin from "../components/AdminLogin";
import { Container, Box, Typography } from "@mui/material";
import PropertyViewMore from "../components/PropertyView";

const AdminPage = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);

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

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await fetch("http://localhost:8000/auth/authorize", {
                    method: "GET",
                    credentials: "include",
                });

                if (response.ok) {
                    setIsAuthorized(true);
                } else {
                    setIsAuthorized(false);
                }
            } catch (error) {
                console.error("Error:", error);
                setIsAuthorized(false);
            }
        };

        checkAuthentication();
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
            <Box sx={{ m: 1 }}>
                {isAuthorized ? (
                    <Container sx={{ width: '100%' }}>
                        <div sx={{ width: "100%"}}>
                            <Typography sx={{ fontSize: "30px", textAlign: "center"}}>
                                Unverified Properties
                            </Typography>
                        </div>

                        <Box sx={{ m: 1 }} style={styles.feed}>
                            {
                                /*
                                 * Maps each Property Information object to its own "card"
                                 */
                                //propertyInfo.map(cards => {
                                filteredPropertyInfo.map((cards) => {
                                    return <PropertyViewMore data={cards} login={true}  admin={true}/>
                                }
                                )
                            }
                        </Box>
                    </Container>
                ) : (
                    <AdminLogin />
                )}
            </Box>
        </Container>
    );
};

export default AdminPage;
