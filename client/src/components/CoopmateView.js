import * as React from 'react';
import Button from '@mui/material/Button';
import { Box, Card, CardContent, CardMedia, IconButton, Tooltip, } from '@mui/material';
import { CardActionArea } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { AspectRatio } from '@mui/joy';
import Divider from '@mui/material/Divider';
import { Stack } from '@mui/material';
import { Link } from '@mui/material';
import imgExample from "../images/apartment-pic.jpg"
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import defaultPic from '../images/amongusturkey.jpeg'

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

const CoopmatesView = ({ data }) => {
    const [hovered, setHovered] = React.useState(false);
    const name = "John Doe"
    const age = "22"
    const gender = "Male"

    const handleHovered = () => {
        setHovered(true)
    }
    const handleLeave = () => {
        setHovered(false)
    }
    const styles = {
        divider: {
            height: "3px",
            backgroundColor: hovered === true ? "#f5ebe0" : "#AB191F",
            padding: "0",
            margin: "15px 0 15x 0",
        }
    }
    
    return (
        <React.Fragment>
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
                    <CardMedia
                        component="img"
                        image={defaultPic}
                        style={{
                            height: "130px",
                            width: "130px",
                            margin: "20px 50px 10px 50px",
                            borderRadius: "50%",
                            justifyContent: 'center',
                            border: hovered === true ? "5px solid #f5ebe0" : "5px solid #AB191F",
                            
                        }}
                    />

                    <CardContent sx={{alignContent:"center"}}>
                        <Box style={{ display: 'flex', alignItems: 'center', marginLeft: "25px"}}>
                            {/* Renter Name */}
                            <Typography 
                                variant="h6" 
                                style={{ margin: "-20px 25px 0px 0px" }} 
                                sx={{fontWeight: 600}}
                            > {name} 
                            </Typography> 
                            {/* Renter Age */}
                            <Typography 
                                variant="body1" 
                                style={{ margin: "-22px 20px -2px -10px", fontSize:"15pt" }} 
                                sx={{fontWeight: 500}}
                            > {age} 
                            </Typography>
                            {/* Renter Gender */}
                            {gender === 'Male' ? <MaleIcon style={{margin:"-22px 15px 0px -10px", fontSize: "22pt"}}/> : ''}
                            {gender === 'Female' ? <FemaleIcon style={{margin:"-22px 0px 0px -20px", fontSize: "22pt"}}/> : ''}
                            {gender === 'Transgender' ? <TransgenderIcon style={{margin:"-22px 0px 0px -20px", fontSize: "22pt"}}/> : ''}
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>
        </React.Fragment>
    );
}
export default CoopmatesView;