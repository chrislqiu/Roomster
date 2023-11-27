import * as React from 'react';
import { Dialog, DialogTitle, Divider, IconButton, TextField, Container, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';


const ConfirmCancelTourView = ({open, handleClose, rowIndex, handleCancelConfirmed}) => {
    const theme = useTheme();
    //const [open, setOpen] = React.useState(true)

    // const handleClose = () => {
    //     handleCancelClicked()
    //     //setOpen(false)
    // }

    return (
            <Dialog
                open={open}
                onClose={handleClose}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            //width: "100%",
                            width: "350px",
                            height: "120px",
                            bgcolor: 'primaryColor'
                        }
                    }
                }}>
                
                <div sx={{ justifyContent: "left" }}>
                    <IconButton
                        style={{ position: "absolute", top: "0", right: "0" }}
                        onClick={() => handleClose()}
                    >
                        <CloseIcon sx={{ color: "textColor" }} />
                    </IconButton>
                    <DialogTitle sx={{ fontWeight: 600, fontSize: 20, marginBottom: "-20px", color: "textColor" }}> 
                        Are you sure you want to cancel?
                    </DialogTitle>
                    <Divider variant="middle" sx={{ borderBottomWidth: 3, backgroundColor: "secondaryColor", marginY: 1 }}/>
                </div>

                    <div style={{ justifyContent: "center", display: "inline", marginTop:"10px", marginLeft: "80px", marginRight: "70px" }}>
                            <Button
                                type="confirm"
                                onClick={() => handleCancelConfirmed(rowIndex)}
                                sx={{
                                    ":hover": {
                                        backgroundColor: "secondaryColor",
                                        border: "none",
                                        boxShadow: theme.palette.type === 'light' ? "0px 0px 3px 3px rgba(0, 0, 0, .1)" : "0px 0px 3px 3px rgba(245, 235, 224, .1)",
                                    },
                                    border: "none",
                                    backgroundColor: "secondaryColor", 
                                    color: theme.palette.type === "light" ? "primaryColor" : "textColor",
                                    width: "45%", fontWeight: 600, justifyContent: "center", maxWidth: "95px", maxHeight: "50px", marginRight:"15px"
                                }}
                                variant="outlined">YES
                            </Button>

                            <Button
                                onClick={handleClose}
                                sx={{
                                    ":hover": {
                                        backgroundColor: "secondaryColor",
                                        border: "none",
                                        boxShadow: theme.palette.type === 'light' ? "0px 0px 3px 3px rgba(0, 0, 0, .1)" : "0px 0px 3px 3px rgba(245, 235, 224, .1)",
                                    },
                                    border: "none",
                                    backgroundColor: "secondaryColor", 
                                    color: theme.palette.type === "light" ? "primaryColor" : "textColor",
                                    width: "45%", fontWeight: 600, justifyContent: "center", maxWidth: "95px", maxHeight: "50px"
                                }}
                                variant="outlined">NO
                            </Button>
                        </div>
            </Dialog>
    )
}

export default ConfirmCancelTourView