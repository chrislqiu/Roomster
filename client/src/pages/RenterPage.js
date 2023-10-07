import { InputBase, Grid, Card, Container, Box, Typography, CardContent, Input, Divider, TextField, Link, Button } from "@mui/material";
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
            display: "inline-flex"
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
                        <img src={profilePic} style={Object.assign({width: "25%"}, styles.boxPadding)}></img>
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
                    <Typography style={styles.header}> 
                        {"FINDING COOPMATES?"}
                    </Typography >
                </Box>
                
                </CardContent>
            </Card>
        </Grid>
    )
}

export default RenterPage;