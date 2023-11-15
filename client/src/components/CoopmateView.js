import { CardActionArea, TextField } from '@mui/material';

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
import { faTruckPlane } from '@fortawesome/free-solid-svg-icons';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';

const CoopmatesView = ({ data }) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false)
    const [hovered, setHovered] = React.useState(false);

    /* TODO: Pull this data from database */
    const name = "John Doe"
    const age = "22"
    const email = "john.doe@purdue.edu"
    const phoneNumber = "(847) 129 3801"
    const gender = "Male"
    const pets = true
    const smoke = false
    const studious = 3
    const cleanliness = 4
    const guests = 1
    const fromTime = "12 AM"
    const toTime = "8 AM"

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
            backgroundColor: hovered === true ? "primaryColor" : "secondaryColor",
            padding: "0",
            margin: "15px 0 15x 0",
        },
        column1: {
            float: "left", 
            width: "47%", 
        },
        column2: {
            float: "left", 
            width: "50%", 
            borderLeft: "3px solid",
            borderColor: "secondaryColor"
        },
        header: {
            margin: "10px 0 5px 0",
            fontWeight: "600",
            fontSize: "15pt",
            color: theme.palette.type === "light" ? "secondaryColor" : "textColor",
            padding: "0 25px",
        },
        body:{
            width:"40px",
            justifyContent:"center",
            fontSize: "10pt",
            fontWeight:"450",
            color:"textColor",
            marginTop:"32px",
            marginLeft:"5px",
        },
        times: {
            width:"200px",
            textAlign:"center",
            fontSize: "10pt",
            fontWeight:"550",
            color:"textColor",
            marginTop:"32px",
            marginLeft:"-10px",
            backgroundColor: "secondaryColor",
            borderRadius: "5px",
            borderWidth: "2px",
            borderStyle: "solid",
            borderColor: theme.palette.type === "light" ? "secondaryColor" : "textColor",
            "&:hover": {
                border: "2px solid #AB191F",
                boxShadow:"0px 0px 3px 3px rgba(0, 0, 0, .1)", 
            }
        },
        contact: {
            margin: "0 0 10px 25px", 
            width:"185px", 
            height: "20px",
            borderRadius: "5px",
            border: "2px solid",
            borderColor: "secondaryColor",
            padding: "5px",
            color: "textColor"
        },
        box: {
            float: "left",
            width: "100%",
            height: "100%",
            display: "inline-flex",
        },
        boxPadding: {
            padding: "0 10px 0 0"
        },
        text: {
            fontWeight: "600",
            fontSize: "13pt",
        },
        icon: {
            fontSize: "16pt",
            color: "#AB191F",
        },
        subheader: {
            fontWeight: "600", 
            fontSize: "14pt", 
            color: "secondaryColor",
            padding: "0 0 0 25px",
            margin: "0 0 10px 0",
        },
        livingHabit: {
            margin: "10px 0 5px 0",
            fontSize: "12pt",
            color: "textColor"
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

    const radioSX = {
        color: "secondaryColor",
        '&.Mui-checked': {
        color: "secondaryColor",
        },
    }

    const selectSX = {
        width: 90, height: 30, fontSize:"11pt", 
        '.MuiOutlinedInput-notchedOutline': {
            border:"2px solid #AB191F"
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border:"2px solid #AB191F"
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
                        bgcolor: "secondaryColor",
                        color: theme.palette.type === 'light' ? "primaryColor" : "textColor",
                        cursor: "pointer",
                    },
                    backgroundColor: "primaryColor",
                    boxShadow: theme.palette.type === 'light' ? "0px 0px 3px 3px rgba(0, 0, 0, .1)" : "0px 0px 3px 3px rgba(245, 235, 224, .1)", 
                    color: theme.palette.type === 'light' ? "secondaryColor" : "textColor",
                    width:  "250px",
                    height: "225px",
                    margin: "0 20px 20px 20px",
                    borderRadius: "10px",
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
                            borderWidth: "5px",
                            borderStyle: "solid",
                            borderColor: hovered === true ? "primaryColor" : (theme.palette.type === "light" ? "secondaryColor" : "textColor"),
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
                            backgroundColor: "primaryColor",
                            boxShadow: theme.palette.type === 'light' ? "0px 0px 3px 3px rgba(0, 0, 0, .1)" : "0px 0px 3px 3px rgba(245, 235, 224, .1)",
                        },
                    },
                }}
            >
                <DialogContent>
                    <Box width='100%' sx={styles.column1}>
                        <Typography sx={styles.header}> 
                            {"COOPMATE PROFILE"}
                        </Typography>
                        {/* profile picture, name, age, gender contact info */}
                        <Container sx={styles.box}> 
                            <Box sx={{ flexGrow: 0, margin: "15px 20px 20px 20px",}}>
                                <IconButton sx={{ p: 0, }} >
                                    <Avatar alt="chickenpfp" src={profilePic} style={{transform: `scale(1.90, 1.90)` }} />
                                </IconButton>
                            </Box>

                            <Typography color="textColor" style={Object.assign(styles.text, styles.boxPadding, {marginTop: "20px"})}> 
                                {name}
                            </Typography >
                            <Typography color="secondaryColor" style={Object.assign(styles.text, {padding: "0 10px 0 20px", marginTop: "20px"})}> 
                                {age}
                            </Typography >
                            {/* Renter Gender */}
                            {gender === 'Male' ? <MaleIcon sx={{fontSize: "16pt", color: "secondaryColor", marginTop:"20px"}}/> : ''}
                            {gender === 'Female' ? <FemaleIcon sx={{fontSize: "16pt", color: "secondaryColor", marginTop:"20px"}}/> : ''}
                            {gender === 'Transgender' ? <TransgenderIcon sx={{fontSize: "16pt", color: "seconaryColor", marginTop:"20px"}}/> : ''}
                        </Container>

                        <Typography sx={styles.subheader}> 
                            {"Contact info"}
                        </Typography >
                        <Typography sx={styles.contact}>
                            {email}
                        </Typography>
                        <Typography sx={styles.contact}>
                            {phoneNumber}
                        </Typography>
                    </Box>
                    <Box width='100%' sx={styles.column2}>
                        <Container sx={styles.box}>
                            <Typography sx={styles.header}> 
                                {"LIVING PREFERENCES"}
                            </Typography >
                        </Container>
                        <Container style={styles.box} sx={{marginTop:"-10px"}}>
                            <Container style={{float: "left", width: "55%"}}>
                                <Typography sx={styles.livingHabit}>{"Pets"}</Typography>
                                <Typography sx={styles.livingHabit}>{"Smoke"}</Typography>
                                <Typography sx={styles.livingHabit}>{"Studious"}</Typography>
                                <Typography sx={styles.livingHabit}>{"Cleanliness"}</Typography>
                                <Typography sx={styles.livingHabit}>{"Guests frequency"}</Typography>
                                <Typography sx={styles.livingHabit}>{"Sleep schedule"}</Typography>
                            </Container>
                            <Container style={{float: "right", width: "45%"}}>
                                {/* Pet */}
                                <FormControl style={{marginLeft:"-55px", marginBottom:"-7px"}} disabled={true}>
                                    <RadioGroup row name="pets" style={{width: "150px", display: "flex", justifyContent:"center"}} > 
                                        <FormControlLabel checked={pets === true} value="yes" control={<Radio sx={radioSX}/>} label="Yes"/>
                                        <FormControlLabel checked={pets === false}value="no" control={<Radio sx={radioSX}/>} label="No"/>
                                    </RadioGroup>
                                </FormControl>
                                {/* Smoke */}
                                <FormControl style={{marginLeft:"-55px", marginBottom: "-7px"}} disabled={true}>
                                    <RadioGroup row name="smoke" style={{width: "150px", display: "flex", justifyContent:"center"}}> 
                                        <FormControlLabel checked={smoke === true} value="yes" control={<Radio sx={radioSX}/>} label="Yes"/>
                                        <FormControlLabel checked={smoke === false} value="no" control={<Radio sx={radioSX}/>} label="No"/>
                                    </RadioGroup>
                                </FormControl>
                                <Container>
                                    {/* Studious */}
                                    <Slider
                                        size="small"
                                        defaultValue={studious}
                                        valueLabelDisplay="auto"
                                        step={1}
                                        marks
                                        min={0}
                                        max={5}
                                        sx={{color:"#AB191F", width: "120px", height: "5px", marginLeft: "-70px"}}
                                        disabled={true}
                                    />
                                </Container>
                                <Container>
                                    {/* Cleanliness */}
                                    <Slider
                                        size="small"
                                        defaultValue={cleanliness}
                                        valueLabelDisplay="auto"
                                        step={1}
                                        marks
                                        min={0}
                                        max={5}
                                        sx={{color:"#AB191F", width: "120px", height: "5px", marginLeft: "-70px"}}
                                        disabled={true}
                                    />
                                </Container>
                                <Container>
                                    {/* Guests */}
                                    <Slider
                                        size="small"
                                        defaultValue={guests}
                                        valueLabelDisplay="auto"
                                        step={1}
                                        marks
                                        min={0}
                                        max={5}
                                        sx={{color:"#AB191F", width: "120px", height: "5px", marginLeft: "-70px"}}
                                        disabled={true}
                                    />
                                </Container>
                                <Container style={{display: "flex", gap: "1rem", width: "200px", margin:"0 0 10px -50px", padding:"0"}}>
                                    {/* <InputBase placeholder="From" sx={inputBaseSX} disabled="true"/> */}
                                    <Typography
                                        //variant='button'
                                        style={styles.body}>
                                        From
                                    </Typography>
                                    {/* From time */}
                                    <Typography
                                        //variant='button'
                                        style={styles.times}>
                                        {fromTime}
                                    </Typography>
                                    <Typography
                                        //variant='button'
                                        style={styles.body}>
                                        To
                                    </Typography>
                                    {/* To time */}
                                    <Typography
                                        style={styles.times}>
                                        {toTime}
                                    </Typography>

                                </Container>

                            </Container>
                            
                        </Container>

                    </Box>

                </DialogContent>

            </Dialog>
        </React.Fragment>
    );
}
export default CoopmatesView;