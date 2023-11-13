import * as React from 'react';
import { Dialog, DialogTitle, Divider, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ScheduleTourView = ({}) => {
    const [open, setOpen] = React.useState(false)

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    
    return (
        <React.Fragment>
             <Dialog
                open={setOpen}
                onClose={handleClose}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "400px",
                            maxHeight: "1000px",
                            bgcolor: '#F6EBE1'
                        }
                    }
                }}
            > HELLO IM HERE

                <div sx={{ justifyContent: "left" }}>
                    <IconButton
                        style={{ position: "absolute", top: "0", right: "0" }}
                        onClick={() => handleClose()}
                    >
                        <CloseIcon style={{ color: "black" }} />
                    </IconButton>
                    <DialogTitle sx={{ fontWeight: 600, fontSize: 25, marginBottom: "-40px" }}> Schedule Tour </DialogTitle>
                    <Divider variant="middle" sx={{ borderBottomWidth: 3, color: "#AB191F", backgroundColor: "#AB191F", marginY: 1 }} />
                </div>


            </Dialog>


        </React.Fragment>  
    )

}
export default ScheduleTourView