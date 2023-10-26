import React, { useState } from "react"
import PropertyViewMore from "../components/PropertyView"
import { InputAdornment, FormControl, InputLabel, MenuItem, Select, Dialog, DialogContent, DialogActions, Tooltip, IconButton, Avatar, InputBase, Slider, Checkbox, Grid, Card, Container, Box, Typography, CardContent, Input, Divider, TextField, Link, Button, FormControlLabel, Stack, Icon } from "@mui/material";
import AddHomeIcon from '@mui/icons-material/AddHome';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { AspectRatio } from "@mui/joy";

const MyCoopsPage = () => {
    /*
     * propertyInfo, setPropertyInfo to hold the card information from the server
     */
    const [open, setOpen] = React.useState(false)
    const [propertyInfo, setPropertyInfo] = React.useState([])
    const [hovered, setHovered] = React.useState(false);
    const [openMessage, setOpenMessage] = React.useState(false);

    /* Amenities */
    const [isPetFriendly, setIsPetFriendly] = React.useState(false)
    const [notPetFriendly, setNotPetFriendly] = React.useState(false)
    const [hasInUnitWD, setHasInUnitWD] = React.useState(false)
    const [noInUnitWD, setnoInUnitWD] = React.useState(false)
    const [hasParking, setHasParking] = React.useState(false)
    const [noParking, setNoParking] = React.useState(false)
    const [hasKitchenApp, setHasKitchenApp] = React.useState(false)
    const [noKitchenApp, setNoKitchenApp] = React.useState(false)
    const [isFurnished, setIsFurnished] = React.useState(false)
    const [notFurnished, setNotFurnished] = React.useState(false)

    /* Utilities: electricity, gas, water, trash, sewage, internet */
    const [includeElec, setIncludeElec] = React.useState(false)
    const [noElec, setNoElec] = React.useState(false)
    const [includeGas, setIncludeGas] = React.useState(false)
    const [includeWater, setIncludeWater] = React.useState(false)
    const [noWater, setNoWater] = React.useState(false)
    const [includeTrash, setIncludeTrash] = React.useState(false)
    const []




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
        marginLeft:"-10px",
        marginTop:"-10px",
        width:"205px", 
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
        marginRight:"15px",
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

    const amenitySX = {
        width:"200px",
        fontSize: "11pt",
        color: "black",
        margin: "0 0 7px -25px",
        padding: "0"
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
                                borderColor:"black",
                                marginBottom:"30px"
                            }}>
                                <Button
                                    sx={{
                                        ":hover": {
                                            borderColor: "#AB191F", bgcolor: "#F6EBE1", color: "#AB191F",
                                            borderWidth: 1.5
                                        },
                                        borderColor:"#AB191F", bgcolor:"#F6EBE1", color:"#AB191F", 
                                        borderWidth: 1.5, width:"100%", fontWeight:600, lineHeight:"15px",
                                        boxShadow: 5, maxWidth:"120px", maxHeight: "30px",
                                        float: "left", top: "5px",
                                        left: "5px",
                                        marginBottom:"15px",
                                        marginLeft: "210px",
                                        position: "absolute"

                                    }}
                                    variant="outlined">Add Photos
                                </Button>
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
                                    sx={{
                                        marginLeft:"-10px",
                                        marginRight:"-50px",
                                        marginTop:"-10px",
                                        width: "100px", height: "35px", fontSize:"11pt", 
                                        '.MuiOutlinedInput-notchedOutline': {
                                            border:"2px solid #AB191F"
                                            
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            border:"2px solid #AB191F"
                                        },
                                    }}>
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

                            {/* Amenities */}
                            <Divider orientation={{xs:'horizontal', md:'vertical', lg:'vertical', xl:'vertical'}} width={3} sx={{ borderBottomWidth: 3, color: "#AB191F", backgroundColor: "#AB191F", marginY: 2, marginX: 0, maxHeight:"175px" }} />
                            <Box height="175px" style={{marginRight:"-45px", }}>
                                <Box width='200px' height='600px' style={{margin:"-10px 0 0 -30px", textAlign:"left", padding: "0"}}>
                                <Typography
                                    sx={{
                                        fontWeight: 600,
                                        marginTop:"-30px",
                                        marginBottom:"5px",
                                        //marginLeft:"-25px",
                                        variant:"body2"
                                    }}
                                >
                                    Amenities
                                </Typography>
                                    {/* Furnished */}
                                    <Container style={{float:"left", width:"100%",}}>
                                        <FormControlLabel style={{margin:"-10px 0 0 -30px"}} label={<Typography style={{fontSize:"11pt"}}>Furnished</Typography>} control={
                                            <Checkbox style={{}}
                                            checked={isFurnished}
                                            onChange={() => setIsFurnished(!isFurnished)}
                                            disabled={notFurnished === true ? true : false}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                            sx={{
                                                color:"#AB191F",
                                                '&.Mui-checked': {
                                                    color: "#AB191F",
                                                },}}
                                            />}
                                        />
                                    </Container> {<br />}{<br />}

                                    {/* Kitchen Appliances */}
                                    <Container style={{float:"left", width:"100%"}}>
                                        <FormControlLabel style={{margin:"-10px 0 0 -30px"}} label={<Typography style={{fontSize:"11pt"}}>Kitchen Appliances</Typography>} control={
                                            <Checkbox style={{}}
                                            checked={hasKitchenApp}
                                            onChange={() => setHasKitchenApp(!hasKitchenApp)}
                                            disabled={noKitchenApp === true ? true : false}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                            sx={{
                                                color:"#AB191F",
                                                '&.Mui-checked': {
                                                    color: "#AB191F",
                                                },}}
                                            />}
                                        />
                                    </Container> {<br />}{<br />}

                                    {/* In-Unit Washer Dryer */}
                                    <Container style={{float:"left", width:"100%"}}>
                                        <FormControlLabel style={{margin:"-10px 0 0 -30px"}} label={<Typography style={{fontSize:"11pt"}}>In-Unit Washer Dryer</Typography>} control={
                                            <Checkbox style={{}}
                                            checked={hasInUnitWD}
                                            onChange={() => setHasInUnitWD(!hasInUnitWD)}
                                            disabled={noInUnitWD === true ? true : false}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                            sx={{
                                                color:"#AB191F",
                                                '&.Mui-checked': {
                                                    color: "#AB191F",
                                                },}}
                                            />}
                                        />
                                    </Container> {<br />}{<br />}

                                    {/* Parking */}
                                    <Container style={{float:"left", width:"50%"}}>
                                        <FormControlLabel style={{margin:"-10px 0 0 -30px"}} label={<Typography style={{fontSize:"11pt"}}>Parking</Typography>} control={
                                            <Checkbox style={{}}
                                            checked={hasParking}
                                            onChange={() => setHasParking(!hasParking)}
                                            disabled={noParking === true ? true : false}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                            sx={{
                                                color:"#AB191F",
                                                '&.Mui-checked': {
                                                    color: "#AB191F",
                                                },}}
                                            />}
                                        />
                                    </Container> {<br />}{<br />}

                                    {/* Pet Friendly */}
                                    <Container style={{float:"left", width:"100%"}}>
                                        <FormControlLabel style={{margin:"-10px 0 0 -30px"}} label={<Typography style={{fontSize:"11pt"}}>Pet Friendly</Typography>} control={
                                            <Checkbox style={{}}
                                            checked={isPetFriendly}
                                            onChange={() => setIsPetFriendly(!isPetFriendly)}
                                            disabled={notPetFriendly === true ? true : false}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                            sx={{
                                                color:"#AB191F",
                                                '&.Mui-checked': {
                                                    color: "#AB191F",
                                                },}}
                                            />}
                                        />
                                    </Container> 
                                </Box>
                            </Box>
                            {/* Utilities */}
                            <Divider orientation={{xs:'horizontal', md:'vertical', lg:'vertical', xl:'vertical'}} width={3} sx={{ borderBottomWidth: 3, color: "#AB191F", backgroundColor: "#AB191F", marginY: 2, marginX: 0, maxHeight:"175px" }} />
                            <Box height="175px" style={{marginRight:"-25px", }}>
                                <Box width='200px' height='600px' style={{margin:"-10px 0 0 -30px", textAlign:"left", padding: "0"}}>
                                    <Typography
                                        sx={{
                                            fontWeight: 600,
                                            marginTop:"-30px",
                                            marginBottom:"5px",
                                            //marginLeft:"-25px",
                                            variant:"body2"
                                        }}
                                    >
                                        Utilities
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Add Coop button */}
                            <Button
                                sx={{
                                    ":hover": {
                                        borderColor: "#F6EBE1", bgcolor: "#F6EBE1", color: "#AB191F",
                                        borderWidth: 1.5
                                    },
                                    borderColor:"#AB191F", bgcolor:"#AB191F", color:"#F6EBE1", 
                                    borderWidth: 1.5, width:"100%", fontWeight:600, lineHeight:"15px",
                                    boxShadow: 5, maxWidth:"120px", maxHeight: "50px",
                                    float: "right", bottom: 20, right:35,
                                    //left: "50%",
                                    marginBottom:"30px",
                                    marginLeft: "210px",
                                    position: "absolute"

                                }}
                                variant="outlined">Add Coop
                            </Button>
                                
                                
                                
                            
                            

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
