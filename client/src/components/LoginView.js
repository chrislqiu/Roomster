import * as React from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { spacing } from '@mui/system';


/**
 * Display for Log in/Create Account Pop-up
 * Jillian Urgello 
 * 
 * Colors:
 * red: #AB191F
 * yellow: #F6EBE1

 */



const LoginView = ({ text}) => {
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <React.Fragment>
            <Button 
                variant='contained'
                onClick={handleOpen}
                sx={{
                    ":hover": {
                        bgcolor:"#F6EBE1",
                        color:"#AB191F"
                    },
                    backgroundColor:"#AB191F",
                    color:"#F6EBE1"
                }}
                >
                {text}
            </Button>
            
            <Dialog
                open = {open} 
                onClose = {handleClose}
                sx = {{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                          width: "100%",
                          maxWidth: "500px",  
                          maxHeight: "1000px",
                          bgcolor: '#F6EBE1'
                        },
                    } 
                  }}
            >
                <DialogActions>
                    <IconButton
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogActions>
                
                <DialogTitle sx={{fontWeight: 600}}> Welcome, Create Account</DialogTitle>
                <Divider variant="middle" sx = {{borderBottomWidth: 3, color:"#AB191F", backgroundColor:"#AB191F", marginY:1}}/>

                
                
                <DialogContent sx={{width: '100%'}}>
                    <Box width = '600'>
                        <Typography sx={{ textAlign: 'center'}}>
                            Are you a...
                        </Typography>
                        <div >
                            <Button 
                                sx={{
                                    ":hover": {
                                        borderColor:"black", bgcolor:"#AB191F", color:"#F6EBE1", 
                                        borderWidth: 1.5, width:"45%", fontWeight:600
                                    },
                                    borderColor:"black", bgcolor:"#F6EBE1", color:"black", 
                                    borderWidth: 1.5, width:"45%", fontWeight:600,
                                    boxShadow: 5
                                }} 
                                variant="outlined">RENTER
                            </Button>
                            <Button 
                                sx={{
                                    ":hover": {
                                        borderColor:"black", bgcolor:"#AB191F", color:"#F6EBE1", 
                                        borderWidth: 1.5, width:"45%", fontWeight:600
                                    },
                                    borderColor:"black", bgcolor:"#F6EBE1", color:"black", 
                                    borderWidth: 1.5, width:"45%", fontWeight:600,
                                    boxShadow: 5

                                }} 
                                variant="outlined">PROPERTY MANAGER
                            </Button>
                        </div>

                    <Typography sx={{margin:1.5, marginLeft: "auto" }}>
                        Already have an account?
                    </Typography>
                    <Divider variant="middle" sx = {{borderBottomWidth: 3, color:"#AB191F", backgroundColor:"#AB191F", marginY:1, marginLeft: "auto", marginRight: "auto"}}/>

                    </Box>

                </DialogContent>
                

            </Dialog>

        </React.Fragment>
    )
} 
export default LoginView
 