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

const ForgotPwView = () => {
    const [openPwView, setOpenPwView] = React.useState(true)
    const [email, setEmail] = React.useState('')

    const handleClose = () => {
        window.location.replace("/Home")
    }

    const handleLogin = () => {
        
    }
    return (
        <React.Fragment>
            <Dialog
            open={openPwView}
            onClose={handleClose}
            sx={{
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        width: "100%",
                        maxWidth: "400px",
                        maxHeight: "1000px",
                        bgcolor: '#F6EBE1'
                    }
                }
            }}>
                <div sx={{justifyContent: "left"}}>
                    <IconButton
                        style={{ position: "absolute", top: "0", right: "0" }}
                        onClick={() => handleClose()}
                    >
                        <CloseIcon style={{ color: "black" }} />
                    </IconButton>
                    <DialogTitle sx={{fontWeight: 600, fontSize:25, marginBottom: "-15px"}}>Forgot Your Password?</DialogTitle>
                    <Divider variant="middle" sx = {{borderBottomWidth: 3, color:"#AB191F", backgroundColor:"#AB191F", marginY:1}}/>
                    <Typography sx={{
                        fontWeight: 400, 
                        fontSize:"10pt", 
                        margin: "0 0 0px 20px",
                        padding: "0 20px 0 0"
                        }}>
                        Enter your email and we'll send you a link to get back into your account.
                    </Typography>
                </div>
                <DialogContent sx={{ maxWidth: "400px" }}>               
                    <TextField
                        label="Email" id="email-textfield" variant="outlined" fullWidth
                        sx={{
                            boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, .1)", margin: "dense", marginBottom: "15px"
                        }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                        onClick={handleLogin}
                        sx={{
                            padding: "0 -20px 0 -20px",
                            borderColor: "black", bgcolor: "#AB191F", color: "#F6EBE1",
                            borderWidth: 1.5, width: "45%", fontWeight: 600,
                            boxShadow: 5, justifyContent: "center", float: "right",
                            ":hover": {
                                borderColor: "black", bgcolor: "#F6EBE1", color: "black",
                                borderWidth: 1.5, width: "45%", fontWeight: 600
                            },
                            

                        }}
                        variant="outlined">SEND LOGIN LINK
                    </Button>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    )
}

export default ForgotPwView;
