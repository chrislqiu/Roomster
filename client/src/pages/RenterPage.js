import { Dialog, DialogContent, DialogActions, Tooltip, IconButton, Avatar, InputBase, Slider, Checkbox, Grid, Card, Container, Box, Typography, CardContent, Input, Divider, TextField, Link, Button, FormControlLabel } from "@mui/material";
import Switch from '@mui/joy/Switch'
import React from "react"
import profilePic from "../images/profile-pic-no-shadow.png"
import greenChicken from "../images/chickens/green.png"
import redChicken from "../images/chickens/red.png"
import orangeChicken from "../images/chickens/orange.png"
import purpleChicken from "../images/chickens/purple.png"
import yellowChicken from "../images/chickens/yellow.png"
import blackChicken from "../images/chickens/black.png"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMars } from '@fortawesome/free-solid-svg-icons'
import { purple } from "@mui/material/colors";

const RenterPage = () => {

    const styles = {
        card: {
            backgroundColor: "#f5ebe0",
            color: "#AB191F",
            width: "800px",
            height: "355px",
            boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, .1)",
            margin: "-10px 0 20px 0"
        },
        column1: {
            float: "left", 
            width: "47%", 
            //background: "lightblue",
            borderRight: "3px solid #AB191F"
        },
        column2: {
            float: "left", 
            width: "50%", 
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
            padding: "0 20px 0 0"
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
        profilePicStyle: {
            width: "25%",
            "&:hover": {
                background: "#efefef"
            }
        }
    }
    const inputBaseSX = {
        margin: "0 0 10px 25px", 
        width:"300px", 
        height: "35px",
        borderRadius: "5px",
        border: "2px solid #AB191F",
        padding: "5px",
        "&:hover": {
            border: "2px solid #AB191F",
            boxShadow:"0px 0px 3px 3px rgba(0, 0, 0, .1)", 
        }
    }
    const sleepScheduleSX = {
        margin: "0 0 10px 25px", 
        width:"50px", 
        height: "30px",
        borderRadius: "5px",
        border: "2px solid #AB191F",
        padding: "5px",
        fontSize:"12pt",
        "&:hover": {
            border: "2px solid #AB191F",
            boxShadow:"0px 0px 3px 3px rgba(0, 0, 0, .1)", 
        },
        "& input::placeholder": {
            fontSize: "11pt"
        }
        
    }
    const [toggleOn, setToggleOn] = React.useState(false);
    const [hasPet, setHasPet] = React.useState(false);
    const [noPet, setNoPet] = React.useState(false);
    const [doesSmoke, setDoesSmoke] = React.useState(false);
    const [doesNotSmoke, setDoesNotSmoke] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [openMessage, setOpenMessage] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [profileImg, setProfileImg] = React.useState('');
    const [saveStatus1, setSaveStatus1] = React.useState(null);
    const [timeStart, setTimeStart] = React.useState('')
    const [timeEnd, setTimeEnd] = React.useState('')

    const handleSaveRight = () => {
        const emailRegex = /^[a-zA-Z0-9._-]+@purdue\.edu$/;
        if (!emailRegex.test(email)) {
            setSaveStatus1("Please enter a valid Purdue email address");
            return;
        } else if (timeStart === "" || timeEnd === "" || hasPet === noPet || doesSmoke === doesNotSmoke || email == "" || phone == "") {
            setSaveStatus1("One or more fields is empty!");
            return
        } else {
            setSaveStatus1("Save Success!")
        }
        var pets = hasPet === true ? true : false;
        var smoke = doesSmoke === true ? true : false;
        const dataToSend = {
            profilePic: profileImg,
            purdueEmail: email,
            phone: phone,
            pets: pets,
            smoke: smoke
        }
        fetch('http://localhost:8000/sendRenterProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        })
        .then(response => response.json())
        .then(data => {
            console.log('DATA SAVEDDDD: ', data.message);
        })
        .catch(error => {
            console.error('ERRORRR: ', error);
        });
    }

    const handleSaveLeft = () => {
        const emailRegex = /^[a-zA-Z0-9._-]+@purdue\.edu$/;
        console.log(timeStart)
        if (!emailRegex.test(email)) {
            setSaveStatus1("Please enter a valid Purdue email address");
            return;
        } else {
            setSaveStatus1("Save Success!")
        }

        const dataToSend = {
            profilePic: profileImg,
            purdueEmail: email,
            phone: phone
        }
        fetch('http://localhost:8000/sendRenterProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        })
        .then(response => response.json())
        .then(data => {
            console.log('DATA SAVEDDDD: ', data.message);
        })
        .catch(error => {
            console.error('ERRORRR: ', error);
        });

    }
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const handleOpenMessage = () => {
        setOpenMessage(true)
    }
    const handleCloseMessage = () => {
        setOpenMessage(false)
    }

    const setChicken = (chicken) => {
        profilePic = chicken;
        setOpen(false);
    }


    return (
        
        <Grid container spacing={0} direction="column" alignItems="center" justify="center">
            <Card
                variant='contained'
                style={styles.card}>
                <CardContent>
                <Box width='100%' style={styles.column1}>
                    <Typography style={styles.header}> 
                        {"USER INFORMATION"}
                    </Typography >
                    <Container style={styles.box}>
                        <Box sx={{ flexGrow: 0, margin: "15px 50px 20px 20px"}}>
                            <Tooltip title="Change Profile Picture" sx={{color: "#AB191F"}} onClick={handleOpen} >
                                <IconButton sx={{ p: 0, }} >
                                    <Avatar alt="chickenpfp" src={profilePic} style={{transform: `scale(1.90, 1.90)` }} />
                                </IconButton>
                            </Tooltip>
                        </Box>

                        <Typography style={Object.assign(styles.name, styles.boxPadding, {marginTop: "20px"})}> 
                            {"John Doe"}
                        </Typography >
                        <Typography style={Object.assign(styles.age, {padding: "0 10px 0 20px", marginTop: "20px"})}> 
                            {"22"}
                        </Typography >
                        <FontAwesomeIcon icon={faMars} style={Object.assign(styles.icon, {marginTop: "22px"})}/>
                    </Container>
                    <Typography style={styles.subheader}> 
                        {"Contact info"}
                    </Typography >
                    <InputBase placeholder="Purdue Email" id="email-textfield" sx={inputBaseSX}onChange={(e) => setEmail(e.target.value)}/>
                    <InputBase placeholder="Phone number" id="number-textfield" sx={inputBaseSX}onChange={(e) => setPhone(e.target.value)}/>
                    <Button variant="contained" style={{backgroundColor: "#AB191F", float: "right", margin: "0 35px 0 0"}} onClick={handleSaveLeft}>SAVE</Button>
                </Box>
                <Box width='100%' style={styles.column2}>
                    <Container style={styles.box}>
                        <Typography style={styles.header}> 
                            {"FINDING COOPMATES?"}
                        </Typography >
                        <Switch style={{verticalAlign:"center", marginTop:"2px"}}
                            color={toggleOn ? 'danger' : 'neutral'}
                            checked={toggleOn}
                            onChange={() => setToggleOn(!toggleOn)}
                        />
                    </Container>
                    {toggleOn &&
                    <Container style={styles.box} sx={{marginTop:"-10px"}}>
                        <Container style={{float: "left", width: "55%"}}>
                            <Typography style={styles.livingHabit}>{"Pets"}</Typography>
                            <Typography style={styles.livingHabit}>{"Smoke"}</Typography>
                            <Typography style={styles.livingHabit}>{"Studious"}</Typography>
                            <Typography style={styles.livingHabit}>{"Cleanliness"}</Typography>
                            <Typography style={styles.livingHabit}>{"Guests frequency"}</Typography>
                            <Typography style={styles.livingHabit}>{"Sleep schedule"}</Typography>
                        </Container>
                        <Container style={{float: "right", width: "45%"}}>
                            <Container style={{display:"inline-flex", justifyContent:"center"}}>
                                <FormControlLabel label="Yes" control={
                                    <Checkbox style={{}}
                                    checked={hasPet}
                                    onChange={() => setHasPet(!hasPet)}
                                    disabled={noPet === true ? true : false}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    sx={{color:"#AB191F",
                                        '&.Mui-checked': {
                                            color: "#AB191F",
                                        },}}
                                    />}
                                />
                                <FormControlLabel label="No" control={
                                    <Checkbox style={{}}
                                    checked={noPet}
                                    disabled={hasPet === true ? true : false}
                                    onChange={() => setNoPet(!noPet)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    sx={{color:"#AB191F",
                                        '&.Mui-checked': {
                                            color: "#AB191F",
                                        },}}
                                    />}
                                />
                            </Container>
                            <Container style={{display:"inline-flex", justifyContent:"center", marginTop:"-8px"}}>
                                <FormControlLabel label="Yes" control={
                                    <Checkbox style={{}}
                                    checked={doesSmoke}
                                    disabled={doesNotSmoke === true ? true : false}
                                    onChange={() => setDoesSmoke(!doesSmoke)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    sx={{color:"#AB191F",
                                        '&.Mui-checked': {
                                            color: "#AB191F",
                                        },}}
                                    />}
                                />
                                <FormControlLabel label="No" control={
                                    <Checkbox style={{}}
                                    checked={doesNotSmoke}
                                    disabled={doesSmoke === true ? true : false}
                                    onChange={() => setDoesNotSmoke(!doesNotSmoke)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    sx={{color:"#AB191F",
                                        '&.Mui-checked': {
                                            color: "#AB191F",
                                        },}}
                                    />}
                                />
                            </Container>
                            <Container>
                            <Slider
                                size="small"
                                defaultValue={3}
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={0}
                                max={5}
                                sx={{color:"#AB191F", width: "100px", height: "5px", marginLeft: "-40px"}}
                            />
                            </Container>
                            <Container>
                            <Slider
                                size="small"
                                defaultValue={3}
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={0}
                                max={5}
                                sx={{color:"#AB191F", width: "100px", height: "5px", marginLeft: "-40px"}}
                            />
                            </Container>
                            <Container>
                            <Slider
                                size="small"
                                defaultValue={3}
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={0}
                                max={5}
                                sx={{color:"#AB191F", width: "100px", height: "5px", marginLeft: "-40px"}}
                            />
                            </Container>
                            <Container style={{marginLeft: "-15px", marginTop:"-5px", width: "150px", display:"flex"}}>
                                <InputBase placeholder="From" onChange={(e)=>{setTimeStart(e.target.value)}} id="from-textfield" style={{marginLeft:"-25px"}}sx={sleepScheduleSX}/>
                                <InputBase placeholder="To" onChange={(e)=>{setTimeEnd(e.target.value)}} id="to-textfield" sx={sleepScheduleSX}/>
                            </Container>
                            <Button variant="contained" onClick={() => handleSaveRight()} style={{backgroundColor: "#AB191F", float: "right", margin: "0 0 0 0"}}>SAVE</Button>

                        </Container>
                    </Container>
                    }
                </Box>
                
                </CardContent>
                {saveStatus1 && ( <Container sx={{position:"relative", display:"-ms-flexbox", marginTop:"290px", textAlign:"center"}}>
                <p style={{color: '#AB191F'}}>{saveStatus1}</p></Container>
            )}
            </Card>
            <Dialog
                open={openMessage}
                onClose={handleCloseMessage}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "600px",
                            height: "200px",
                            backgroundColor: "#F6EBE1"
                        },
                    },
                }}
                
            ><DialogContent>{saveStatus1 && ( 
                <Typography style={{fontWeight: "600", fontSize: "15pt", color: "#AB191F", textAlign:"center", margin:"10px 0 -10px 0"}}> 
                        {saveStatus1}
                    </Typography >
                
            )}</DialogContent></Dialog>

            <Dialog
                open={open}
                onClose={handleClose}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "600px",
                            height: "200px",
                            backgroundColor: "#F6EBE1"
                        },
                    },
                }}
                
            ><DialogContent>
                <Typography style={{fontWeight: "600", fontSize: "15pt", color: "#AB191F", textAlign:"center", margin:"10px 0 -10px 0"}}> 
                        {"CHOOSE YOUR CHICKEN"}
                    </Typography >
                <Container sx={{display:"inline-flex", marginTop:"50px"}}>
                        <Tooltip onClick={() => {setChicken(blackChicken); setProfileImg(blackChicken)}}>
                            <IconButton sx={{ p: 0, marginRight:"50px"} } >
                                    <Avatar alt="blackChicken" src={blackChicken} style={{transform: `scale(1.90, 1.90)` }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip onClick={() => {setChicken(greenChicken); setProfileImg(greenChicken)}}>
                            <IconButton sx={{ p: 0, marginRight:"50px"}} >
                                <Avatar alt="greenChicken" src={greenChicken} style={{transform: `scale(1.90, 1.90)` }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip onClick={() => {setChicken(orangeChicken); setProfileImg(orangeChicken)}}>
                            <IconButton sx={{ p: 0, marginRight:"50px"}} >
                                <Avatar alt="orangeChicken" src={orangeChicken} style={{transform: `scale(1.90, 1.90)` }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip onClick={() => {setChicken(purpleChicken); setProfileImg(purpleChicken)}}>
                            <IconButton sx={{ p: 0, marginRight:"50px"}} >
                                <Avatar alt="purpleChicken" src={purpleChicken} style={{transform: `scale(1.90, 1.90)` }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip onClick={() => {setChicken(redChicken); setProfileImg(redChicken)}}>
                            <IconButton sx={{ p: 0, marginRight:"50px"}} >
                                <Avatar alt="redChicken" src={redChicken} style={{transform: `scale(1.90, 1.90)` }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip onClick={() => {setChicken(yellowChicken); setProfileImg(yellowChicken)}}>
                            <IconButton sx={{ p: 0}} >
                                <Avatar alt="yellowChicken" src={yellowChicken} style={{transform: `scale(1.90, 1.90)` }} />
                            </IconButton>
                        </Tooltip>
                        
                        
                        
                        
                        
                </Container>
                
            </DialogContent>
        <DialogActions>
            
        </DialogActions>
        </Dialog>
        </Grid>
        
        
    )
    
}

export default RenterPage;