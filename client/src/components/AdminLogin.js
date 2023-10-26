import * as React from 'react';
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
import RenterCreateAccountView from './RenterCreateAccountView';
import RenterCreateAccountPage from '../pages/RenterCreateAccountPage';
import ManagerCreateAccountView from './PropertyManagerCreateAccountView';



/**
 * Display for Log in/Create Account Pop-up
 * Jillian Urgello 
 * 
 * Colors:
 * red: #AB191F
 * yellow: #F6EBE1

 */





const AdminLogin = ({ text }) => {
    const [open, setOpen] = React.useState(true)
    const [rCreateOpen, setRCreateOpen] = React.useState(false)
    const [mCreateOpen, setMCreateOpen] = React.useState(false)
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [loginStatus, setLoginStatus] = React.useState(null)
    const [RequestOpen, setRequestOpen] = React.useState(false)
    const [RequestUsername, setRequestUsername] = React.useState('')

    const handleOpen = () => {
        setOpen(true)
        //setMCreateOpen(false)
    }
    const handleClose = () => {
        // setOpen(false)
        setLoginStatus(null)
    }


    const handleRequest = () => {
        // ... (implement the logic for resetting the password)
        console.log('Resetting password...');
    };

    const handleRequestOpen = () => {
        setRequestOpen(true);
    };

    const handleRequestClose = () => {
        setRequestOpen(false);
    };

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

            console.log(response)

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

    const handleRCreate = event => {
        //handleClose()
        //setRCreateOpen(prev => !prev)   
        window.location.replace("/RCreate")
        //return <RenterCreateAccountView text={"hello"} />
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div style={{ width: "35%" }}>
                <DialogTitle sx={{ fontWeight: 600, fontSize: 25, marginBottom: "-15px" }}>
                    Admin Login
                </DialogTitle>
                <Divider
                    variant="middle"
                    sx={{ borderBottomWidth: 3, color: "#AB191F", backgroundColor: "#AB191F", marginY: 1, marginLeft: 0, width: "100%", }}
                />
            </div>

            <DialogContent sx={{ maxWidth: "400px" }}>


                <Box>

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
                                boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, .1)", margin: "dense", marginBottom: "15px"
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
                            variant="outlined"
                        >
                            LOGIN
                        </Button>
                        <Typography
                            sx={{ margin: 1.5, marginLeft: "auto", marginTop: "15px", color: "#AB191F", cursor: "pointer" }}
                            onClick={handleRequestOpen}
                        >
                            Request Admin Account
                        </Typography>
                    </div>
                </Box>
            </DialogContent>
            <Dialog
                open={RequestOpen}
                onClose={handleRequestClose}
                sx={{
                    '& .MuiDialog-container': {
                        '& .MuiPaper-root': {
                            width: '100%',
                            maxWidth: '400px',
                            maxHeight: '1000px',
                            bgcolor: '#F6EBE1',
                        },
                    },
                }}
            >
                <DialogTitle sx={{ fontWeight: 600, fontSize: 25 }}>Admin Account Request</DialogTitle>
                <DialogContent sx={{ maxWidth: '400px' }}>
                    <TextField
                        label="Email"
                        id="username-textfield"
                        variant="outlined"
                        fullWidth
                        sx={{
                            boxShadow: '3',
                            margin: 'dense',
                            marginBottom: '15px',
                            marginTop: '10px',
                        }}
                        value={RequestUsername}
                        onChange={(e) => setRequestUsername(e.target.value)}
                    />

                    <Button
                        onClick={handleRequest}
                        sx={{
                            ':hover': {
                                borderColor: 'black',
                                bgcolor: '#F6EBE1',
                                color: 'black',
                                borderWidth: 1.5,
                                width: '100%',
                                fontWeight: 600,
                            },
                            borderColor: 'black',
                            bgcolor: '#AB191F',
                            color: '#F6EBE1',
                            borderWidth: 1.5,
                            width: '30%',
                            fontWeight: 600,
                            maxWidth: '150px',
                            boxShadow: 5,
                            justifyContent: 'center',
                            float: 'right',
                        }}
                        variant="outlined"
                    >
                        Request
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );

}
export default AdminLogin
