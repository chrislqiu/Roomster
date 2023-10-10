import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoginView from './LoginView';
import MainPage from '../pages/MainPage';
/**
 * Display for Renter Create Account Pop-up
 * Jillian Urgello 
 * 
 * Colors:
 * red: #AB191F
 * yellow: #F6EBE1
 */

const RenterCreateAccountView = ({ }) => {
    const [open, setOpen] = React.useState(true)
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [signupStatus, setSignupStatus] = React.useState(null);

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
        setEmail(null)
        setPassword(null)
        setSignupStatus(null)
    }

    const handleBackButton = () => {
        window.location.replace("/Login")
    }

    const handleSignUp = async () => {

        const emailRegex = /^[a-zA-Z0-9._-]+@purdue\.edu$/;

        if (!emailRegex.test(email)) {
            setSignupStatus("Please enter a valid Purdue email address");
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: email, password }),
            });

            if (response.ok) {
                console.log('Signup successful');
                handleClose();
            } else if (response.status === 400) {
                setSignupStatus('User already exists');
            } else {
                setSignupStatus('Error creating account');
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    return (
        <React.Fragment>

            <Button
                variant='contained'
                onClick={handleOpen}
                sx={{
                    ":hover": {
                        bgcolor: "#F6EBE1",
                        color: "#AB191F"
                    },
                    backgroundColor: "#AB191F",
                    color: "#F6EBE1"
                }} >
                { }
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            height: "100%",
                            maxWidth: "400px",
                            maxHeight: "450px",
                            bgcolor: '#F6EBE1'
                        }
                    }
                }}>

                <div sx={{ justifyContent: "left" }}>
                    <IconButton
                        style={{ position: "absolute", top: "0", right: "0" }}
                        onClick={() => handleClose()}
                    >
                        <CloseIcon style={{ color: "black" }} />
                    </IconButton>



                    <DialogTitle sx={{ fontWeight: 600, fontSize: 25, marginBottom: "-40px" }}> Welcome, </DialogTitle>
                    <DialogTitle sx={{ fontWeight: 600, fontSize: 25, marginBottom: "-15px" }}>Create Account</DialogTitle>
                    <Divider variant="middle" sx={{ borderBottomWidth: 3, color: "#AB191F", backgroundColor: "#AB191F", marginY: 1 }} />
                </div>
                <DialogContent sx={{ maxWidth: "400px" }}>
                    <div>
                        <TextField
                            label="Name" id="name-textfield" variant="outlined" fullWidth
                            inputProps={{ style: { fontSize: 10 } }}
                            inputLabelProps={{ style: { fontSize: 10 } }}
                            sx={{
                                boxShadow: "3", margin: "dense", marginBottom: "15px"
                            }}
                        />
                        <TextField
                            label="Purdue Email" id="email-textfield" variant="outlined" fullWidth
                            inputProps={{ style: { fontSize: 10 } }}
                            inputLabelProps={{ style: { fontSize: 10, marginBottom: "15px" } }}
                            sx={{
                                boxShadow: "3", margin: "dense", marginBottom: "15px",
                            }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Password" id="psw-textfield" variant="outlined" fullWidth
                            inputProps={{ style: { fontSize: 10 } }}
                            inputLabelProps={{ style: { fontSize: 10 } }}
                            sx={{
                                boxShadow: "3", margin: "dense", marginBottom: "15px"
                            }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <TextField
                            label="Confirm Password" id="confirm-psw-textfield" variant="outlined" fullWidth
                            inputProps={{ style: { fontSize: 10 } }}
                            inputLabelProps={{ style: { fontSize: 10 } }}
                            sx={{
                                boxShadow: "3", margin: "dense", marginBottom: "15px"
                            }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {signupStatus && (
                            <p style={{ color: '#AB191F', textAlign: 'center' }}>{signupStatus}</p>
                        )}

                        <Button
                            sx={{
                                ":hover": {
                                    borderColor: "#F6EBE1", bgcolor: "#F6EBE1", color: "#AB191F",
                                    borderWidth: 1.5, width: "45%", fontWeight: 600
                                },
                                borderColor: "#AB191F", bgcolor: "#AB191F", color: "#F6EBE1",
                                borderWidth: 1.5, width: "45%", fontWeight: 600, maxWidth: "100px",
                                boxShadow: 5, justifyContent: "center", float: "right"

                            }}
                            variant="outlined"
                            onClick={handleSignUp}
                        >SIGN UP
                        </Button>

                        <IconButton
                            style={{ position: "BottomLeft", top: 25, left: 0 }}
                            onClick={() => handleBackButton()}

                        >
                            <ArrowBackIcon
                                style={{ color: "black" }}
                            />
                        </IconButton>

                    </div>
                </DialogContent>
            </Dialog>

        </React.Fragment>
    )
}
export default RenterCreateAccountView