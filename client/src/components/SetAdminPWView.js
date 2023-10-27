import * as React from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SetAdminPWView = ({ text }) => {
    let navigate = useNavigate();
    const { token } = useParams();
    const [open, setOpen] = React.useState(true);
    const [currentPassword, setCurrentPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [passwordChangeStatus, setPasswordChangeStatus] = React.useState(null);

    const handleOpen = () => {
        // setOpen(true);
    };

    const handleClose = () => {
        // setOpen(false);
        // setPasswordChangeStatus(null);
    };

    const handleChangePassword = async () => {
        if (newPassword.length < 8) {
            setPasswordChangeStatus({
                message: 'Please make sure your password is at least 8 characters',
                color: '#AB191F',
            });
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
            const response = await fetch(`http://localhost:8000/auth/admin/pw-set/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newPassword }),
            });

            console.log(response)

            if (!response.ok) {
                console.log('User is not valid');
                navigate("/Home")
                toast.error('Invalid reset token', {
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
            } else {
                console.log("user valid");
                navigate("/Admin")
                toast.success('Password set', {
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
            console.log("error");
            navigate("/Home")
                toast.error('Error resetting password', {
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
    };



    return (
        <React.Fragment>

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
                        Set Password
                    </Typography>
                </DialogTitle>
                <Divider variant="middle" sx={{ borderBottomWidth: 3, color: "#AB191F", backgroundColor: "#AB191F", marginY: 1 }} />

                <DialogContent sx={{ maxWidth: "400px" }}>
                    <Box style={{ maxWidth: "400px", justifyContent: "center" }} >
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
                            Set Password
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};

export default SetAdminPWView;
