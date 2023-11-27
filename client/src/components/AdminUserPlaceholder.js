import { Card, CardContent, CardMedia, CardActionArea, Divider } from '@mui/material';
import { Skeleton } from "@mui/joy";
import React, { useState, useEffect } from "react";

const AdminUserPlaceholder = () => {
    const [hovered, setHovered] = useState(false);
    const handleHovered = () => {
        setHovered(true)
    }
    const handleLeave = () => {
        setHovered(false)
    }
    return (<Card
        onMouseEnter={handleHovered}
        onMouseLeave={handleLeave}
        sx={{
            backgroundColor: "#f5ebe0",
            color: "#AB191F",
            width: "300px",
            height: "100px",
            marginBottom: "20px",
            marginRight: "20px",
            border: "none",
            borderRadius: "10px",
            boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, .1)",
        }}
    >
        <CardActionArea>
            <CardContent>
                <Skeleton variant="text" width={200} height={10} sx={{ marginTop: "5px" }} />
                <Skeleton variant="text" width={60} height={7} sx={{ marginTop: "5px" }} />

            </CardContent>
        </CardActionArea>
    </Card>)
}

export default AdminUserPlaceholder