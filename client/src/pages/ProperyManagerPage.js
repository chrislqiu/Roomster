import { InputBase, Card, Box, Typography, CardContent, Input, Divider, TextField, Link, Button } from "@mui/material";
import toast, { Toaster } from 'react-hot-toast';
import React from "react"
import { useState } from 'react';

const PropertyManagerPage = () => {


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


    const inputBaseSX = {
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
    }

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
            <Card
                variant='contained'
                sx={{
                    backgroundColor: "#f5ebe0",
                    color: "#AB191F",
                    width: "800px",
                    height: "385px",
                    boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, .1)",
                    marginBottom: "225px",
                    marginTop: "50px",
                    marginLeft: "300px"
                    }}>
                <CardContent>
                <Box width='45%' marginLeft={5}>
                        <Typography 
                        sx={{
                            fontWeight: 600,
                            fontSize: 24,
                            marginTop: 2,
                            variant: "h1",
                            color: "black",
                            width: "310px",
                        }}>
                            {nameHolder}
                        </Typography >
                        <Typography
                        sx={{
                            fontWeight: 600,
                            fontSize: 15,
                            marginTop: 1,
                            width: "300px",
                        }}>
                            {"Contact Info:"}
                        </Typography>
                        <Box sx={{
                            fontWeight: 600,
                            fontSize: 12,
                            width: "300px",
                            fontFamily: 'Raleway',
                        }}>
                            <InputBase
                            sx={inputBaseSX} 
                            type="text"
                            name="phoneNum"
                            placeholder={phoneHolder} style={{width:200}}
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            disabled={disableButton}
                            />
                        </Box>
                        <Box sx={{
                            fontWeight: 600,
                            fontSize: 12,
                            marginTop: 2,
                            fontFamily: 'Raleway',
                            width: "300px",
                        }}>
                            <InputBase
                            sx={inputBaseSX}
                            type="text"
                            name="email"
                            placeholder={emailHolder} style={{width:200}} 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={disableButton}
                            />
                        </Box>
                        <Typography
                        sx={{
                            fontWeight: 600,
                            fontSize: 15,
                            marginTop: 1,
                            width:"300px",
                        }}>
                            {"Bio:"}
                        </Typography>
                        <Box sx={{
                            fontWeight: 600,
                            fontSize: 12,
                            marginTop: 1,
                            fontFamily: 'Raleway',
                            width:"300px",
                        }}>
                            <TextField
                            type="text"
                            name="bio"
                            placeholder={bioHolder}
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            multiline rows={4} maxRows={4} 
                            disabled={disableButton}
                            width="500px"
                            style={{
                                width:"300px",
                                borderRadius: "7px",
                                border: "2px solid #AB191F",
                                "&:hover": {
                                    boxShadow:"0px 0px 3px 3px rgba(0, 0, 0, .1)", 
                                }
                            }}
                            />
                        </Box>
                </Box>
            
                <Box width='40%' marginLeft={57} marginY={-39}>
                    <Typography 
                        sx={{
                            fontWeight: 600,
                            fontSize: 24,
                            variant: "h1",
                            color: "black"
                        }}>
                            {CompanyNameHolder}
                    </Typography >
                    <Typography
                        sx={{
                            fontWeight: 600,
                            fontSize: 15,
                            marginTop: 1
                        }}>
                            {"Address:"}
                        </Typography>
                        <Box sx={{
                            fontWeight: 600,
                            fontSize: 12,
                            marginBottom: 1,
                            fontFamily: 'Raleway'
                        }}>
                            <InputBase
                            sx={inputBaseSX} 
                            type="text"
                            name="addr"
                            placeholder={addressHolder} style={{width:200}} 
                            value={addr}
                            onChange={(e) => setAddr(e.target.value)}
                            disabled={disableButton}
                            />
                        </Box>
                        <Typography
                        sx={{
                            fontWeight: 600,
                            fontSize: 15,
                            marginTop: 0
                        }}>
                            {"Office Phone Number:"}
                        </Typography>
                        <Box sx={{
                            fontWeight: 600,
                            fontSize: 12,
                            marginBottom: 2,
                            fontFamily: 'Raleway'
                        }}>
                            <InputBase
                            sx={inputBaseSX} 
                            type="text"
                            name="officeNum"
                            placeholder={OPhoneHolder} style={{width:200}} 
                            value={officeNum}
                            onChange={(e) => setOfficeNum(e.target.value)}
                            disabled={disableButton}
                            />
                        </Box>
                        <Link href={`http://${site}`} underline="always" color="#AB191F" fontWeight={600} >
                                {'Leasing Site'}
                        </Link>
                        <Box marginLeft={28} marginY={10} width={"200px"}>
                        <Button 
                            variant='contained'
                            sx={{
                                ":hover":{
                                bgcolor: "#F6EBE1",
                                color: "#AB191F"
                                },
                                backgroundColor: "#AB191F",
                                color: "#F6EBE1",
                                m: 1
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
    )
}

export default PropertyManagerPage