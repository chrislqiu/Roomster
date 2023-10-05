import { Container, Card, Box, Typography, CardContent, Input, Divider, TextField, Link, Button } from "@mui/material";
import React from "react"

const PropertyManagerPage = () => {

    return (
        <Container sx={{ width: '600' }}>
            <Card
                variant='contained'
                sx={{
                   backgroundColor: "#f5ebe0",
                    color: "#AB191F",
                    width: "800px",
                    height: "355px",
                    boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, .1)",
                    marginBottom: "50px",
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
                            <Input placeholder="Phone Number" style={{width:200}}/>
                        </Box>
                        <Box sx={{
                            fontWeight: 600,
                            fontSize: 12,
                            marginTop: 2,
                            fontFamily: 'Raleway'
                        }}>
                            <Input placeholder="Email Address" style={{width:200}} />
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
                            <Input placeholder="" style={{width:200}} />
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
                            <Input placeholder="" style={{width:200}} />
                        </Box>
                        <Link href="##" underline="always" color="#AB191F" fontWeight={600} >
                                {'Leasing Site'}
                        </Link>
                        <Box marginLeft={28} marginY={7}>
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
                            >
                                Save
                        </Button>
                        </Box>
                </Box>
                <Divider orientation="vertical" width={3} sx={{ borderBottomWidth: 3, color: "#AB191F", backgroundColor: "#AB191F", marginX: 48, marginY:-43, height: 270}} />
                </CardContent>
            </Card>
        </Container>
    )
}

export default PropertyManagerPage