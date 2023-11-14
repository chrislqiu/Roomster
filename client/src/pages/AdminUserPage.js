import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogActions, Tooltip, IconButton, Avatar, InputBase, Slider, Select, MenuItem, Grid, Card, Container, Box, Typography, CardContent, Radio, Button, RadioGroup, FormControl, FormControlLabel, CardMedia } from "@mui/material";
import AdminUserView from '../components/AdminUserView'
import AdminUserPlaceholder from '../components/AdminUserPlaceholder';


const AdminUserPage = () => {
    const [renters, setRenters] = useState([]);
    const [managers, setManagers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const rentersData = await renterUsers();
            const managersData = await managerUsers();

            setRenters(rentersData);
            setManagers(managersData);
        };

        fetchUsers();
    }, []);

    const renterUsers = async () => {
        try {
            const response = await fetch('http://localhost:8000/auth/renters', {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                const renters = await response.json();
                console.log('Gathered renters');
                return renters;
            } else {
                console.log('Failed to gather renters');
                return [];
            }
        } catch (error) {
            console.error('Error gathering users:', error);
            return [];
        }
    };
    const managerUsers = async () => {
        try {
            const response = await fetch('http://localhost:8000/auth/managers', {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                const managers = await response.json();
                console.log('Gathered managers');
                return managers;
            } else {
                console.log('Failed to gather managers');
                return [];
            }
        } catch (error) {
            console.error('Error gathering users:', error);
            return [];
        }
    };


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
            <Typography sx={{ fontSize: "30px", textAlign: "center" }}>
                Users
            </Typography>
            <Box sx={{ m: 1 }} style={styles.feed}>
                {renters.length > 0 ? (
                    renters.map((renter) => (
                        <AdminUserView key={renter._id} username={renter.username} userType="Renter" />
                    ))
                ) : (
                    <AdminUserPlaceholder />
                )}

                {managers.length > 0 ? (
                    managers.map((manager) => (
                        <AdminUserView key={manager._id} username={manager.username} userType="Manager" />
                    ))
                ) : (
                    <AdminUserPlaceholder />
                )}
            </Box>
        </Container>
    );
}

export default AdminUserPage;