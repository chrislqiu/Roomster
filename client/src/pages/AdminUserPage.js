import React from 'react';
import { Dialog, DialogContent, DialogActions, Tooltip, IconButton, Avatar, InputBase, Slider, Select, MenuItem, Grid, Card, Container, Box, Typography, CardContent, Radio, Button, RadioGroup, FormControl, FormControlLabel, CardMedia } from "@mui/material";
import AdminUserView from '../components/AdminUserView'


const AdminUserPage = () => {
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
            <Box sx={{ m: 1 }} style={styles.feed}>
                <AdminUserView username="john@purdue.edu" userType="Renter" />
            </Box>
        </Container>
    );
}

export default AdminUserPage;