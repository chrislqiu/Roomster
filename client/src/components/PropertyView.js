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
        media: {
            borderRadius: "10px",
            padding: "10px"
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
                    <CardMedia
                        component="img"
                        height="140"
                        image={imgExample}
                        style={styles.media}
                        
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                            CompanyName
                        </Typography>
                    </CardContent>
                
                {text}
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