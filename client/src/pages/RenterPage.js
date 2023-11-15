import { Switch, Dialog, DialogContent, DialogActions, Tooltip, IconButton, Avatar, InputBase, TextField, Slider, Select, MenuItem, Grid, Card, Container, Box, Typography, CardContent, Radio, Button, RadioGroup, FormControl, FormControlLabel } from "@mui/material";
import React from "react"
import profilePic from "../images/profile-pic-no-shadow.png"
import horse from "../images/chickens/horse.png"
import duck from "../images/chickens/duck.png"
import goose from "../images/chickens/goose.png"
import cow from "../images/chickens/cow.png"
import chicken from "../images/chickens/chicken.png"
import sheep from "../images/chickens/sheep.png"
import toast, { Toaster } from 'react-hot-toast';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMars } from '@fortawesome/free-solid-svg-icons'
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';

const RenterPage = () => {
    const theme = useTheme();
    const customToastStyles = {
        color: 'white', // Set the desired text color
      };

    const styles = {
        card: {
            backgroundColor: "primaryColor",
            boxShadow: theme.palette.type === 'light' ? "0px 0px 3px 3px rgba(0, 0, 0, .1)" : "0px 0px 3px 3px rgba(245, 235, 224, .1)", 
            width: "800px",
            height: "355px",
            margin: "-10px 0 20px 0"
        },
        column1: {
            float: "left", 
            width: "47%", 
            borderRight: "3px solid",
            borderColor: "secondaryColor"
        },
        column2: {
            float: "left", 
            width: "50%", 
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
        },
        boxPadding: {
            padding: "0 20px 0 0"
        },
        name: {
            fontWeight: "600",
            fontSize: "14pt",
            color: "textColor",
        },
        age: {
            fontWeight: "600",
            fontSize: "14pt",
            color: "secondaryColor",
        },
        icon: {
            fontSize: "18pt",
            color: "secondaryColor",
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
        profilePicStyle: {
            width: "25%",
            "&:hover": {
                background: "textColor"
            }
        }
    }
    const inputBaseSX = {
        margin: "0 0 10px 25px", 
        width:"300px", 
        height: "35px",
        borderRadius: "5px",
        border: "2px solid",
        borderColor: "secondaryColor",
        padding: "5px",
        "&:hover": {
            border: "2px solid",
            borderColor: "secondaryColor",
            boxShadow:"0px 0px 3px 3px rgba(0, 0, 0, .1)", 
        }
    }
    const sleepScheduleSX = {
        margin: "0 0 10px 25px", 
        width:"50px", 
        height: "30px",
        borderRadius: "5px",
        border: "2px solid",
        borderColor: "secondaryColor",
        padding: "5px",
        fontSize:"12pt",
        "&:hover": {
            border: "2px solid",
            borderColor: "secondaryColor",
            boxShadow:"0px 0px 3px 3px rgba(0, 0, 0, .1)", 
        },
        "& input::placeholder": {
            fontSize: "11pt"
        }
    }
    const radioSX = {
        color: "secondaryColor",
        '&.Mui-checked': {
        color: "secondaryColor",
        },
    }
    const selectSX = {
        width: 90, height: 30, fontSize:"11pt", color: "textColor",
        '.MuiOutlinedInput-notchedOutline': {
            border: "2px solid",
            borderColor: "secondaryColor",
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: "2px solid",
            borderColor: "secondaryColor",
        },
        '&.Mui-hovered .MuiOutlinedInput-notchedOutline': {
            border: "2px solid",
            borderColor: "secondaryColor",
        }
    }
    const textfieldSX = {
        margin: "0 0 10px 25px", 
        width:"280px", 
        borderRadius: "5px",
        border: "2px solid",
        borderColor: "secondaryColor",
        input: {
            color: "textColor",
            "&::placeholder": {
                opacity: 0.7,
                color: "textColor",
                },
        },
        "& fieldset": { border: 'none', },
        "&:hover" : {boxShadow: theme.palette.type === 'light' ? "0px 0px 3px 3px rgba(0, 0, 0, .1)" : "0px 0px 3px 3px rgba(245, 235, 224, .1)",}       
    }
    const [toggleOn, setToggleOn] = React.useState(false);
    const [hasPet, setHasPet] = React.useState(null);
    const [doesSmoke, setDoesSmoke] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [openMessage, setOpenMessage] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [profileImg, setProfileImg] = React.useState('');
    const [disableButton, setDisableButton] = React.useState(true);
    const [sleepFrom, setSleepFrom] = React.useState('');
    const [sleepTo, setSleepTo] = React.useState('');
    const [studious, setStudious] = React.useState('')
    const [cleanliness, setCleanliness] = React.useState('')
    const [guestFreq, setGuestFreq] = React.useState('')

    const handleSleepFrom = (event) => {
      setSleepFrom(event.target.value);
    };
    const handleSleepTo = (event) => {
        setSleepTo(event.target.value);
      };
    const handleSaveRight = () => {
        const emailRegex = /^[a-zA-Z0-9._-]+@purdue\.edu$/;

        if (sleepFrom === '' || sleepTo === '' || email === '' || phone === '' || hasPet === null || doesSmoke === null) {
            toast.error("Please fill in all the fields!", {style: customToastStyles});
            return
        } else if (!emailRegex.test(email)) {
            toast.error("Please enter a valid Purdue email address", {style: customToastStyles});
            return;
        } else {
            toast.success("Save Success!", {style: customToastStyles})
        }

        const dataToSend = {
            findingCoopmates: toggleOn,
            renterInfo: {
                name: name,
                age: age,
                email: email,
                phone: phone,
                pfp: profileImg,
                livingPreferences: {
                    pets: hasPet,
                    smoke: doesSmoke,
                    studious: studious,
                    cleanliness: cleanliness,
                    guestFreq: guestFreq,
                    sleepSchedule: {
                        from: sleepFrom,
                        to: sleepTo
                    }
                }
            }
        }

        fetch('http://localhost:8000/sendRenterProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
            credentials: 'include'
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

        if (email === '' || phone === '') {
            toast.error("Please fill in all the fields!"+sleepFrom, {style: customToastStyles})
            return;
        }   else if (!emailRegex.test(email)) {
            toast.error("Please enter a valid Purdue email address", {style: customToastStyles});
            return;
        } else {
            toast.success("Save Success!", {style: customToastStyles})
        }

        const dataToSend = {
            findingCoopmates: toggleOn,
            renterInfo: {
                name: name,
                age: age,
                email: email,
                phone: phone,
                pfp: profileImg,
                livingPreferences: {
                    pets: hasPet,
                    smoke: doesSmoke,
                    studious: studious,
                    cleanliness: cleanliness,
                    guestFreq: guestFreq,
                    sleepSchedule: {
                        from: sleepFrom,
                        to: sleepTo
                    }
                }
            }
        }
        fetch('http://localhost:8000/sendRenterProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
            credentials: 'include'
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

    const name = "John Doe"
    const age = "22"

    return (
        
        <Grid container spacing={0} direction="column" alignItems="center" justify="center">
            <Card
                variant='contained'
                sx={styles.card}>
                <CardContent>
                <Box width='100%' sx={styles.column1}>
                    <Typography sx={styles.header}> 
                        {"USER INFORMATION"}
                    </Typography >
                    <Container sx={styles.box}>
                        <Box sx={{ flexGrow: 0, margin: "15px 50px 20px 20px"}}>
                            <Tooltip title="Change Profile Picture" onClick={handleOpen} 
                            componentsProps={{
                                tooltip: {
                                    sx: {
                                        bgcolor: theme.palette.type === "light" ? 'rgba(171, 25, 31, 0.9)' : "rgba(245, 235, 224, .8)",
                                        color: "primaryColor"
                                    },
                                },
                            }}>
                                <IconButton sx={{ p: 0, }} >
                                    <Avatar alt="chickenpfp" src={profilePic} style={{transform: `scale(1.90, 1.90)` }} />
                                </IconButton>
                            </Tooltip>
                        </Box>

                        <Typography sx={styles.name} style={Object.assign(styles.boxPadding, {marginTop: "20px"})}> 
                            {name}
                        </Typography >
                        <Typography sx={styles.age} style={{padding: "0 10px 0 20px", marginTop: "20px"}}> 
                            {age}
                        </Typography >
                        <MaleIcon icon={faMars} sx={styles.icon} style={{marginTop: "22px"}}/>
                    </Container>
                    <Typography sx={styles.subheader}> 
                        {"Contact info"}
                    </Typography >
                    <TextField
                            placeholder="Purdue Email" id="email-textfield" variant="outlined" 
                            sx={textfieldSX} size="small"
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={disableButton}
                    />
                    <TextField
                            placeholder="Phone number" id="number-textfield" variant="outlined" 
                            sx={textfieldSX} size="small"
                            onChange={(e) => setPhone(e.target.value)}
                            disabled={disableButton}
                    />
                    
                    <Button variant="contained"
                        sx={{
                            ":hover": {
                                backgroundColor: "secondaryColor", border: "none",
                                boxShadow: theme.palette.type === 'light' ? "0px 0px 3px 3px rgba(0, 0, 0, .1)" : "0px 0px 3px 3px rgba(245, 235, 224, .1)",
                            },
                            border: "none",
                            backgroundColor: "secondaryColor", 
                            color: theme.palette.type === "light" ? "primaryColor" : "textColor",
                            fontWeight: 600, marginRight: "10px",
                            justifyContent: "center", float: "right",
                            visibility: toggleOn ? "hidden" : "visible"
                        }}
                        onClick={() => {
                            if (disableButton) {
                            // Enable edit mode
                            setDisableButton(false);
                            } else {
                            // Save changes and disable edit mode
                            handleSaveLeft();
                            setDisableButton(true);
                            }  
                        }}>
                        {disableButton ? 'Edit' : 'Save'}
                    </Button>
                </Box>
                <Box width='100%' sx={styles.column2}>
                    <Container sx={styles.box}>
                        <Typography sx={styles.header}> 
                            {"FINDING COOPMATES?"}
                        </Typography >
                        <Switch
                            sx={{
                                margin:"5px 0 0 -20px",
                            }}
                            checked={toggleOn}
                            onChange={() => {setToggleOn(!toggleOn); setDisableButton(true); setCleanliness(3); setStudious(3); setGuestFreq(3)}}
                        />
                    </Container>
                    {toggleOn &&
                    <Container sx={styles.box} style={{marginTop:"-10px"}}>
                        <Container sx={{float: "left", width: "55%"}}>
                            <Typography sx={styles.livingHabit}>{"Pets"}</Typography>
                            <Typography sx={styles.livingHabit}>{"Smoke"}</Typography>
                            <Typography sx={styles.livingHabit}>{"Studious"}</Typography>
                            <Typography sx={styles.livingHabit}>{"Cleanliness"}</Typography>
                            <Typography sx={styles.livingHabit}>{"Guests frequency"}</Typography>
                            <Typography sx={styles.livingHabit}>{"Sleep schedule"}</Typography>
                        </Container>
                        <Container sx={{float: "right", width: "45%"}}>
                            <FormControl sx={{marginLeft:"-55px", marginBottom:"-7px"}} disabled={disableButton}>
                                <RadioGroup row name="pets" style={{width: "150px", display: "flex", justifyContent:"center"}} > 
                                    <FormControlLabel value="yes" control={<Radio sx={radioSX}/>} label="Yes" onChange={() => setHasPet(true)}/>
                                    <FormControlLabel value="no" control={<Radio sx={radioSX}/>} label="No" onChange={() => setHasPet(false)}
                                    />
                                </RadioGroup>
                            </FormControl>
                            <FormControl style={{marginLeft:"-55px", marginBottom: "-7px"}} disabled={disableButton}>
                                <RadioGroup defaultValue={"yes"} row name="smoke" style={{width: "150px", display: "flex", justifyContent:"center"}} > 
                                    <FormControlLabel value="yes" control={<Radio sx={radioSX}/>} label="Yes" onChange={() => setDoesSmoke(true)}/>
                                    <FormControlLabel value="no" control={<Radio sx={radioSX}/>} label="No" onChange={() => setDoesSmoke(false)}
                                    />
                                </RadioGroup>
                            </FormControl>
                            <Container>
                            <Slider
                                onChange={(e, val) => setStudious(val)}
                                size="small"
                                defaultValue={3}
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={0}
                                max={5}
                                sx={{color:"secondaryColor", width: "120px", height: "5px", marginLeft: "-70px"}}
                                disabled={disableButton}
                            />
                            </Container>
                            <Container>
                            <Slider
                                onChange={(e, val) => setCleanliness(val)}
                                size="small"
                                defaultValue={3}
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={0}
                                max={5}
                                sx={{color:"secondaryColor", width: "120px", height: "5px", marginLeft: "-70px"}}
                                disabled={disableButton}
                            />
                            </Container>
                            <Container>
                            <Slider
                                onChange={(e, val) => setGuestFreq(val)}
                                size="small"
                                defaultValue={3}
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={0}
                                max={5}
                                sx={{color:"secondaryColor", width: "120px", height: "5px", marginLeft: "-70px"}}
                                disabled={disableButton}
                            />
                            </Container>
                            <Container style={{display: "flex", gap: "1rem", width: "200px", margin:"0 0 10px -50px", padding:"0"}}>
                                <Select displayEmpty value={sleepFrom} onChange={handleSleepFrom} sx={selectSX} disabled={disableButton} >
                                    <MenuItem value=""> <em>From</em> </MenuItem> <MenuItem value={0}>0</MenuItem>
                                    <MenuItem value={1}>1</MenuItem> <MenuItem value={2}>2</MenuItem> <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem> <MenuItem value={5}>5</MenuItem> <MenuItem value={6}>6</MenuItem>
                                    <MenuItem value={7}>7</MenuItem> <MenuItem value={8}>8</MenuItem> <MenuItem value={9}>9</MenuItem>
                                    <MenuItem value={10}>10</MenuItem> <MenuItem value={11}>11</MenuItem> <MenuItem value={12}>12</MenuItem>
                                    <MenuItem value={13}>13</MenuItem> <MenuItem value={14}>14</MenuItem> <MenuItem value={15}>15</MenuItem>
                                    <MenuItem value={16}>16</MenuItem> <MenuItem value={17}>17</MenuItem> <MenuItem value={18}>18</MenuItem>
                                    <MenuItem value={19}>19</MenuItem> <MenuItem value={20}>20</MenuItem> <MenuItem value={21}>21</MenuItem>
                                    <MenuItem value={22}>22</MenuItem> <MenuItem value={23}>23</MenuItem>
                                </Select>
                            
                                <Select displayEmpty value={sleepTo} onChange={handleSleepTo} sx={selectSX} disabled={disableButton} >
                                    <MenuItem value=""> <em>To</em> </MenuItem> <MenuItem value={0}>0</MenuItem>
                                    <MenuItem value={1}>1</MenuItem> <MenuItem value={2}>2</MenuItem> <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem> <MenuItem value={5}>5</MenuItem> <MenuItem value={6}>6</MenuItem>
                                    <MenuItem value={7}>7</MenuItem> <MenuItem value={8}>8</MenuItem> <MenuItem value={9}>9</MenuItem>
                                    <MenuItem value={10}>10</MenuItem> <MenuItem value={11}>11</MenuItem> <MenuItem value={12}>12</MenuItem>
                                    <MenuItem value={13}>13</MenuItem> <MenuItem value={14}>14</MenuItem> <MenuItem value={15}>15</MenuItem>
                                    <MenuItem value={16}>16</MenuItem> <MenuItem value={17}>17</MenuItem> <MenuItem value={18}>18</MenuItem>
                                    <MenuItem value={19}>19</MenuItem> <MenuItem value={20}>20</MenuItem> <MenuItem value={21}>21</MenuItem>
                                    <MenuItem value={22}>22</MenuItem> <MenuItem value={23}>23</MenuItem>
                                </Select>
                            </Container>
                            <Button variant="contained" 
                                sx={{
                                    ":hover": {
                                        backgroundColor: "secondaryColor", border: "none",
                                        boxShadow: theme.palette.type === 'light' ? "0px 0px 3px 3px rgba(0, 0, 0, .1)" : "0px 0px 3px 3px rgba(245, 235, 224, .1)",
                                    },
                                    border: "none",
                                    backgroundColor: "secondaryColor", 
                                    color: theme.palette.type === "light" ? "primaryColor" : "textColor",
                                    fontWeight: 600, marginRight:"-40px", marginTop: "10px",
                                    justifyContent: "center", float: "right",
                                }}
                                onClick={() => {
                                    if (disableButton) {
                                    // Enable edit mode
                                    setDisableButton(false);
                                    } else {
                                    // Save changes and disable edit mode
                                    handleSaveRight();
                                    setDisableButton(true);
                                    }  
                                }}>
                                {disableButton ? 'Edit' : 'Save'}  
                            </Button>

                        </Container>
                        
                    </Container>
                    }
                    
                </Box>
                
                </CardContent>
                <Toaster
                    toastOptions={{
                        success: {
                        style: {
                            background: 'green',
                        },
                        },
                        error: {
                        style: {
                            background: 'red',
                        },
                        },
                    }}/>
            </Card>
            <Dialog
                open={open}
                onClose={handleClose}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "600px",
                            height: "200px",
                            backgroundColor: "primaryColor",
                            boxShadow: theme.palette.type === 'light' ? "0px 0px 3px 3px rgba(0, 0, 0, .1)" : "0px 0px 3px 3px rgba(245, 235, 224, .1)", 
                        },
                    },
                }}
                
            ><DialogContent>
                <Typography sx={{fontWeight: "600", fontSize: "15pt", color: "secondaryColor", textAlign:"center", margin:"10px 0 -10px 0"}}> 
                        {"SELECT YOUR PROFILE PICTURE"}
                    </Typography >
                <Container sx={{display:"inline-flex", marginTop:"50px"}}>
                        <Tooltip onClick={() => {setChicken(sheep); setProfileImg(sheep)}}>
                            <IconButton sx={{ p: 0, marginRight:"50px",} } >
                                    <Avatar alt="sheep" src={sheep} style={{transform: `scale(1.90, 1.90)`}} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip onClick={() => {setChicken(horse); setProfileImg(horse)}}>
                            <IconButton sx={{ p: 0, marginRight:"50px"}} >
                                <Avatar alt="horse" src={horse} style={{transform: `scale(1.90, 1.90)` }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip onClick={() => {setChicken(goose); setProfileImg(goose)}}>
                            <IconButton sx={{ p: 0, marginRight:"50px"}} >
                                <Avatar alt="goose" src={goose} style={{transform: `scale(1.90, 1.90)` }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip onClick={() => {setChicken(cow); setProfileImg(cow)}}>
                            <IconButton sx={{ p: 0, marginRight:"50px"}} >
                                <Avatar alt="cow" src={cow} style={{transform: `scale(1.90, 1.90)` }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip onClick={() => {setChicken(duck); setProfileImg(duck)}}>
                            <IconButton sx={{ p: 0, marginRight:"50px"}} >
                                <Avatar alt="duck" src={duck} style={{transform: `scale(1.90, 1.90)` }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip onClick={() => {setChicken(chicken); setProfileImg(chicken)}}>
                            <IconButton sx={{ p: 0}} >
                                <Avatar alt="chicken" src={chicken} style={{transform: `scale(1.90, 1.90)` }} />
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