import { InputBase, Slider, Checkbox, Grid, Card, Container, Box, Typography, CardContent, Input, Divider, TextField, Link, Button, FormControlLabel } from "@mui/material";
import Switch from '@mui/joy/Switch'
import React from "react"
import profilePic from "../images/profile-pic-no-shadow.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMars } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

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
                        <Box
                            component="img"
                            sx={{
                                width: "25%",
                                marginRight: "20px",
                                "&:hover": {
                                    border: "2px solid #AB191F",
                                    boxShadow:"0px 0px 3px 3px rgba(0, 0, 0, .1)", 
                                }
                            }}
                            src={profilePic}
                            />

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
                    <InputBase placeholder="Purdue Email" id="email-textfield" sx={inputBaseSX}/>
                    <InputBase placeholder="Phone number" id="number-textfield" sx={inputBaseSX}/>
                    <Button variant="contained" style={{backgroundColor: "#AB191F", float: "right", margin: "0 35px 0 0"}}>SAVE</Button>
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
                                <InputBase placeholder="From" id="from-textfield" style={{marginLeft:"-25px"}}sx={sleepScheduleSX}/>
                                <InputBase placeholder="To" id="to-textfield" sx={sleepScheduleSX}/>
                            </Container>
                            <Button variant="contained" style={{backgroundColor: "#AB191F", float: "right", margin: "0 0 0 0"}}>SAVE</Button>

                        </Container>
                    </Container>
                    }
                </Box>
                
                </CardContent>
            </Card>
        </Grid>
    )
}

export default RenterPage;