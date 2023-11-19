import * as React from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';

const DeleteAccountView = ({ text }) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [accountDeletionStatus, setAccountDeletionStatus] = React.useState(null);

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

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setAccountDeletionStatus(null);
    };

    const handleDeleteAccount = async () => {
        try {
            const response = await fetch('http://localhost:8000/auth/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                setAccountDeletionStatus({
                    message: 'Account deleted successfully',
                    color: 'green',
                });
                setTimeout(() => {
                    window.location.href = 'http://localhost:3001/Home';
                }, 2000);

            } else {
                setAccountDeletionStatus({
                    message: 'Incorrect username/password',
                    color: 'secondaryColor',
                });
            }
        } catch (error) {
            setAccountDeletionStatus({
                message: 'Error deleting account',
                color: 'secondaryColor',
            });
        }
    };

    return (
        <React.Fragment>
            <Button
                variant="contained"
                onClick={handleOpen}
                sx={{
                    ":hover": {
                        backgroundColor: "secondaryColor",
                        border: "none",
                        boxShadow: theme.palette.type === 'light' ? "0px 0px 3px 3px rgba(0, 0, 0, .1)" : "0px 0px 3px 3px rgba(245, 235, 224, .1)",
                    },
                    border: "none",
                    backgroundColor: "secondaryColor", 
                    color: theme.palette.type === "light" ? "primaryColor" : "textColor",
                    fontWeight: 500,
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
                            width: "100%",
                            maxWidth: "400px",
                            maxHeight: "1000px",
                            bgcolor: 'primaryColor',
                            boxShadow: theme.palette.type === 'light' ? "0px 0px 3px 3px rgba(0, 0, 0, .1)" : "0px 0px 3px 3px rgba(245, 235, 224, .1)",
                        },
                    },
                }}
            >
                <DialogTitle sx={{ fontWeight: 600, marginBottom: "-20px" }}>
                    <Typography variant="inherit" color="textColor">
                        Delete Account
                    </Typography>
                </DialogTitle>
                <Divider variant="middle" sx={{ borderBottomWidth: 3, backgroundColor: "secondaryColor", marginY: 1, marginBottom: "0px" }} />

                <DialogContent sx={{ maxWidth: "400px" }}>
                    <Box style={{ maxWidth: "400px", justifyContent: "center" }} >
                        <TextField
                            placeholder="Username"
                            id="username-textfield"
                            variant="outlined"
                            fullWidth
                            sx={textfieldSX}
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            placeholder="Password"
                            id="password-textfield"
                            variant="outlined"
                            fullWidth
                            sx={textfieldSX}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {accountDeletionStatus && (
                            <p style={{ color: accountDeletionStatus.color, textAlign: 'center' }}>
                                {accountDeletionStatus.message}
                            </p>)}

                        <Button
                            onClick={handleDeleteAccount}
                            sx={{
                                ":hover": {
                                    backgroundColor: "secondaryColor",
                                    border: "none",
                                    boxShadow: theme.palette.type === 'light' ? "0px 0px 3px 3px rgba(0, 0, 0, .1)" : "0px 0px 3px 3px rgba(245, 235, 224, .1)",
                                },
                                border: "none", float: "right",
                                backgroundColor: "secondaryColor", 
                                color: theme.palette.type === "light" ? "primaryColor" : "textColor",
                                fontWeight: 500,
                            }}
                            variant="outlined"
                        >
                            Delete Account
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};

export default DeleteAccountView;
