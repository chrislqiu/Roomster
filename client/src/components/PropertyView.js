import * as React from 'react';
import Button from '@mui/material/Button';
import { Box, Card, CardContent, CardMedia } from '@mui/material';
import { CardActionArea } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import imgExample from "../images/apartment-pic.jpg"

const PropertyViewMore = ({ text }) => {
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    
    const styles = {
        divider: {
            borderTop: "3px solid #AB191F",
            padding: "0"
        }
    }

    return (
        <React.Fragment>
            <Card 
                variant='contained'
                onClick={handleOpen}
                sx={{
                    ":hover": {
                        bgcolor:"#AB191F",
                        color:"#f5ebe0",
                        cursor: "pointer"
                    },
                    backgroundColor:"#f5ebe0",
                    color:"#AB191F",
                    width: "250px",
                    height: "300px",
                    boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, .1)"
                }}>
                <CardActionArea>
                        <CardMedia
                            component="img"
                            image={imgExample}
                            height="140"
                        />
                        <CardContent>
                          <Typography variant="h6" style={{margin: "-10px 0 0px 0"}}>Company Name</Typography>
                          <Typography variant="body2" style={{margin: "0 0 10px 0"}}> 123 Address</Typography>
                          <Typography variant="body2"> # bedroom</Typography>
                          <Typography variant="body2"> # bathroom</Typography>
                          <hr style={styles.divider}></hr>
                        
                    </CardContent>
                </CardActionArea>
            </Card>
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