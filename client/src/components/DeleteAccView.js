import * as React from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const DeleteAccountView = ({ text }) => {
    const [open, setOpen] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [accountDeletionStatus, setAccountDeletionStatus] = React.useState(null);

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
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                setAccountDeletionStatus('Account deleted successfully');
                handleClose();
            } else {
                setAccountDeletionStatus('Incorrect username/password');
            }
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };

    return (
        <React.Fragment>
            <Button
                variant="contained"
                onClick={handleOpen}
                sx={{
                    ":hover": {
                        bgcolor: "#F6EBE1",
                        color: "#AB191F",
                    },
                    backgroundColor: "#AB191F",
                    color: "#F6EBE1",
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
                            bgcolor: '#F6EBE1',
                        },
                    },
                }}
            >
                <DialogTitle sx={{ fontWeight: 600, marginBottom: "-20px" }}>
                    <Typography variant="inherit" color="inherit">
                        Delete Account
                    </Typography>
                </DialogTitle>
                <Divider variant="middle" sx={{ borderBottomWidth: 3, color: "#AB191F", backgroundColor: "#AB191F", marginY: 1 }} />

                <DialogContent sx={{ maxWidth: "400px" }}>
                    <Box style={{ maxWidth: "400px", justifyContent: "center" }} >
                        <TextField
                            label="Username"
                            id="username-textfield"
                            variant="outlined"
                            fullWidth
                            sx={{
                                boxShadow: "3",
                                margin: "dense",
                                marginBottom: "15px",
                            }}
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            id="password-textfield"
                            variant="outlined"
                            fullWidth
                            sx={{
                                boxShadow: "3",
                                margin: "dense",
                                marginBottom: "15px",
                            }}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {accountDeletionStatus && (
                            <p style={{ color: '#AB191F', textAlign: 'center' }}>{accountDeletionStatus}</p>
                        )}

                        <Button
                            onClick={handleDeleteAccount}
                            sx={{
                                ":hover": {
                                    borderColor: "black",
                                    bgcolor: "#F6EBE1",
                                    color: "black",
                                    borderWidth: 1.5,
                                    width: "45%",
                                    fontWeight: 600,
                                },
                                borderColor: "black",
                                bgcolor: "#AB191F",
                                color: "#F6EBE1",
                                borderWidth: 1.5,
                                width: "45%",
                                fontWeight: 600,
                                boxShadow: 5,
                                justifyContent: "center",
                                float: "right",
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