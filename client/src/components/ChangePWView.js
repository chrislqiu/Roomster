import * as React from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const ChangePasswordView = ({ text }) => {
    const [open, setOpen] = React.useState(false);
    const [currentPassword, setCurrentPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [passwordChangeStatus, setPasswordChangeStatus] = React.useState(null);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setPasswordChangeStatus(null);
    };

    const handleChangePassword = async () => {

        if (password.length < 8) {
            setPasswordChangeStatus("Please make sure your password is at least 8 characters");
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordChangeStatus({
                message: 'New password and confirm password do not match',
                color: '#AB191F',
            });
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/auth/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
            });

            if (response.ok) {
                setPasswordChangeStatus({
                    message: 'Password changed successfully',
                    color: 'green',
                });

                setTimeout(() => {
                    handleClose();
                }, 2000); 
            } else {
                setPasswordChangeStatus({
                    message: 'Current password is incorrect',
                    color: '#AB191F', 
                });
            }
        } catch (error) {
            setPasswordChangeStatus({
                message: 'Error changing password',
                color: '#AB191F', 
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
                        Change Password
                    </Typography>
                </DialogTitle>
                <Divider variant="middle" sx={{ borderBottomWidth: 3, color: "#AB191F", backgroundColor: "#AB191F", marginY: 1 }} />

                <DialogContent sx={{ maxWidth: "400px" }}>
                    <Box style={{ maxWidth: "400px", justifyContent: "center" }} >
                        <TextField
                            label="Current Password"
                            id="current-password-textfield"
                            variant="outlined"
                            fullWidth
                            sx={{
                                boxShadow: "3",
                                margin: "dense",
                                marginBottom: "15px",
                            }}
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        <TextField
                            label="New Password"
                            id="new-password-textfield"
                            variant="outlined"
                            fullWidth
                            sx={{
                                boxShadow: "3",
                                margin: "dense",
                                marginBottom: "15px",
                            }}
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <TextField
                            label="Confirm Password"
                            id="confirm-password-textfield"
                            variant="outlined"
                            fullWidth
                            sx={{
                                boxShadow: "3",
                                margin: "dense",
                                marginBottom: "15px",
                            }}
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        {passwordChangeStatus && (
                            <p style={{ color: passwordChangeStatus.color, textAlign: 'center' }}>
                                {passwordChangeStatus.message}
                            </p>
                        )}

                        <Button
                            onClick={handleChangePassword}
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
                            Change Password
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};

export default ChangePasswordView;
