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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '@mui/material/styles';


const AdminLogin = () => {
    const theme = useTheme();
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [loginStatus, setLoginStatus] = React.useState(null)
    const [RequestOpen, setRequestOpen] = React.useState(false)
    const [RequestUsername, setRequestUsername] = React.useState('')

    const handleRequestOpen = () => {
        setRequestOpen(true);
    };

    const handleRequestClose = () => {
        setRequestOpen(false);
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8000/auth/admin/login', {
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
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                setLoginStatus({
                    message: 'Incorrect username/password',
                    color: theme.palette.type === "light" ? '#AB191F' : "#962c1e",
                });

            }
        } catch (error) {
            setLoginStatus({
                message: 'Error logging in',
                color: theme.palette.type === "light" ? '#AB191F' : "#962c1e",
            });
        }


    }

    const handleAdminRequest = async () => {
        try {
            const response = await fetch('http://localhost:8000/auth/admin/send-admin-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // credentials: 'include',
                body: JSON.stringify({ username: RequestUsername }),
            });

            console.log(response)

            if (response.ok) {
                toast.success('Request email sent', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    style: {
                        background: theme.palette.type === "light" ? "#F6EBE1" : '#18100e' , 
                    },
                });
                handleRequestClose();
            } else {
                toast.error('User already exists', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    style: {
                        background: theme.palette.type === "light" ? "#F6EBE1" : '#18100e' ,
                    },
                });

            }
        } catch (error) {
            setLoginStatus({
                message: 'Error logging in',
                color: theme.palette.type === "light" ? '#AB191F' : "#962c1e",
            });
        }
        
    };

    const textfieldSX = {
        "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: theme.palette.type === "dark" ? "#F6EBE1" : "",
        },
        input: {
            color: "textColor",
            "&::placeholder": {
                opacity: 0.7,
                color: "textColor",
                },
        },
        margin: "0 0 10px 25px", 
        width:"280px", 
        borderRadius: "5px",
        border: "2px solid",
        borderColor: "secondaryColor",
        "& fieldset": { border: 'none', color: "textColor"},
        "& label": {color: "textColor"},
        "&:hover" : {boxShadow: theme.palette.type === 'light' ? "0px 0px 3px 3px rgba(0, 0, 0, .1)" : "0px 0px 3px 3px rgba(245, 235, 224, .1)",}       
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
                    sx={{ borderBottomWidth: 3, backgroundColor: "secondaryColor", marginY: 1, marginLeft: 0, width: "100%", }}
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
                        onClick={handleAdminRequest}
                        sx={{
                            ':hover': {
                                borderColor: 'black',
                                bgcolor: '#F6EBE1',
                                color: 'black',
                                borderWidth: 1.5,
                                width: '30%',
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
