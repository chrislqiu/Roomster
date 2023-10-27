import React, { useEffect, useState } from "react";
import AdminLogin from "../components/AdminLogin";
import { Container, Box, Typography } from "@mui/material";

const AdminPage = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);

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

    return (
        <Container sx={{ width: '100%' }}>
            <Box sx={{ m: 1 }}>
                {isAuthorized ? (
                    <Typography>
                        Authorized
                    </Typography>
                ) : (
                    <AdminLogin />
                )}
            </Box>
        </Container>
    );
};

export default AdminPage;
