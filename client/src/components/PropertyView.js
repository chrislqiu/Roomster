import * as React from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { AspectRatio } from '@mui/joy';
import Divider from '@mui/material/Divider';
import {Stack} from '@mui/material';

const PropertyViewMore = ({ text, data }) => {
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
                        bgcolor: "#F6EBE1",
                        color: "#AB191F"
                    },
                    backgroundColor: "#AB191F",
                    color: "#F6EBE1"
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
                            width: "70%",
                            maxWidth: 750,
                            maxHeight: 500,
                        },
                    },

                }}
            >
                <DialogContent>
                    <AspectRatio minHeight={100} maxHeight={200} minWidth={300} maxWidth={400}>
                            <img
                                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                                srcSet="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2 2x"
                                alt=""
                            />
                        </AspectRatio>
                    <Stack direction='row' spacing={5} sx={{marginTop: 2}}>
                    <Box width='600'>
                        <Typography
                            sx={{
                                fontWeight: 600, 
                                marginTop: 1,
                                fontSize: 20
                            }}
                        >
                        {data.propertyName}
                        </Typography>
                        <Typography
                            sx={{
                                fontWeight: 300, 
                                fontSize: 16,
                                fontStyle: 'italic',
                                marginTop: 1
                            }}
                        >
                            {data.addr}
                        </Typography>
                        <Typography
                            sx={{
                                fontWeight: 300, 
                                fontSize: 16,
                            }}
                        >
                            {data.numBed} beds, {data.numBath} baths
                        </Typography>
                        <Divider orientation='horizontal' width={200} sx={{borderBottomWidth: 3, color:"#AB191F", backgroundColor:"#AB191F", marginY:1}}/>
                        <Typography
                            sx={{
                                fontWeight: 500, 
                                fontSize: 16,
                                
                            }}
                        >
                            ${data.cost} per month
                        </Typography>
                    </Box>
                    <Divider orientation='verticle' width={3} sx={{borderBottomWidth: 3, color:"#AB191F", backgroundColor:"#AB191F", marginY:2}}/>
                    <Box width={'100%'}>
                    <Typography
                            sx={{
                                fontWeight: 600, 
                                marginTop: 1,
                                fontSize: 16
                            }}
                        >
                        Amenities
                        </Typography>
                        <Typography
                            sx={{
                                fontWeight: 300, 
                                fontSize: 16,
                            }}
                        >
                            Parking {<br/>}
                            Pets {<br/>}
                            Furnished apartment {<br/>}
                        </Typography>
                    </Box>
                    <Divider orientation='verticle' width={3} sx={{borderBottomWidth: 3, color:"#AB191F", backgroundColor:"#AB191F", marginY:2}}/>
                    <Box width={'100%'}>
                    <Typography
                            sx={{
                                fontWeight: 600, 
                                marginTop: 1,
                                fontSize: 16
                            }}
                        >
                        Contact Information
                        </Typography>
                        <Typography
                            sx={{
                                fontWeight: 300, 
                                fontSize: 16,
                            }}
                        >
                            Company Name {<br/>}
                        </Typography>
                    </Box>
                    </Stack>
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