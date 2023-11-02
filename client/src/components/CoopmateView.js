import { CardActionArea } from '@mui/material';

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

import {Dialog, DialogContent, DialogActions, Tooltip, IconButton, Avatar, InputBase, Slider, Select, MenuItem, Grid, Card, Container, Box, Typography, CardContent, Radio, Button, RadioGroup, FormControl, FormControlLabel, CardMedia } from "@mui/material";
import Switch from '@mui/joy/Switch'
import React from "react"
import profilePic from "../images/profile-pic-no-shadow.png"
import horse from "../images/chickens/horse.png"
import duck from "../images/chickens/duck.png"
import goose from "../images/chickens/goose.png"
import cow from "../images/chickens/cow.png"
import chicken from "../images/chickens/chicken.png"
import sheep from "../images/chickens/sheep.png"
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

const CoopmatesView = ({ data }) => {
    const [open, setOpen] = React.useState(false)
    const [hovered, setHovered] = React.useState(false);
    const name = "John Doe"
    const age = "22"
    const gender = "Male"

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

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
        },
        column1: {
            float: "left", 
            width: "47%", 
            borderRight: "3px solid #AB191F"
        },
        column2: {
            float: "left", 
            width: "50%", 
            marginLeft:"-30px"
            //backgroundColor: "lightgreen"
        },
        header: {
            margin: "10px 0 5px 0",
            fontWeight: "600",
            fontSize: "15pt",
            color: "#AB191F",
            padding: "0 25px",
        },
        box: {
            float: "left",
            width: "100%",
            height: "100%",
            display: "inline-flex",
            //backgroundColor: "blue"
        },
        boxPadding: {
            padding: "0 10px 0 0"
        },
        name: {
            fontWeight: "600",
            fontSize: "14pt",
            color: "black",
        },
        age: {
            fontWeight: "600",
            fontSize: "14pt",
            color: "#AB191F",
        },
        icon: {
            fontSize: "16pt",
            color: "#AB191F",
        },
        subheader: {
            fontWeight: "600", 
            fontSize: "14pt", 
            color: "#AB191F",
            padding: "0 0 0 25px",
            margin: "0 0 10px 0",
        },
        livingHabit: {
            margin: "10px 0 5px 0",
            fontSize: "12pt",
            color: "black"
        },
    }

    const inputBaseSX = {
        margin: "0 0 10px 25px", 
        width:"200px", 
        height: "35px",
        borderRadius: "5px",
        border: "2px solid #AB191F",
        padding: "5px",
        "&:hover": {
            border: "2px solid #AB191F",
            boxShadow:"0px 0px 3px 3px rgba(0, 0, 0, .1)", 
        }
    }
    
    return (
        <React.Fragment>
            {/* Coopmate Card View */}
            <Card
                variant='contained'
                alignContent='center'
                onClick={handleOpen}
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

            {/* Coopmate Detail View */}
            <Dialog 
                open={open}
                onClose={handleClose}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "70%",
                            maxWidth: 750,
                            maxHeight: 500,
                            backgroundColor: "#F6EBE1"
                        },
                    },
                }}
            >
                <DialogContent>
                    <Box width='100%' style={styles.column1}>
                        <Typography style={styles.header}> 
                            {"COOPMATE PROFILE"}
                        </Typography>
                        {/* profile picture, name, age, gender contact info */}
                        <Container style={styles.box}> 
                            <Box sx={{ flexGrow: 0, margin: "15px 50px 20px 20px"}}>
                                <IconButton sx={{ p: 0, }} >
                                    <Avatar alt="chickenpfp" src={profilePic} style={{transform: `scale(1.90, 1.90)` }} />
                                </IconButton>
                            </Box>

                            <Typography style={Object.assign(styles.name, styles.boxPadding, {marginTop: "20px"})}> 
                                {name}
                            </Typography >
                            <Typography style={Object.assign(styles.age, {padding: "0 10px 0 20px", marginTop: "20px"})}> 
                                {age}
                            </Typography >
                            {/* Renter Gender */}
                            {gender === 'Male' ? <MaleIcon style={{fontSize: "16pt", color: "#AB191F", marginTop:"20px"}}/> : ''}
                            {gender === 'Female' ? <FemaleIcon style={{fontSize: "16pt", color: "#AB191F", marginTop:"20px"}}/> : ''}
                            {gender === 'Transgender' ? <TransgenderIcon style={{fontSize: "16pt", color: "#AB191F", marginTop:"20px"}}/> : ''}
                        </Container>

                        <Typography style={styles.subheader}> 
                            {"Contact info"}
                        </Typography >
                        <InputBase placeholder="Purdue Email" id="email-textfield" sx={inputBaseSX} disabled="true"/>
                        <InputBase placeholder="Phone number" id="number-textfield" sx={inputBaseSX} disabled="true"/>    

                        
                    </Box>
                    <Box width='100%' style={styles.column2}>
                        <Container style={styles.box}>
                            <Typography style={styles.header}> 
                                {"LIVING PREFERENCES"}
                            </Typography >
                        </Container>
                        <Container style={styles.box} sx={{marginTop:"-10px", marginLeft:"-67px"}}>
                            <Container style={{float: "left", width: "55%"}}>
                                <Typography style={styles.livingHabit}>{"Pets"}</Typography>
                                <Typography style={styles.livingHabit}>{"Smoke"}</Typography>
                                <Typography style={styles.livingHabit}>{"Studious"}</Typography>
                                <Typography style={styles.livingHabit}>{"Cleanliness"}</Typography>
                                <Typography style={styles.livingHabit}>{"Guests frequency"}</Typography>
                                <Typography style={styles.livingHabit}>{"Sleep schedule"}</Typography>
                            </Container>
                        </Container>

                    </Box>

                </DialogContent>

            </Dialog>
        </React.Fragment>
    );
}
export default CoopmatesView;