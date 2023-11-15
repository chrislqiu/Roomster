import { Card, CardContent, CardMedia, CardActionArea, Divider, Box} from '@mui/material';
import { Skeleton } from "@mui/joy";
import React, { useState, useEffect } from "react";

const CardPlaceholder = ({isCoopmateCard}) => {
    const [hovered, setHovered] = useState(false);
    const handleHovered = () => {
        setHovered(true)
    }
    const handleLeave = () => {
        setHovered(false)
    }
    return (
    isCoopmateCard ?
    <Card
                variant='contained'
                alignContent='center'
                //onClick={handleOpen}
                onMouseEnter={handleHovered}
                onMouseLeave={handleLeave}
                sx={{
                    ":hover": {
                        bgcolor: "#AB191F",
                        color: "#f5ebe0",
                        cursor: "pointer",
                    },
                    backgroundColor: "#f5ebe0",
                    color: "#AB191F",
                    width:  "250px",
                    height: "225px",
                    marginBottom: "20px",
                    marginRight: "20px",
                    marginLeft:"20px",
                    borderRadius: "10px",
                    boxShadow:  "0px 0px 3px 3px rgba(0, 0, 0, .1)"
                }}>
                <CardActionArea sx={{alignContent:"center"}}>
                    {/* Profile Picture */}
                    <Skeleton variant="circular" width={100} style={{height: "130px",
                            width: "130px",
                            margin: "20px 50px 10px 50px",
                            borderRadius: "50%",
                            justifyContent: 'center',
                            border: hovered === true ? "5px solid #f5ebe0" : "5px solid #AB191F",
                          }}
                            sx={{marginTop: "15px"}}
                            />
                    <CardContent sx={{alignContent:"center"}}>
                        <Box style={{ display: 'flex', alignItems: 'center', marginLeft: "25px"}}>
                            {/* Renter Name */}
                            <Skeleton variant="text" width={200} style={{margin: "-20px 18px 0px 0px"}} height={40} sx={{marginTop: "5px"}}/>
                            {/* Renter Age */}
                            <Skeleton variant="text" width={125} style={{ margin: "-22px 18px -2px -10px"}}height={40} sx={{marginTop: "5px"}}/>
                            {/* Renter Gender */}
                            <Skeleton variant="rectangular" width={100} style={{ margin:"-22px 15px 22px -10px"}}height={40} sx={{marginTop: "5px"}}/>
                           
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>
    :
    <Card
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
    </Card>
    
    )
}

export default CardPlaceholder