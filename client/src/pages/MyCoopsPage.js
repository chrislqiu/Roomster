import React from "react"
import PropertyViewMore from "../components/PropertyView"
import { InputAdornment, FormControl, InputLabel, MenuItem, Select, Dialog, DialogContent, DialogActions, Tooltip, IconButton, Avatar, InputBase, Slider, Checkbox, Grid, Card, Container, Box, Typography, CardContent, Input, Divider, TextField, Link, Button, FormControlLabel, Stack, Icon } from "@mui/material";
import AddHomeIcon from '@mui/icons-material/AddHome';
import AddIcon from '@mui/icons-material/Add';
import { AspectRatio } from "@mui/joy";

const MyCoopsPage = () => {
    /*
     * propertyInfo, setPropertyInfo to hold the card information from the server
     */
    const [open, setOpen] = React.useState(false)
    const [propertyInfo, setPropertyInfo] = React.useState([])
    const [hovered, setHovered] = React.useState(false);
    const [amenity, setAmenity] = React.useState(false);
    const [openMessage, setOpenMessage] = React.useState(false);

    const handleOpenMessage = () => {
        setOpenMessage(true)
    }
    const handleCloseMessage = () => {
        setOpenMessage(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    
    const handleHovered = () => {
        setHovered(true)
    }

    const handleAmenity = () => {
        setAmenity(true)
    }

    const handleLeave = () => {
        setHovered(false)
    }

    React.useEffect(() => {
        const getPropertyInfo = async () => {
            const res = await fetch('http://localhost:8000/cards/all-cards')
            const getData = await res.json()
            const obj = JSON.parse(JSON.stringify(getData));
            setPropertyInfo(obj);
        }
        getPropertyInfo()
    }, [])

    const styles = {
        feed: {
            display: "flex",
            justifyContent: "center",
            maxWidth: "1200px",
            flexWrap: "wrap",
        },
        
    }
    const inputBaseSX = {
        //margin: "0 0 10px 25px", 
        marginLeft:"-10px",
        marginTop:"-10px",
        width:"300px", 
        height: "35px",
        borderRadius: "5px",
        border: "2px solid #AB191F",
        padding: "5px",
        "&:hover": {
            border: "2px solid #AB191F",
            boxShadow:"0px 0px 3px 3px rgba(0, 0, 0, .1)", 
        }
    }

    const selectSX = {
        marginLeft:"-10px",
        marginRight:"20px",
        marginTop:"-10px",
        width: "100px", height: "35px", fontSize:"11pt", 
        '.MuiOutlinedInput-notchedOutline': {
            border:"2px solid #AB191F"
            
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border:"2px solid #AB191F"
        },
    }

    const menuItemSX = {
        borderRadius: "5px",
        padding: "5px",
        "&:hover": {
            
            boxShadow:"0px 0px 3px 3px rgba(0, 0, 0, .1)", 
        }

    }
    return (
        <Container sx={{ width: '100%' }}>
            <Box style ={{position:"fixed", bottom:"0", right:"0"}}>
                <IconButton 
                    onMouseEnter={handleHovered}
                    onMouseLeave={handleLeave}
                    onClick={handleOpen}
                    sx={{m:3 }} 
                    style={{ 
                        borderRadius:'50%', 
                        width:"75px", 
                        height:"75px", 
                        backgroundColor: hovered === true ? "#f5ebe0" : "#AB191F", 
                        display:"flex", 
                        justifyContent: "center", 
                        boxShadow:"0px 0px 3px 3px rgba(0, 0, 0, .2)",
                    }}>        
                    <AddHomeIcon
                        style={{ 
                            color: hovered === true ? "#AB191F" : "#f5ebe0", 
                            fontSize:"25pt", 
                            justifyContent:"center"
                        }}
                    />   
                </IconButton>
            </Box>
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
                    <Typography style={{fontWeight: "600", fontSize: "15pt", color: "#AB191F", textAlign:"center", margin:"10px 0 -10px 0"}}> 
                            {"CREATE YOUR PROPERTY"}
                    </Typography >
                    <Container 
                        sx={{
                            marginTop:"15px",
                            
                        }}
                        style={{
                            backgroundColor:"#F6EBE1"
                        }}>
                        <AspectRatio minHeight={100} maxHeight={200} minWidth={300} maxWidth={400} 
                            style={{
                                borderStyle:"dotted", 
                                borderColor:"black"
                            }}>
                                <Typography>
                                    HELLO
                                </Typography>
                        </AspectRatio>

                        <Stack direction={{'400px': "column", md: "row",lg: "row", xl: "row"}} spacing={5} sx={{ marginTop: 2, p: 1 }}>
                            
                            {
                                /*
                                 * Property details
                                 */
                            }
                            <Box width='600'>
                                <InputBase 
                                    placeholder="Enter property name" 
                                    id="name-textfield" 
                                    sx={inputBaseSX}
                                /> {<br />}{<br />}
                                <InputBase 
                                    placeholder="Enter property address" 
                                    id="addr-textfield" 
                                    sx={inputBaseSX}
                                /> {<br />}{<br />}
                                <InputBase 
                                    placeholder="Enter property price" 
                                    id="price-textfield" 
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    sx={inputBaseSX}
                                /> {<br />}{<br />}

                                <Select
                                    id="beds-input" 
                                    defaultValue={-1}
                                    sx={selectSX}
                                >
                                    <MenuItem value={-1}># beds</MenuItem>
                                    <MenuItem value={1} sx={menuItemSX}>1</MenuItem>
                                    <MenuItem value={2} sx={menuItemSX}>2</MenuItem>
                                    <MenuItem value={3} sx={menuItemSX}>3</MenuItem>
                                    <MenuItem value={4} sx={menuItemSX}>4</MenuItem>
                                    <MenuItem value={5} sx={menuItemSX}>5</MenuItem>
                                </Select>
                                <Select
                                    id="baths-input" 
                                    defaultValue={-1}
                                    sx={selectSX}
                                >
                                    <MenuItem value={-1}># baths</MenuItem>
                                    <MenuItem value={1} sx={menuItemSX}>1</MenuItem>
                                    <MenuItem value={1.5} sx={menuItemSX}>1.5</MenuItem>
                                    <MenuItem value={2} sx={menuItemSX}>2</MenuItem>
                                    <MenuItem value={2.5} sx={menuItemSX}>2.5</MenuItem>
                                    <MenuItem value={3} sx={menuItemSX}>3</MenuItem>
                                    <MenuItem value={3.5} sx={menuItemSX}>3.5</MenuItem>
                                    <MenuItem value={4} sx={menuItemSX}>4</MenuItem>
                                    <MenuItem value={4.5} sx={menuItemSX}>4.5</MenuItem>
                                    <MenuItem value={5} sx={menuItemSX}>5</MenuItem>
                                </Select>
                            </Box>
                            <Divider orientation={{xs:'horizontal', md:'vertical', lg:'vertical', xl:'vertical'}} width={3} sx={{ borderBottomWidth: 3, color: "#AB191F", backgroundColor: "#AB191F", marginY: 2 }} />
                            <Box width='600'>
                                <Typography
                                    sx={{
                                        fontWeight: 600,
                                        marginTop:"-10px",
                                        marginLeft:"-20px",
                                        variant:"body2"
                                    }}
                                >
                                    Amenities
                                    <IconButton>
                                        <AddIcon
                                            style={{ 
                                                color: "#AB191F", 
                                                fontSize:"15pt"
                                            }}
                                            onClick={handleAmenity}
                                        />
                                    </IconButton>
                                </Typography>
                                <Button
                                sx={{
                                    ":hover": {
                                        borderColor: "#F6EBE1", bgcolor: "#F6EBE1", color: "#AB191F",
                                        borderWidth: 1.5
                                    },
                                    borderColor:"#AB191F", bgcolor:"#AB191F", color:"#F6EBE1", 
                                    borderWidth: 1.5, width:"100%", fontWeight:600, lineHeight:"15px",
                                    boxShadow: 5, maxWidth:"120px", maxHeight: "50px",
                                    float: "right", bottom: 0,
                                    left: "50%",
                                    marginBottom:"20px",
                                    marginLeft: "210px",
                                    position: "absolute"

                                }}
                                variant="outlined">Add Coop
                            </Button>
                            </Box>
                            

                        </Stack>

                    </Container>
                    
                    <Container sx={{display:"inline-flex", marginTop:"50px"}}>
                        
                        
                    </Container>
                    
                </DialogContent>
        <DialogActions>
            
        </DialogActions>
        </Dialog>
           
            <Box sx={{ m: 1 }} style={styles.feed}>
                {
                   /*
                    * Maps each Property Information object to its own "card"
                    */
                    propertyInfo.map(cards => {
                        return <PropertyViewMore data={cards} myCoops={true}/>
                        }
                    )
                }
            </Box>
        </Container>
    )
}
export default MyCoopsPage;
