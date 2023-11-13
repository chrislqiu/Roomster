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
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';

const Settings = () => {
    const theme = useTheme();
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
                        bgcolor: "primaryColor",
                        color: "secondaryColor",
                    },
                    backgroundColor: "secondaryColor",
                    color: "primaryColor",
                    margin: 1, 
                    zIndex: "5"
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
                            bgcolor: 'primaryColor',
                            boxShadow: theme.palette.type === 'light' ? "0px 0px 3px 3px rgba(0, 0, 0, .1)" : "0px 0px 3px 3px rgba(245, 235, 224, .1)",
                        },
                    },
                }}
            >
                <DialogTitle sx={{ fontWeight: 600, padding: "10px 0 0 25px", color: "textColor" }}>
                    Settings
                </DialogTitle>
                <Divider variant="middle" sx={{ borderBottomWidth: 3, backgroundColor: "secondaryColor", marginY: 1 }} />

                <DialogContent sx={{ maxWidth: "400px" }}>
                    <Box style={{ maxWidth: "400px", justifyContent: "center" }} >
                        <Box sx={{ margin: "-10px 10px 10px 10px" }}>
                            <ChangePWView text={"Change password"} />
                        </Box>
                        <Box sx={{ margin: "0px 10px 10px 10px" }}>
                            <DeleteAccView text={"Delete account"} />
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};

export default Settings;
