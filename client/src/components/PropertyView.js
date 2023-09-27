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

const PropertyViewMore = ({ text }) => {
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
            open={open}
            onClose={handleClose}
            sx={{
                "& .MuiDialog-container": {
                  "& .MuiPaper-root": {
                    width: "100%",
                    maxWidth: "500px",  
                    maxHeight: "500px"
                  },
                },
            }}
            >
                <DialogTitle sx={{fontWeight: 600}}> Property Details </DialogTitle>
                <DialogContent sx={{width: '100%'}}>
                    <Box width='600'>
                    <Typography>
                        This is where stuff goes
                    </Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <IconButton
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogActions>
            </Dialog>
        </React.Fragment>

    )
}
export default PropertyViewMore