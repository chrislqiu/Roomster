import * as React from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';



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
                          maxWidth: "400px",  
                          maxHeight: "1000px",
                          bgcolor: '#F6EBE1'
                        }
                    }
                  }}
            >
                <div sx={{justifyContent: "left"}}>
                    <DialogTitle sx={{fontWeight: 600, marginBottom: "-40px"}}> Welcome, </DialogTitle>
                    <DialogTitle sx={{fontWeight: 600, marginBottom: "-20px"}}>Create Account</DialogTitle>
                    <Divider variant="middle" sx = {{borderBottomWidth: 3, color:"#AB191F", backgroundColor:"#AB191F", marginY:1}}/>
                </div>
                
                <DialogContent sx={{maxWidth:"400px"}}>
                    <Box style = {{maxWidth:"400px", justifyContent: "center"}} >
                        <Typography sx={{ textAlign: 'center', marginBottom:"5px", marginTop: "-15px"}}>
                            Are you a...
                        </Typography>

                        <div style = {{justifyContent: "center", display: "inline", marginLeft:"70px", marginRight:"70px"}}>
                            <Button 
                                sx={{
                                    ":hover": {
                                        borderColor:"black", bgcolor:"#AB191F", color:"#F6EBE1", 
                                        borderWidth: 1.5, width:"45%", fontWeight:600
                                    },
                                    borderColor:"black", bgcolor:"#F6EBE1", color:"black", 
                                    borderWidth: 1.5, width:"45%", fontWeight:600, 
                                    boxShadow: 5, justifyContent: "center", maxWidth:"95px", maxHeight: "50px"
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
                                    borderWidth: 1.5, width:"45%", fontWeight:600, lineHeight:"15px",
                                    boxShadow: 5, marginLeft: "15px", maxWidth:"95px", maxHeight: "50px"

                                }} 
                                variant="outlined">PROPERTY MANAGER
                            </Button>
                        </div>

                    <Typography sx={{margin:1.5, marginLeft: "auto", marginTop: "15px", marginBottom: "-5px"}}>
                        Already have an account?
                    </Typography>
                    </Box>

                    <Box>
                        <Divider variant="middle" sx = {{textAlign: "center", borderBottomWidth: 3, color:"#AB191F", backgroundColor:"#AB191F", marginY:1, width: "100%", marginLeft: "auto", marginRight: "auto" }}/>
                        <div>
                            <TextField 
                                label="Email" id="email-textfield" variant="outlined" fullWidth
                                sx = {{
                                    boxShadow:"3", margin:"dense", marginBottom:"15px"
                                }}
                            />
                            <TextField 
                                label="Password" id="psw-textfield" variant="outlined" fullWidth
                                sx = {{
                                    boxShadow:"3", margin:"dense", marginBottom:"15px"
                                }}
                            />

                            <Button 
                                    sx={{
                                        ":hover": {
                                            borderColor:"black", bgcolor:"#F6EBE1", color:"black", 
                                            borderWidth: 1.5, width:"45%", fontWeight:600
                                        },
                                        borderColor:"black", bgcolor:"#AB191F", color:"#F6EBE1", 
                                        borderWidth: 1.5, width:"45%", fontWeight:600, maxWidth:"15px",
                                        boxShadow: 5, justifyContent: "center", float:"right"

                                    }} 
                                    variant="outlined">LOGIN
                                </Button>
                        </div>
                    </Box>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    )
} 
export default LoginView
 