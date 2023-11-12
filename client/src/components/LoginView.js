import * as React from 'react';
import Button from '@mui/material/Button';
import { Box, Link } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import RenterCreateAccountView from './RenterCreateAccountView';
import RenterCreateAccountPage from '../pages/RenterCreateAccountPage';
import ManagerCreateAccountView from './PropertyManagerCreateAccountView';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ForgotPwView from './ForgotPwView';


/**
 * Display for Log in/Create Account Pop-up
 * Jillian Urgello 
 * 
 * Colors:
 * red: #AB191F
 * yellow: #F6EBE1

 */



const LoginView = ({ text }) => {
    const [open, setOpen] = React.useState(false)
    const [rCreateOpen, setRCreateOpen] = React.useState(false)
    const [mCreateOpen, setMCreateOpen] = React.useState(false)
    const [forgotPwOpen, setforgotPwOpen] = React.useState(false)
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [loginStatus, setLoginStatus] = React.useState(null)
    const [resetPasswordOpen, setResetPasswordOpen] = React.useState(false);
    const [resetPasswordUsername, setResetPasswordUsername] = React.useState('');

    const handleResetPasswordOpen = () => {
        setResetPasswordOpen(true);
        handleClose();

    };

    const handleResetPasswordClose = () => {
        setResetPasswordOpen(false);
        setResetPasswordUsername('');
        setOpen(true);
    };


    const handleOpen = () => {
        setOpen(true)
        //setMCreateOpen(false)
    }
    const handleClose = () => {
        setOpen(false)
        setLoginStatus(null)
    }

    const handleForgotPw = () => {
        setforgotPwOpen(true);
    }


    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ username: email, password }),
            });

            if (response.ok) {
                setLoginStatus({
                    message: 'Logging in...',
                    color: 'green',
                });
                // handleClose();
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                setLoginStatus({
                    message: 'Incorrect username/password',
                    color: '#AB191F',
                });

            }
        } catch (error) {
            setLoginStatus({
                message: 'Error logging in',
                color: '#AB191F',
            });
        }
    }

    const handleResetPassword = async () => {
        try {
            const response = await fetch('http://localhost:8000/auth/send-pw-reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // credentials: 'include',
                body: JSON.stringify({ username: resetPasswordUsername }),
            });

            console.log(response)

            if (response.ok) {
                toast.success('Reset email sent', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    style: {
                        background: "#F6EBE1", 
                      },
                });
                handleResetPasswordClose();
                handleClose();
            } else {
                toast.error('User does not exist', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    style: {
                        background: "#F6EBE1", 
                      },
                });

            }
        } catch (error) {
            setLoginStatus({
                message: 'Error logging in',
                color: '#AB191F',
            });
        }
        
    };



    return (
        <React.Fragment>
            <ToastContainer />
            <Button
                variant='contained'
                onClick={handleOpen}
                sx={{
                    zIndex: "5",
                    my: 2,
                    ":hover": {
                        bgcolor: "#AB191F",
                        color: "#f5ebe0",
                        cursor: "pointer"
                    },
                    color: "#AB191F",
                    backgroundColor: "#F6EBE1",
                    display: "block",
                    mx: .5,
                    fontWeight: 600,
                    padding: 1,
                    boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, .1)"
                }}
            >
                {text}
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            opacity: forgotPwOpen ? "0" : "1",
                            width: "100%",
                            maxWidth: "400px",
                            maxHeight: "1000px",
                            bgcolor: '#F6EBE1'
                        }
                    }
                }}
            >
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
                    <Box style={{ maxWidth: "400px", justifyContent: "center" }} >
                        <Typography sx={{ textAlign: 'center', marginBottom: "5px", marginTop: "-15px" }}>
                            Are you a...
                        </Typography>

                        <div style={{ justifyContent: "center", display: "inline", marginLeft: "70px", marginRight: "70px" }}>


                            <Button
                                type="RCreate"
                                onClick={() => setRCreateOpen(true)}
                                sx={{
                                    ":hover": {
                                        borderColor: "#AB191F", bgcolor: "#AB191F", color: "#F6EBE1",
                                        borderWidth: 1.5, width: "45%", fontWeight: 600
                                    },
                                    borderColor: "#F6EBE1", bgcolor: "#F6EBE1", color: "#AB191F",
                                    borderWidth: 1.5, width: "45%", fontWeight: 600,
                                    boxShadow: 5, justifyContent: "center", maxWidth: "95px", maxHeight: "50px"
                                }}
                                variant="outlined">RENTER
                            </Button>

                            <Button
                                onClick={() => setMCreateOpen(true)}
                                sx={{
                                    ":hover": {
                                        borderColor: "#AB191F", bgcolor: "#AB191F", color: "#F6EBE1",
                                        borderWidth: 1.5, width: "45%", fontWeight: 600
                                    },
                                    borderColor: "#F6EBE1", bgcolor: "#F6EBE1", color: "#AB191F",
                                    borderWidth: 1.5, width: "45%", fontWeight: 600, lineHeight: "15px",
                                    boxShadow: 5, marginLeft: "15px", maxWidth: "95px", maxHeight: "50px"

                                }}
                                variant="outlined">PROPERTY MANAGER
                            </Button>
                            {rCreateOpen && <RenterCreateAccountView />}
                            {mCreateOpen && <ManagerCreateAccountView />}
                        </div>

                        <Typography sx={{ margin: 1.5, marginLeft: "auto", marginTop: "15px", marginBottom: "-5px" }}>
                            Already have an account?
                        </Typography>
                    </Box>

                    <Box>
                        <Divider variant="middle" sx={{ textAlign: "center", borderBottomWidth: 3, color: "#AB191F", backgroundColor: "#AB191F", marginY: 1, width: "100%", marginLeft: "auto", marginRight: "auto" }} />
                        <div>
                            <TextField
                                label="Email" id="email-textfield" variant="outlined" fullWidth
                                sx={{
                                    boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, .1)", margin: "dense", marginBottom: "15px"
                                }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                label="Password" id="psw-textfield" variant="outlined" fullWidth
                                sx={{
                                    boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, .1)", margin: "dense", 
                                }}
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            {loginStatus && (
                                <p style={{ color: loginStatus.color, textAlign: 'center' }}>
                                    {loginStatus.message}
                                </p>
                            )}

                            
                            {forgotPwOpen === true && <ForgotPwView setOpen={setOpen}></ForgotPwView>}
                            <Button
                                onClick={handleLogin}
                                sx={{
                                    ":hover": {
                                        borderColor: "black", bgcolor: "#F6EBE1", color: "black",
                                        borderWidth: 1.5, width: "45%", fontWeight: 600
                                    },
                                    borderColor: "black", bgcolor: "#AB191F", color: "#F6EBE1",
                                    borderWidth: 1.5, width: "45%", fontWeight: 600, maxWidth: "15px",
                                    boxShadow: 5, justifyContent: "center", float: "right"

                                }}
                                variant="outlined">LOGIN
                            </Button>
                            <Typography
                                sx={{ margin: 1.5, marginLeft: "auto", marginTop: "15px", color: "#AB191F", cursor: "pointer" }}
                                onClick={handleResetPasswordOpen}
                            >
                                Reset Password
                            </Typography>
                        </div>
                    </Box>
                    
                </DialogContent>
            </Dialog>
            <Dialog
                open={resetPasswordOpen}
                onClose={handleResetPasswordClose}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "400px",
                            maxHeight: "1000px",
                            bgcolor: '#F6EBE1'
                        }
                    }
                }}
            >
                <DialogTitle sx={{ fontWeight: 600, fontSize: 25 }}>Reset Password</DialogTitle>                <DialogContent sx={{ maxWidth: "400px" }}>
                    <TextField
                        label="Username"
                        id="username-textfield"
                        variant="outlined"
                        fullWidth
                        sx={{
                            boxShadow: "3",
                            margin: "dense",
                            marginBottom: "15px",
                            marginTop: "10px"
                        }}
                        value={resetPasswordUsername}
                        onChange={(e) => setResetPasswordUsername(e.target.value)}
                    />

                    <Button
                        onClick={handleResetPassword}
                        sx={{
                            ":hover": {
                                borderColor: "black", bgcolor: "#F6EBE1", color: "black",
                                borderWidth: 1.5, width: "100%", fontWeight: 600
                            },
                            borderColor: "black", bgcolor: "#AB191F", color: "#F6EBE1",
                            borderWidth: 1.5, width: "100%", fontWeight: 600, maxWidth: "150px",
                            boxShadow: 5, justifyContent: "center", float: "right"
                        }}
                        variant="outlined"
                    >
                        Reset Password
                    </Button>
                </DialogContent>
            </Dialog>
            <Dialog
                open={resetPasswordOpen}
                onClose={handleResetPasswordClose}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "400px",
                            maxHeight: "1000px",
                            bgcolor: '#F6EBE1'
                        }
                    }
                }}
            >
                <DialogTitle sx={{ fontWeight: 600, fontSize: 25 }}>Reset Password</DialogTitle>                <DialogContent sx={{ maxWidth: "400px" }}>
                    <TextField
                        label="Username"
                        id="username-textfield"
                        variant="outlined"
                        fullWidth
                        sx={{
                            boxShadow: "3",
                            margin: "dense",
                            marginBottom: "15px",
                            marginTop: "10px"
                        }}
                        value={resetPasswordUsername}
                        onChange={(e) => setResetPasswordUsername(e.target.value)}
                    />

                    <Button
                        onClick={handleResetPassword}
                        sx={{
                            ":hover": {
                                borderColor: "black", bgcolor: "#F6EBE1", color: "black",
                                borderWidth: 1.5, width: "100%", fontWeight: 600
                            },
                            borderColor: "black", bgcolor: "#AB191F", color: "#F6EBE1",
                            borderWidth: 1.5, width: "100%", fontWeight: 600, maxWidth: "150px",
                            boxShadow: 5, justifyContent: "center", float: "right"
                        }}
                        variant="outlined"
                    >
                        Reset Password
                    </Button>
                    
                </DialogContent>
            </Dialog>
        </React.Fragment>
    )
}
export default LoginView
