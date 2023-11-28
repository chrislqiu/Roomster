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
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';

/**
 * Display for Property Manager Create Account Pop-up
 * Jillian Urgello 
 * 
 * Colors:
 * red: #AB191F
 * yellow: #F6EBE1
 */

const ManagerCreateAccountView = ({ mCreateOpen, handleClose}) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true)
    const [managerName, setManagerName] = React.useState("")
    const [managerEmail, setManagerEmail] = React.useState("")
    const [name, setName] = React.useState("")
    const [address, setAddress] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [confirmedPassword, setConfirmedPassword] = React.useState("")
    const [signupStatus, setSignupStatus] = React.useState(null);

    const handleOpen = () => {
        setOpen(true) 
    }

    // const handleClose = () => {
    //     setOpen(false)
    //     setName(null)
    //     setManagerName(null)
    //     setManagerEmail(null)
    //     setAddress(null)
    //     setEmail(null)
    //     setPassword(null)
    //     setSignupStatus(null)
    //     window.location.replace("/Home")
    // }

    const handleBackButton = () => {
        window.location.replace("/Login")
    }

    const handleSignUp = async () => {

        const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/

        if (name === "") {
            setSignupStatus("Please enter your company name")
            return
        }

        if (managerName === "") {
            setSignupStatus("Please enter your manager name")
            return
        }

        if (address === "") {
            setSignupStatus("Please enter your company address")
            return
        }

        if (!emailRegex.test(managerEmail)) {
            setSignupStatus("Please enter a valid email address");
            return;
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
            const response = await fetch('http://localhost:8000/auth/manager-signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ username: managerEmail, password, name: managerName, email: managerEmail, companyName: name, companyEmail: email, address }),
            });

            if (response.ok) {
                console.log('Signup successful');
                window.location.href = 'http://localhost:3001/Home';
            } else if (response.status === 400) {
                setSignupStatus('User already exists. Please login to your account');
            } else {
                setSignupStatus('Error creating account');
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    const styles = {
        textfieldStyle: {
            boxShadow: "3", 
            margin: "dense", 
            marginBottom: "15px"
        }
    }

    const textfieldSX = {
        input: {
            color: "textColor",
            "&::placeholder": {
                opacity: 0.7,
                color: "textColor",
                },
        },
        "& fieldset": { border: 'none', },
        boxShadow: theme.palette.type === 'light' ? "0px 0px 3px 3px rgba(0, 0, 0, .1)" : "0px 0px 3px 3px rgba(245, 235, 224, .1)",
        marginBottom: "15px"
    }
    return (
        <React.Fragment>
            
            <Dialog
                open={mCreateOpen}
                onClose={handleClose}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "400px",
                            maxHeight: "600px",
                            bgcolor: 'primaryColor'
                        }
                    }
                }}>

                <div sx={{ justifyContent: "left" }}>
                    <IconButton
                        style={{ position: "absolute", top: "0", right: "0" }}
                        onClick={() => handleClose()}
                    >
                        <CloseIcon sx={{ color: "textColor" }} />
                    </IconButton>
                    <DialogTitle sx={{ fontWeight: 600, fontSize: 25, marginBottom: "-40px", color: "textColor" }}> Welcome, </DialogTitle>
                    <DialogTitle sx={{ fontWeight: 600, fontSize: 25, marginBottom: "-15px", color: "textColor" }}>Create Account</DialogTitle>
                    <Divider variant="middle" sx={{ borderBottomWidth: 3, backgroundColor: "secondaryColor", marginY: 1, marginBottom: 0}} />
                </div>
                <DialogContent sx={{ maxWidth: "400px" }}>
                    <div>
                        <TextField
                            size="small"
                            placeholder="Manager Name" id="managerName-textfield" variant="outlined" fullWidth
                            sx={textfieldSX}
                            onChange={(e) => setManagerName(e.target.value)}
                        />
                        <TextField
                            size="small"
                            placeholder="Manager Email" id="managerEmail-textfield" variant="outlined" fullWidth
                            sx={textfieldSX}
                            onChange={(e) => setManagerEmail(e.target.value)}
                        />
                        <TextField
                            size="small"
                            placeholder="Company Name" id="name-textfield" variant="outlined" fullWidth
                            sx={textfieldSX}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            size="small"
                            placeholder="Company Address" id="addr-textfield" variant="outlined" fullWidth
                            sx={textfieldSX}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <TextField
                            size="small"
                            placeholder="Company Email" id="email-textfield" variant="outlined" fullWidth
                            sx={textfieldSX}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            size="small"
                            placeholder="Password" id="psw-textfield" variant="outlined" type="password" fullWidth
                            sx={textfieldSX}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <TextField
                            size="small"
                            placeholder="Confirm Password" id="confirm-psw-textfield" variant="outlined" type="password" fullWidth
                            sx={textfieldSX}
                            value={confirmedPassword}
                            onChange={(e) => setConfirmedPassword(e.target.value)}
                        />

                        {signupStatus && (
                            <p style={{ color: '#AB191F', textAlign: 'center' }}>{signupStatus}</p>
                        )}

                        <Button
                            sx={{
                                ":hover": {
                                    backgroundColor: "secondaryColor", border: "none",
                                    boxShadow: theme.palette.type === 'light' ? "0px 0px 3px 3px rgba(0, 0, 0, .1)" : "0px 0px 3px 3px rgba(245, 235, 224, .1)",
                                },
                                border: "none",
                                backgroundColor: "secondaryColor", 
                                color: theme.palette.type === "light" ? "primaryColor" : "textColor",
                                width: "45%", fontWeight: 600, 
                                maxWidth: "100px",
                                justifyContent: "center", float: "right"
                            }}
                            onClick={(handleSignUp())}
                        >SIGN UP
                        </Button>

                         <IconButton
                            style={{ position: "BottomLeft", position: "sticky", top: 70, left: 0 }}
                            onClick={() => handleClose()}
                        >
                            <ArrowBackIcon
                                sx={{ color: "textColor" }}
                            />
                        </IconButton>
                    </div>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    )
}
export default ManagerCreateAccountView