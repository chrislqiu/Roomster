import * as React from 'react';
import Button from '@mui/material/Button';
import { Box, Card, CardContent, CardMedia, IconButton, Tooltip } from '@mui/material';
import { CardActionArea } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { AspectRatio } from '@mui/joy';
import Divider from '@mui/material/Divider';
import { Stack } from '@mui/material';
import { Link } from '@mui/material';
import imgExample from "../images/apartment-pic.jpg"
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


/* 
 * Property Card (Rachel La)
 * More Property Detail Dialogue for the Property card (Tea Lazareto)
 * Parameters:
 * (temporary until property cards) text: button text 
 * data : The property data from the database
 * featured : Boolean to determine whether the card is featured or not
 * favCoops : Boolean to determine if card is on favCoops page
 */
const PropertyViewMore = ({ data, featured, favCoops, login }) => {
    /*
     * open, setOpen : controls the state of the dialogue popup
     */
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    console.log(favCoops)
    const [active, setActive]= React.useState(favCoops === true ? true : false)

    const styles = {
        divider: {
            borderTop: "3px solid #AB191F",
            padding: "0",
            marginBottom: "10px"
        }
    }

    return (
        <React.Fragment>
            <Card
                variant='contained'
                onClick={handleOpen}
                sx={{
                    ":hover": {
                        bgcolor: "#AB191F",
                        color: "#f5ebe0",
                        cursor: "pointer"
                    },
                    backgroundColor: "#f5ebe0",
                    color: "#AB191F",
                    width: "250px",
                    height: "300px",
                    boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, .1)",
                    marginBottom: "20px",
                    marginRight: "20px"
                }}>
                <CardActionArea>
                        <CardMedia
                            component="img"
                            image={imgExample}
                            //height="140px"
                            style={{
                                height: "130px",
                                width: "230px",
                                margin: "10px",
                                borderRadius: "5px"
                            }}
                        />
                        <CardContent>
                        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 0 }}>
                          <Typography variant="h6" style={{margin: "-20px 0 0px 0"}}> Company Name </Typography>
                          {featured === true ? <StarIcon style={{margin: "-20px 0 0px 2.5"}} /> : ''}
                          {favCoops === true ? <FavoriteIcon style={{margin: "-20px 0 0px 2.5"}} sx={{color: "#AB191F", ":hover": {color: "#F6EBE1",},}}/> : ''}
                        </div>
                          <Typography variant="body2" style={{margin: "0 0 5px 0"}}>{data.addr}</Typography>
                          <Typography variant="body2">{data.numBed} bedroom </Typography>
                          <Typography variant="body2">{data.numBath} bathroom</Typography>
                          <hr style={styles.divider}></hr>
                          <Typography variant="body1" style={{textAlign:"right", fontWeight:"500"}}> ${data.cost} per month</Typography>
                        
                    </CardContent>
                </CardActionArea>
            </Card>
            {
                /*
                 * The dialogue box
                 */
            }
            <Dialog
                open={open}
                onClose={handleClose}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "70%",
                            maxWidth: 750,
                            maxHeight: 500,
                            backgroundColor: "#F6EBE1"
                        },
                    },
                }}
            >
                <DialogContent>
                    {
                        /*
                         * The dialogue box content
                         * AspectRatio controls the size of the image
                         */
                    }
                    <AspectRatio minHeight={100} maxHeight={200} minWidth={300} maxWidth={400}>
                        <img
                            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                            srcSet="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2 2x"
                            alt=""
                        />
                    </AspectRatio>
                    {
                        /*
                         * Stack direction row has each text 'chunk'
                         */
                    }
                    <Stack direction={{'400px': "column", md: "row",lg: "row", xl: "row"}} spacing={5} sx={{ marginTop: 2, p: 1 }} >
                        <Box width='600'>
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    marginTop: 1,
                                    variant:"h6"
                                }}
                            >
                                {
                                    /*
                                     * When passing in values into MUI text components, use curly braces
                                     */
                                }
                                {data.propertyName}
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: 300,
                                    variant:"body2",
                                    fontStyle: 'italic',
                                    marginTop: .5
                                }}
                            >
                                {data.addr}
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: 300,
                                    variant:"body2",
                                }}
                            >
                                {data.numBed} {data.numBed > 1 ? 'beds' : 'bed'}, {data.numBath} {data.numBath > 1 ? 'baths' : 'bath'}
                            </Typography>
                            <Divider orientation='horizontal' width={200} sx={{ borderBottomWidth: 3, color: "#AB191F", backgroundColor: "#AB191F", marginY: 1 }} />
                            <Typography
                                sx={{
                                    fontWeight: 500,
                                    variant:"body2",

                                }}
                            >
                                ${data.cost} per month
                            </Typography>
                        </Box>
                        <Divider orientation={{xs:'horizontal', md:'vertical', lg:'vertical', xl:'vertical'}} width={3} sx={{ borderBottomWidth: 3, color: "#AB191F", backgroundColor: "#AB191F", marginY: 2 }} />
                        <Box width={'100%'}>
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    marginTop: 1,
                                    variant:"body2"
                                }}
                            >
                                Amenities
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: 300,
                                    variant:"body2",
                                }}
                            >
                                {
                                    /*
                                     * <br /> breaks to new lines
                                     */
                                }
                                Parking {<br />}
                                Pets {<br />}
                                Furnished apartment {<br />}
                            </Typography>
                        </Box>
                        <Divider orientation='verticle' width={3} sx={{ borderBottomWidth: 3, color: "#AB191F", backgroundColor: "#AB191F", marginY: 2 }} />
                        <Box width={'100%'} sx={{paddingRight: 1}} >
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    marginTop: 1,
                                    variant:"body2",
                                }}
                            >
                                Contact Information
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: 300,
                                    variant:"body2",
                                }}
                            >
                                Company Name {<br />}
                            </Typography>
                            <Link href="https://riseonchauncey.com/" underline="always" color="#AB191F">
                                {'Link'}
                            </Link>
                        </Box>
                    </Stack>
                </DialogContent>
                <DialogActions>

                    {login == true 
                        ? <Tooltip title="Add to FAV COOPS">
                        <IconButton size="large" onClick={e => {
                            setActive(!active)
                            //add onclick function for db, and to hide if property owner, or to replace with edit if property owner needs
                            // to edit
                        }}>
                            {active ? <FavoriteIcon sx={{ color: "#AB191F" }} /> : <FavoriteBorderIcon sx={{ color: "#AB191F" }} />}
                        </IconButton>
                    </Tooltip>
                    :
                    ''}
                </DialogActions>
            </Dialog>
        </React.Fragment>

    )
}
export default PropertyViewMore