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

const ChangePasswordView = ({ text }) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [currentPassword, setCurrentPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [passwordChangeStatus, setPasswordChangeStatus] = React.useState(null);

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
        setPasswordChangeStatus(null);
    };

    const handleChangePassword = async () => {
        if (newPassword.length < 8) {
            setPasswordChangeStatus({
                message: 'Please make sure your password is at least 8 characters',
                color: 'secondaryColor',
            });
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordChangeStatus({
                message: 'New password and confirm password do not match',
                color: 'secondaryColor',
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
                    color: 'secondaryColor', 
                });
            }
        } catch (error) {
            setPasswordChangeStatus({
                message: 'Error changing password',
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
                        Change Password
                    </Typography>
                </DialogTitle>
                <Divider variant="middle" sx={{ borderBottomWidth: 3, backgroundColor: "secondaryColor", marginY: 1, marginBottom:"0px" }} />

                <DialogContent sx={{ maxWidth: "400px" }}>
                    <Box style={{ maxWidth: "400px", justifyContent: "center" }} >
                        <TextField
                            placeholder="Current Password"
                            id="current-password-textfield"
                            variant="outlined"
                            fullWidth
                            sx={textfieldSX}
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        <TextField
                            placeholder="New Password"
                            id="new-password-textfield"
                            variant="outlined"
                            fullWidth
                            sx={textfieldSX}
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <TextField
                            placeholder="Confirm Password"
                            id="confirm-password-textfield"
                            variant="outlined"
                            fullWidth
                            sx={textfieldSX}
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
                            Change Password
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};

export default ChangePasswordView;
