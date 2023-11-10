import { Card, CardContent, CardMedia, CardActionArea, Divider} from '@mui/material';
import { Skeleton } from "@mui/joy";
import React, { useState, useEffect } from "react";

const CardPlaceholder = () => {
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
        width: "250px",
        height: "300px",
        marginBottom: "20px",
        marginRight: "20px",
        border: "none",
        borderRadius: "10px",
        boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, .1)",
      }}
    >
      <CardActionArea>
        <Skeleton variant="rectangular" width={"230px"} height={"130px"} sx={{margin: "10px",borderRadius: "5px", color: "#AB191F",}}/>
        <CardContent>
          <div style={{ display: "flex", alignItems: "center", marginLeft: 0 }}>
            <Skeleton variant="rectangular" width={350} height={23} sx={{marginTop: "-15px"}}/>
            <Skeleton variant="rectangular" width={100} sx={{marginTop: "15px"}}/>
          </div>
          <Skeleton variant="text" width={200} height={7} sx={{marginTop: "5px"}}/>
          <Skeleton variant="text" width={200} height={5} sx={{marginTop: "5px"}}/>
          <Skeleton variant="text" width={200} height={5}/>
          <Skeleton variant="text" width={220} height={3} sx={{marginTop: "5px"}}/>
          <Skeleton variant="text" width={120} height={20}style={{marginTop: "5px", textAlign: "right"}} sx={{marginLeft: "100px", textAlign: "right"}}/>
        </CardContent>
      </CardActionArea>
    </Card>)
}

export default CardPlaceholder