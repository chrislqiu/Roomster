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
 * Display for Property Manager Create Account Pop-up
 * Jillian Urgello 
 * 
 * Colors:
 * red: #AB191F
 * yellow: #F6EBE1
 */

const ManagerCreateAccountView = ({ }) => {
    const [open, setOpen] = React.useState(true)
    const [name, setName] = React.useState("")
    const [address, setAddress] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [confirmedPassword, setConfirmedPassword] = React.useState("")
    const [signupStatus, setSignupStatus] = React.useState(null);

    const handleOpen = () => {
        setOpen(true) 
    }

    const handleClose = () => {
        setOpen(false)
        setName(null)
        setAddress(null)
        setEmail(null)
        setPassword(null)
        setSignupStatus(null)
        window.location.replace("/Home")
    }

    const handleBackButton = () => {
        window.location.replace("/Login")
    }

    const handleSignUp = async () => {

        const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/

        if (name === "") {
            setSignupStatus("Please enter your company name")
            return
        }

        if (address === "") {
            setSignupStatus("Please enter your company address")
            return
        }

        if (!emailRegex.test(email)) {
            setSignupStatus("Please enter a valid email address");
            return;
        }

        if (password.localeCompare(confirmedPassword)) {
            setSignupStatus("Please make sure your passwords match")
            return
        }

        if (password.length < 8) {
            setSignupStatus("Please make sure your password is at least 8 characters")
            return
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
                setSignupStatus('User already exists. Please login to your account');
            } else {
                setSignupStatus('Error creating account');
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    return (
        <React.Fragment>
            
            <Dialog
                open={true}
                onClose={handleClose}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "400px",
                            maxHeight: "600px",
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
                            label="Company Name" id="name-textfield" variant="outlined" fullWidth
                            inputProps={{ style: { fontSize: 15 } }}
                            inputLabelProps={{ style: { fontSize: 15 } }}
                            sx={{
                                boxShadow: "3", margin: "dense", marginBottom: "15px"
                            }}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            label="Company address" id="addr-textfield" variant="outlined" fullWidth
                            inputProps={{ style: { fontSize: 15 } }}
                            inputLabelProps={{ style: { fontSize: 15 } }}
                            sx={{
                                boxShadow: "3", margin: "dense", marginBottom: "15px"
                            }}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <TextField
                            label="Company Email" id="email-textfield" variant="outlined" fullWidth
                            inputProps={{ style: { fontSize: 15 } }}
                            inputLabelProps={{ style: { fontSize: 15, marginBottom: "15px" } }}
                            sx={{
                                boxShadow: "3", margin: "dense", marginBottom: "15px",
                            }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Password" id="psw-textfield" variant="outlined" type="password" fullWidth
                            inputProps={{ style: { fontSize: 15 } }}
                            inputLabelProps={{ style: { fontSize: 15 } }}
                            sx={{
                                boxShadow: "3", margin: "dense", marginBottom: "15px"
                            }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <TextField
                            label="Confirm Password" id="confirm-psw-textfield" variant="outlined" type="password" fullWidth
                            inputProps={{ style: { fontSize: 15 } }}
                            inputLabelProps={{ style: { fontSize: 15 } }}
                            sx={{
                                boxShadow: "3", margin: "dense", marginBottom: "15px"
                            }}
                            value={confirmedPassword}
                            onChange={(e) => setConfirmedPassword(e.target.value)}
                        />

                        {signupStatus && (
                            <p style={{ color: '#AB191F', textAlign: 'center' }}>{signupStatus}</p>
                        )}

                        <Button
                            sx={{
                                ":hover": {
                                    borderColor: "#F6EBE1", bgcolor: "#F6EBE1", color: "#AB191F",
                                    borderWidth: 1.5, width: "45%", fontWeight: 600, position:"sticky"
                                },
                                borderColor: "#AB191F", bgcolor: "#AB191F", color: "#F6EBE1",
                                borderWidth: 1.5, width: "45%", fontWeight: 600, maxWidth: "100px",
                                boxShadow: 5, justifyContent: "center", float: "right", position:"sticky"

                            }}
                            variant="outlined"
                            onClick={handleSignUp}
                        >SIGN UP
                        </Button>

                        <IconButton
                            style={{ position: "BottomLeft", position: "sticky", top: 70, left: 0 }}
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
export default ManagerCreateAccountView