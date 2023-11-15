import { Dialog, DialogContent, DialogActions, Tooltip, IconButton, Avatar, InputBase, Slider, Select, MenuItem, Grid, Card, Container, Box, Typography, CardContent, Radio, Button, RadioGroup, FormControl, FormControlLabel } from "@mui/material";
import Switch from '@mui/joy/Switch'
import React, { useState, useEffect } from "react"
import defImg from "../images/profile-pic-no-shadow.png"
import horse from "../images/chickens/horse.png"
import duck from "../images/chickens/duck.png"
import goose from "../images/chickens/goose.png"
import cow from "../images/chickens/cow.png"
import chicken from "../images/chickens/chicken.png"
import sheep from "../images/chickens/sheep.png"
import toast, { Toaster } from 'react-hot-toast';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMars } from '@fortawesome/free-solid-svg-icons'

const RenterPage = () => {
    const customToastStyles = {
        color: 'white', // Set the desired text color
    };

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
        width: "300px",
        height: "35px",
        borderRadius: "5px",
        border: "2px solid #AB191F",
        padding: "5px",
        "&:hover": {
            border: "2px solid #AB191F",
            boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, .1)",
        }
    }
    const sleepScheduleSX = {
        margin: "0 0 10px 25px",
        width: "50px",
        height: "30px",
        borderRadius: "5px",
        border: "2px solid #AB191F",
        padding: "5px",
        fontSize: "12pt",
        "&:hover": {
            border: "2px solid #AB191F",
            boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, .1)",
        },
        "& input::placeholder": {
            fontSize: "11pt"
        }
    }
    const radioSX = {
        color: "#AB191F",
        '&.Mui-checked': {
            color: "#AB191F",
        },
    }
    const selectSX = {
        width: 90, height: 30, fontSize: "11pt",
        '.MuiOutlinedInput-notchedOutline': {
            border: "2px solid #AB191F"
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: "2px solid #AB191F"
        }
    }
    const [toggleOn, setToggleOn] = React.useState(false);
    const [name, setName] = React.useState('')
    const [age, setAge] = React.useState('')
    const [hasPet, setHasPet] = React.useState(false);
    const [doesSmoke, setDoesSmoke] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [openMessage, setOpenMessage] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [profileImg, setProfileImg] = React.useState('');
    const [disableButton, setDisableButton] = React.useState(true);
    const [sleepFrom, setSleepFrom] = React.useState(0);
    const [sleepTo, setSleepTo] = React.useState(0);
    const [studious, setStudious] = React.useState('')
    const [cleanliness, setCleanliness] = React.useState('')
    const [guestFreq, setGuestFreq] = React.useState('')
    const [username, setUsername] = React.useState('')

    //Existing Information
    const [data, setData] = React.useState('')
    var [pfp, setPfp] = useState('')
    const [defEmail, setDefEmail] = useState('')
    const [defPhone, setDefPhone] = useState('')
    const [defToggle, setDefToggle] = useState()
    const [defPet, setDefPet] = useState(false)
    const [defSmoke, setDefSmoke] = useState(false)
    const [defStudious, setDefStudious] = useState('')
    const [defClean, setDefClean] = useState('')
    const [defGuest, setDefGuest] = useState('')
    const [defFrom, setDefFrom] = useState('')
    const [defTo, setDefTo] = useState('')

    useEffect(() => {
        fetch('http://localhost:8000/auth/current-user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Handle the JSON response
                setData(data.user.renterInfo)
                setToggleOn(data.user.findingCoopmates)
                setPfp(data.user.renterInfo.pfp)
                setName(data.user.renterInfo.name)
                setAge(data.user.renterInfo.age)
                setDefEmail(data.user.renterInfo.email)
                setDefPhone(data.user.renterInfo.phone)
                setDefPet(data.user.renterInfo.livingPreferences.pets)
                setDefSmoke(data.user.renterInfo.livingPreferences.smoke)
                setDefStudious(data.user.renterInfo.livingPreferences.studious)
                setDefClean(data.user.renterInfo.livingPreferences.cleanliness)
                setDefGuest(data.user.renterInfo.livingPreferences.guestFreq)
                setDefFrom(data.user.renterInfo.livingPreferences.sleepSchedule.from)
                setDefTo(data.user.renterInfo.livingPreferences.sleepSchedule.to)
                // Access user data, e.g., data.user
            })
            .catch(error => {
                // Handle errors
                console.error('Fetch error:', error);
            });
    }, []);

    var [newImg, setNewImg] = useState(pfp)
    useEffect(() => {
        // Set newImg after pfp is updated
        setNewImg(pfp);
    }, [pfp]);

    var [newStudious, setNewStudious] = useState(defStudious)
    useEffect(() => {
        // Set newImg after pfp is updated
        setNewStudious(defStudious);
    }, [defStudious]);

    var [newClean, setNewClean] = useState(defClean)
    useEffect(() => {
        // Set newImg after pfp is updated
        setNewClean(defClean);
    }, [defClean]);

    var [newGuest, setNewGuest] = useState(defGuest)
    useEffect(() => {
        // Set newImg after pfp is updated
        setNewGuest(defGuest);
    }, [defGuest]);

    const handleSleepFrom = (event) => {
        setSleepFrom(event.target.value);
    };
    const handleSleepTo = (event) => {
        setSleepTo(event.target.value);
    };
    const handleSaveRight = () => {
        console.log(defStudious)
        const emailRegex = /^[a-zA-Z0-9._-]+@purdue\.edu$/;

        if (sleepFrom === "" || sleepTo === "" || email === '' || phone === '') {
            toast.error("Please fill in all the fields!", { style: customToastStyles });
            return
        } else if (!emailRegex.test(email)) {
            toast.error("Please enter a valid Purdue email address", { style: customToastStyles });
            return;
        } else {
            toast.success("Save Success!", { style: customToastStyles })
        }

        const dataToSend = {
            findingCoopmates: toggleOn,
            renterInfo: {
                name: name,
                age: age,
                email: email,
                phone: phone,
                pfp: newImg === '' ? pfp : newImg,
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
            body: JSON.stringify(dataToSend, username),
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
            toast.error("Please fill in email and phone number!", { style: customToastStyles })
            return;
        } else if (!emailRegex.test(email)) {
            toast.error("Please enter a valid Purdue email address", { style: customToastStyles });
            return;
        } else {
            toast.success("Save Success!", { style: customToastStyles })
        }

        const dataToSend = {
            findingCoopmates: toggleOn,
            renterInfo: {
                name: name,
                age: age,
                email: email,
                phone: phone,
                pfp: newImg === '' ? pfp : newImg,
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
            body: JSON.stringify(dataToSend, username),
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
        setNewImg(chicken);
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
                            <Box sx={{ flexGrow: 0, margin: "15px 50px 20px 20px" }}>
                                <Tooltip title="Change Profile Picture" sx={{ color: "#AB191F" }} onClick={handleOpen} >
                                    <IconButton sx={{ p: 0, }} >
                                        <Avatar alt="chickenpfp" style={{ transform: `scale(1.90, 1.90)` }} src={(pfp === '') && (newImg === pfp) ? defImg : newImg} />
                                    </IconButton>
                                </Tooltip>
                            </Box>

                            <Typography style={Object.assign(styles.name, styles.boxPadding, { marginTop: "20px" })}>
                                {name}
                            </Typography >
                            <Typography style={Object.assign(styles.age, { padding: "0 10px 0 20px", marginTop: "20px" })}>
                                {age}
                            </Typography >
                            <FontAwesomeIcon icon={faMars} style={Object.assign(styles.icon, { marginTop: "22px" })} />
                        </Container>
                        <Typography style={styles.subheader}>
                            {"Contact info"}
                        </Typography >
                        <InputBase placeholder={defEmail} value={email} id="email-textfield" sx={inputBaseSX} onChange={(e) => setEmail(e.target.value)} disabled={disableButton} />
                        <InputBase placeholder={defPhone} defaultValue={phone} id="number-textfield" sx={inputBaseSX} onChange={(e) => setPhone(e.target.value)} disabled={disableButton} />
                        <Button variant="contained" style={{ backgroundColor: "#AB191F", float: "right", margin: "0 35px 0 0", visibility: toggleOn ? "hidden" : "visible" }}
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
                    <Box width='100%' style={styles.column2}>
                        <Container style={styles.box}>
                            <Typography style={styles.header}>
                                {"FINDING COOPMATES?"}
                            </Typography >
                            <Switch style={{ verticalAlign: "center", marginTop: "2px" }}
                                color={toggleOn ? 'danger' : 'neutral'}
                                checked={toggleOn}
                                onChange={() => { setToggleOn(!toggleOn);  }}
                            />
                        </Container>
                        {toggleOn &&
                            <Container style={styles.box} sx={{ marginTop: "-10px" }}>
                                <Container style={{ float: "left", width: "55%" }}>
                                    <Typography style={styles.livingHabit}>{"Pets"}</Typography>
                                    <Typography style={styles.livingHabit}>{"Smoke"}</Typography>
                                    <Typography style={styles.livingHabit}>{"Studious"}</Typography>
                                    <Typography style={styles.livingHabit}>{"Cleanliness"}</Typography>
                                    <Typography style={styles.livingHabit}>{"Guests frequency"}</Typography>
                                    <Typography style={styles.livingHabit}>{"Sleep schedule"}</Typography>
                                </Container>
                                <Container style={{ float: "right", width: "45%" }}>
                                    <FormControl style={{ marginLeft: "-55px", marginBottom: "-7px" }} disabled={disableButton}>
                                        <RadioGroup row name="pets" defaultValue={defPet == true ? "yes" : "no"} style={{ width: "150px", display: "flex", justifyContent: "center" }} >
                                            <FormControlLabel value="yes" control={<Radio sx={radioSX} />} label="Yes" onChange={() => setHasPet(true)} />
                                            <FormControlLabel value="no" control={<Radio sx={radioSX} />} label="No" onChange={() => setHasPet(false)}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                    <FormControl style={{ marginLeft: "-55px", marginBottom: "-7px" }} disabled={disableButton}>
                                        <RadioGroup row name="smoke" defaultValue={defSmoke == true ? "yes" : "no"} style={{ width: "150px", display: "flex", justifyContent: "center" }} >
                                            <FormControlLabel value="yes" control={<Radio sx={radioSX} />} label="Yes" onChange={() => setDoesSmoke(true)} />
                                            <FormControlLabel value="no" control={<Radio sx={radioSX} />} label="No" onChange={() => setDoesSmoke(false)}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                    <Container>
                                        <Slider
                                            onChange={(e, val) => setStudious(val)}
                                            size="small"
                                            defaultValue={newStudious}
                                            valueLabelDisplay="auto"
                                            step={1}
                                            marks
                                            min={0}
                                            max={5}
                                            sx={{ color: "#AB191F", width: "120px", height: "5px", marginLeft: "-70px" }}
                                            disabled={disableButton}
                                        />
                                    </Container>
                                    <Container>
                                        <Slider
                                            onChange={(e, val) => setCleanliness(val)}
                                            size="small"
                                            defaultValue={newClean}
                                            valueLabelDisplay="auto"
                                            step={1}
                                            marks
                                            min={0}
                                            max={5}
                                            sx={{ color: "#AB191F", width: "120px", height: "5px", marginLeft: "-70px" }}
                                            disabled={disableButton}
                                        />
                                    </Container>
                                    <Container>
                                        <Slider
                                            onChange={(e, val) => setGuestFreq(val)}
                                            size="small"
                                            defaultValue={newGuest}
                                            valueLabelDisplay="auto"
                                            step={1}
                                            marks
                                            min={0}
                                            max={5}
                                            sx={{ color: "#AB191F", width: "120px", height: "5px", marginLeft: "-70px" }}
                                            disabled={disableButton}
                                        />
                                    </Container>
                                    <Container style={{ display: "flex", gap: "1rem", width: "200px", margin: "0 0 10px -50px", padding: "0" }}>
                                        <Select displayEmpty defaultValue={defFrom} onChange={handleSleepFrom} sx={selectSX} disabled={disableButton} >
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

                                        <Select displayEmpty defaultValue={defTo} onChange={handleSleepTo} sx={selectSX} disabled={disableButton} >
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
                                    <Button variant="contained" style={{ backgroundColor: "#AB191F", float: "right", margin: "0 -40px 0 0" }}
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
                    }} />
            </Card>
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
                    <Typography style={{ fontWeight: "600", fontSize: "15pt", color: "#AB191F", textAlign: "center", margin: "10px 0 -10px 0" }}>
                        {"SELECT YOUR PROFILE PICTURE"}
                    </Typography >
                    <Container sx={{ display: "inline-flex", marginTop: "50px" }}>
                        <Tooltip onClick={() => { setChicken(sheep); setProfileImg(sheep) }}>
                            <IconButton sx={{ p: 0, marginRight: "50px", }} >
                                <Avatar alt="sheep" src={sheep} style={{ transform: `scale(1.90, 1.90)` }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip onClick={() => { setChicken(horse); setProfileImg(horse) }}>
                            <IconButton sx={{ p: 0, marginRight: "50px" }} >
                                <Avatar alt="horse" src={horse} style={{ transform: `scale(1.90, 1.90)` }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip onClick={() => { setChicken(goose); setProfileImg(goose) }}>
                            <IconButton sx={{ p: 0, marginRight: "50px" }} >
                                <Avatar alt="goose" src={goose} style={{ transform: `scale(1.90, 1.90)` }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip onClick={() => { setChicken(cow); setProfileImg(cow) }}>
                            <IconButton sx={{ p: 0, marginRight: "50px" }} >
                                <Avatar alt="cow" src={cow} style={{ transform: `scale(1.90, 1.90)` }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip onClick={() => { setChicken(duck); setProfileImg(duck) }}>
                            <IconButton sx={{ p: 0, marginRight: "50px" }} >
                                <Avatar alt="duck" src={duck} style={{ transform: `scale(1.90, 1.90)` }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip onClick={() => { setChicken(chicken); setProfileImg(chicken) }}>
                            <IconButton sx={{ p: 0 }} >
                                <Avatar alt="chicken" src={chicken} style={{ transform: `scale(1.90, 1.90)` }} />
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