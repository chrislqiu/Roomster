import { InputBase, Card, Box, Typography, Grid, CardContent, Input, Divider, TextField, Link, Button } from "@mui/material";
import toast, { Toaster } from 'react-hot-toast';
import React from "react"
import { useState } from 'react';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';

const PropertyManagerPage = () => {
    const theme = useTheme();

    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');

    const [addr, setAddr] = useState('');
    const [officeNum, setOfficeNum] = useState('');
    const [disableButton, setDisableButton] = useState(true)
    const [username, setUsername] = React.useState('')
    const [userData, setUserData] = React.useState('')


    //Placeholders for existing info
    const [nameHolder, setNameHolder] = useState('')
    const [CompanyNameHolder, setCompanyNameHolder] = useState('')
    const [phoneHolder, setPhoneHolder] = useState('')
    const [emailHolder, setEmailHolder] = useState('')
    const [bioHolder, setBioHolder] = useState('')
    const [addressHolder, setAddressHolder] = useState('')
    const [OPhoneHolder, setOPhoneHolder] = useState('')
    const [site, setSite] = useState('')

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
            setNameHolder(data.user.name)
            setPhoneHolder(data.user.phone)
            setEmailHolder(data.user.email)
            setBioHolder(data.user.bio)
            setCompanyNameHolder(data.user.company.companyInfo.name)
            setAddressHolder(data.user.company.companyInfo.address)
            setOPhoneHolder(data.user.company.companyInfo.phone)
            setSite(data.user.company.companyInfo.site)
            // Access user data, e.g., data.user
        })
        .catch(error => {
            // Handle errors
            console.error('Fetch error:', error);
        });

        const textfieldSX = {
            margin: "0 0 10px 0px", 
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
    /*const inputBaseSX = {
        margin: "5 0 10px 0px", 
        width:"300px", 
        height: "35px",
        borderRadius: "5px",
        border: "2px solid #AB191F",
        padding: "5px",
        "&:hover": {
            border: "2px solid #AB191F",
            boxShadow:"0px 0px 3px 3px rgba(0, 0, 0, .1)", 
        }
    }*/

    const customToastStyles = {
        color: 'white', // Set the desired text color
      };

    const handleSave = () => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;
        
        if (phoneNumber === '' || email === '' || addr === '' || officeNum === '') {
            toast.error("Please fill in all the fields!", {style: customToastStyles})
            return;
        } else if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address", {style: customToastStyles})
            return;
        } else {
            toast.success("Save Success!", {style: customToastStyles})
        }
        
        const dataToSend ={
            name: nameHolder,
            phone: phoneNumber,
            email: email,
            bio: bio,
            company: {
                name: CompanyNameHolder,
                address: addr,
                phone: officeNum
            }
        };

        fetch('http://localhost:8000/sendManagerProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend, username),
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            console.log('DATA SAVEDDDD: ', data);
        })
        .catch(error => {
            console.error('ERRORRR: ', error);
        });
    };

    return (
        <Grid container spacing={0} direction="column" alignItems="center" justify="center">
            <Card
            variant='contained'
            sx={{
                backgroundColor: "primaryColor",
                boxShadow: theme.palette.type === 'light' ? "0px 0px 3px 3px rgba(0, 0, 0, .1)" : "0px 0px 3px 3px rgba(245, 235, 224, .1)", 
                width: "750px",
                height: "375px",
                margin: "-10px 0 20px 0"
                }}>
                <CardContent>
                <Box sx={{
                float: "left", 
                width: "47%", 
                borderRight: "3px solid",
                borderColor: "secondaryColor",
                paddingLeft: "15px",
                }}>
                    <Typography 
                    sx={{
                        fontWeight: 600,
                        fontSize: 24,
                        variant: "h1",
                        color: "textColor",
                        width: "310px",
                    }}>
                        {nameHolder}
                    </Typography >
                    <Typography
                    sx={{
                        fontWeight: 600,
                        fontSize: 15,
                        margin: "10px 0 10px 0",
                        width: "300px",
                        color: "textColor"
                    }}>
                        {"Manager Info:"}
                    </Typography>    
                    <TextField
                        placeholder={phoneHolder} value={phoneNumber} variant="outlined" 
                        sx={textfieldSX} size="small" name="phoneNum" type="text"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        disabled={disableButton}
                    />
                    <TextField
                        placeholder={emailHolder} value={email} variant="outlined" 
                        sx={textfieldSX} size="small" name="email" type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={disableButton}
                    />
                    <Typography
                    sx={{
                        fontWeight: 600,
                        fontSize: 15,
                        width:"300px",
                        color: "textColor",
                        margin: "0 0 10px 0"
                    }}>
                    {"Bio:"}
                    </Typography>
                        
                    <TextField
                    type="text"
                    name="bio"
                    placeholder={bioHolder}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    multiline rows={3} maxRows={3} 
                    disabled={disableButton}
                    width="500px"
                    sx={{
                        width:"300px",
                        borderRadius: "7px",
                        border: "2px solid",
                        borderColor: "secondaryColor",
                        "&:hover": {
                            boxShadow: theme.palette.type === 'light' ? "0px 0px 3px 3px rgba(0, 0, 0, .1)" : "0px 0px 3px 3px rgba(245, 235, 224, .1)", 
                        }
                    }}
                    />         
                </Box>
            
                <Box sx={{float: "left", width: "47%", paddingLeft: "25px"}}>
                    <Typography 
                        sx={{
                            fontWeight: 600,
                            fontSize: 24,
                            variant: "h1",
                            color: "textColor"
                        }}>
                            {CompanyNameHolder}
                    </Typography >
                    <Typography
                        sx={{
                            fontWeight: 600,
                            fontSize: 15,
                            margin: "10px 0 10px 0",
                            color: "textColor"
                        }}>
                            {"Company Info:"}
                        </Typography>
                
                        <TextField
                            placeholder={addressHolder} value={addr} id="email-textfield" variant="outlined" 
                            sx={textfieldSX} size="small" type="text" name="addr"
                            onChange={(e) => setAddr(e.target.value)}
                            disabled={disableButton}
                        />
                        
                        <TextField
                            placeholder={OPhoneHolder} value={officeNum} variant="outlined" 
                            sx={textfieldSX}size="small" type="text" name="officeNum"
                            onChange={(e) => setOfficeNum(e.target.value)}
                            disabled={disableButton}
                        />
                        <Box>
                        <Link href={`http://${site}`} underline="always" color="secondaryColor" fontWeight={600}
                        sx={{":hover": {color: "textColor"}}}>
                                {'Leasing Site'} 
                        </Link>
                        </Box>
                        <Button 
                            variant='contained'
                            sx={{
                                ":hover":{
                                bgcolor: "secondaryColor",
                                color: "primaryColor",
                                boxShadow: theme.palette.type === 'light' ? "0px 0px 3px 3px rgba(0, 0, 0, .1)" : "0px 0px 3px 3px rgba(245, 235, 224, .1)", 

                                },
                                float: "right",
                                margin: "85px 0 0 0",
                                backgroundColor: "secondaryColor",
                                color: "primaryColor",
                                fontWeight: "600",
                            }}
                            onClick={() => {
                                if (disableButton) {
                                // Enable edit mode
                                setDisableButton(false);
                                } else {
                                // Save changes and disable edit mode
                                handleSave();
                                setDisableButton(true);
                                }  
                            }}>
                            {disableButton ? 'Edit' : 'Save'}
                        </Button>
                </Box>
                <Divider orientation="vertical" width={3} sx={{ borderBottomWidth: 3, color: "#AB191F", backgroundColor: "#AB191F", marginX: 48, marginY:-50, height: 270}} />
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
            </Grid>
    )
}

export default PropertyManagerPage