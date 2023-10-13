import * as React from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import ChangePWView from "../components/ChangePWView"
import DeleteAccView from "../components/DeleteAccView"
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';

const Settings = () => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <IconButton
                onClick={handleOpen}
                sx={{
                    ":hover": {
                        bgcolor: "#F6EBE1",
                        color: "#AB191F",
                    },
                    backgroundColor: "#AB191F",
                    color: "#F6EBE1",
                    margin: 1, 
                }}
            >
                <SettingsIcon />
            </IconButton>

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
                    Settings
                </DialogTitle>
                <Divider variant="middle" sx={{ borderBottomWidth: 3, color: "#AB191F", backgroundColor: "#AB191F", marginY: 1 }} />

                <DialogContent sx={{ maxWidth: "400px" }}>
                    <Box style={{ maxWidth: "400px", justifyContent: "center" }} >
                        <Box sx={{ m: 1 }}>
                            <ChangePWView text={"Change password"} />
                        </Box>
                        <Box sx={{ m: 1 }}>
                            <DeleteAccView text={"Delete account"} />
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};

export default Settings;
