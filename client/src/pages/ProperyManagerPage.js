import { Container, Card, Box, Typography, CardContent, Input, Divider, TextField, Link, Button } from "@mui/material";
import React from "react"
import { useState } from 'react';

const PropertyManagerPage = () => {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [addr, setAddr] = useState('');
    const [officeNum, setOfficeNum] = useState('');
    const [saveStatus, setSaveStatus] = useState(null)

    const handleSave = () => {

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;

        if (!emailRegex.test(email)) {
            setSaveStatus("Please enter a valid email address");
            return;
        } else {
            setSaveStatus("Save Success!")
        }
        
        const dataToSend ={
            phoneNum: phoneNumber,
            email: email,
            bio: bio,
            address: addr,
            officePhone: officeNum
        };

        fetch('http://localhost:8000/sendManagerProfile', {
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
    };
    return (
        <Container sx={{ width: '600' }}>
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
                    marginLeft: "150px"
                    }}>
                <CardContent>
                <Box width='100%' marginLeft={5}>
                        <Typography 
                        sx={{
                            fontWeight: 600,
                            fontSize: 24,
                            marginTop: 2,
                            variant: "h1",
                            color: "black"
                        }}>
                            {"John Doe"}
                        </Typography >
                        <Typography
                        sx={{
                            fontWeight: 600,
                            fontSize: 15,
                            marginTop: 1
                        }}>
                            {"Contact Info:"}
                        </Typography>
                        <Box sx={{
                            fontWeight: 600,
                            fontSize: 12,
                            
                            fontFamily: 'Raleway'
                        }}>
                            <Input 
                            type="text"
                            name="phoneNum"
                            placeholder="Phone Number" style={{width:200}}
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            
                            />
                        </Box>
                        <Box sx={{
                            fontWeight: 600,
                            fontSize: 12,
                            marginTop: 2,
                            fontFamily: 'Raleway'
                        }}>
                            <Input 
                            type="text"
                            name="email"
                            placeholder="Email Address" style={{width:200}} 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            
                            />
                            
    
                        </Box>
                        <Typography
                        sx={{
                            fontWeight: 600,
                            fontSize: 15,
                            marginTop: 1
                        }}>
                            {"Bio:"}
                        </Typography>
                        <Box sx={{
                            fontWeight: 600,
                            fontSize: 12,
                            marginTop: 1,
                            fontFamily: 'Raleway'
                        }}>
                            <TextField 
                            type="text"
                            name="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            multiline rows={4} maxRows={4} style={{width:300}}
                            />
                        </Box>
                </Box>
            
                <Box width='100%' marginLeft={57} marginY={-39}>
                    <Typography 
                        sx={{
                            fontWeight: 600,
                            fontSize: 24,
                            variant: "h1",
                            color: "black"
                        }}>
                            {"Rise Apartments"}
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
                            <Input 
                            type="text"
                            name="addr"
                            placeholder="" style={{width:200}} 
                            value={addr}
                            onChange={(e) => setAddr(e.target.value)}
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
                            <Input 
                            type="text"
                            name="officeNum"
                            placeholder="" style={{width:200}} 
                            value={officeNum}
                            onChange={(e) => setOfficeNum(e.target.value)}
                            />
                        </Box>
                        <Link href="##" underline="always" color="#AB191F" fontWeight={600} >
                                {'Leasing Site'}
                        </Link>
                        <Box marginLeft={28} marginY={12}>
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
                            onClick={handleSave}
                            >
                                Save
                        </Button>
                        </Box>
                </Box>
                <Divider orientation="vertical" width={3} sx={{ borderBottomWidth: 3, color: "#AB191F", backgroundColor: "#AB191F", marginX: 48, marginY:-52, height: 270}} />
                </CardContent>
                {saveStatus && (
                <p style={{color: '#AB191F', marginLeft: "290px", marginTop: "328px"}}>{saveStatus}</p>
            )}
            </Card>
            
        </Container>
    )
}

export default PropertyManagerPage