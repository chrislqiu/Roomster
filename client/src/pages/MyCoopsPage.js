import React, { useState } from "react"
import PropertyViewMore from "../components/PropertyView"
import { InputAdornment, FormControl, InputLabel, MenuItem, Select, Dialog, DialogContent, DialogActions, Tooltip, IconButton, Avatar, InputBase, Slider, Checkbox, Grid, Card, Container, Box, Typography, CardContent, Input, Divider, TextField, Link, Button, FormControlLabel, Stack, Icon } from "@mui/material";
import AddHomeIcon from '@mui/icons-material/AddHome';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { AspectRatio } from "@mui/joy";
import toast, { Toaster } from 'react-hot-toast'

const MyCoopsPage = () => {
    /*
     * propertyInfo, setPropertyInfo to hold the card information from the server
     */
    const [open, setOpen] = React.useState(false)
    const [propertyInfo, setPropertyInfo] = React.useState([])
    const [hovered, setHovered] = React.useState(false);
    const [openMessage, setOpenMessage] = React.useState(false);

    /* Textfield for property name, address, price, bed, and baths*/
    const[propertyName, setPropertyName] = React.useState('')
    const[propertyAddress, setPropertyAddress] = React.useState('')
    const[price, setPrice] = React.useState('')
    const[bed, setBed] = React.useState('')
    const[bath, setBath] = React.useState('')

    /* Amenities: pet friendly, in-unit WD, parking, kitchen appliances, furnished */
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
    const [hasPool, setHasPool] = React.useState(false)

    /* Utilities: electricity, gas, water, trash, sewage, internet */
    const [includeElec, setIncludeElec] = React.useState(false)
    const [noElec, setNoElec] = React.useState(false)
    const [includeGas, setIncludeGas] = React.useState(false)
    const [noGas, setNoGas] = React.useState(false)
    const [includeWater, setIncludeWater] = React.useState(false)
    const [noWater, setNoWater] = React.useState(false)
    const [includeTrash, setIncludeTrash] = React.useState(false)
    const [noTrash, setNoTrash] = React.useState(false)
    const [includeSewage, setIncludeSewage] = React.useState(false)
    const [noSewage, setNoSewage] = React.useState(false)
    const [includeInternet, setInternet] = React.useState(false)
    const [noInternet, setNoInternet] = React.useState(false)

    /* Disabled button for Edit and Save */
    const [disableButton, setDisableButton] = React.useState(true)

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

    const customToastStyle = {
        color: 'white',
    };

    const handleAppCoop = () => {
        if (propertyName === '' || propertyAddress === '' || price === '' || bed === '' || bath === ''){
            toast.error("Please fill in all the textfileds and dropdown!", {style: customToastStyle})
            return;
        } else {
            toast.success("Save Success", {style: customToastStyle})
        }

        const dataToSend = {
            propertyInfo: {
                image: '',
                propertyName: propertyName,
                address: propertyAddress,
                beds: bed,
                baths: bath,
                cost: cost,
                sqft: '',
                distance: '',
                
            }
        }
    }
    
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
                                    disabled={disableButton}
                                    value={propertyName}
                                    onChange={(e) => setPropertyName(e.target.value)}
                                /> {<br />}{<br />}
                                <InputBase 
                                    placeholder="Enter property address" 
                                    id="addr-textfield" 
                                    sx={inputBaseSX}
                                    disabled={disableButton}
                                    value={propertyAddress}
                                    onChange={(e) => setPropertyAddress(e.target.value)}
                                /> {<br />}{<br />}
                                <InputBase 
                                    placeholder="Enter property price" 
                                    id="price-textfield" 
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    sx={inputBaseSX}
                                    disabled={disableButton}
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                /> {<br />}{<br />}

                                <Select
                                    id="beds-input" 
                                    defaultValue={-1}
                                    sx={selectSX}
                                    disabled={disableButton}
                                    onChange={(e) => setBed(e.target.value)}
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
                                    disabled={disableButton}
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
                                    }}
                                    onChange={(e) => setBath(e.target.value)}>
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
                                    <Container style={{float:"left", width:"100%"}}>
                                        <FormControlLabel style={{margin:"-10px 0 0 -30px"}} label={<Typography style={{fontSize:"11pt"}}>Furnished</Typography>} control={
                                            <Checkbox style={{}}
                                            checked={isFurnished}
                                            onChange={() => setIsFurnished(!isFurnished)}
                                            disabled={disableButton}
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
                                        <FormControlLabel style={{margin:"-20px 0 0 -30px"}} label={<Typography style={{fontSize:"11pt"}}>Kitchen Appliances</Typography>} control={
                                            <Checkbox style={{}}
                                            checked={hasKitchenApp}
                                            onChange={() => setHasKitchenApp(!hasKitchenApp)}
                                            disabled={disableButton}
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
                                        <FormControlLabel style={{margin:"-40px 0 0 -30px"}} label={<Typography style={{fontSize:"11pt"}}>In-Unit Washer Dryer</Typography>} control={
                                            <Checkbox style={{}}
                                            checked={hasInUnitWD}
                                            onChange={() => setHasInUnitWD(!hasInUnitWD)}
                                            disabled={disableButton}
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
                                        <FormControlLabel style={{margin:"-60px 0 0 -30px"}} label={<Typography style={{fontSize:"11pt"}}>Parking</Typography>} control={
                                            <Checkbox style={{}}
                                            checked={hasParking}
                                            onChange={() => setHasParking(!hasParking)}
                                            disabled={disableButton}
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
                                        <FormControlLabel style={{margin:"-80px 0 0 -30px"}} label={<Typography style={{fontSize:"11pt"}}>Pet Friendly</Typography>} control={
                                            <Checkbox style={{}}
                                            checked={isPetFriendly}
                                            onChange={() => setIsPetFriendly(!isPetFriendly)}
                                            disabled={disableButton}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                            sx={{
                                                color:"#AB191F",
                                                '&.Mui-checked': {
                                                    color: "#AB191F",
                                                },}}
                                            />}
                                        />
                                    </Container> {<br />}{<br />}

                                    {/* Pool */}
                                    <Container style={{float:"left", width:"100%"}}>
                                        <FormControlLabel style={{margin:"-100px 0 0 -30px"}} label={<Typography style={{fontSize:"11pt"}}>Pool</Typography>} control={
                                            <Checkbox style={{}}
                                            checked={hasPool}
                                            onChange={() => setHasPool(!hasPool)}
                                            disabled={disableButton}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                            sx={{
                                                color:"#AB191F",
                                                '&.Mui-checked': {
                                                    color: "#AB191F",
                                                },}}
                                            />}
                                        />
                                    </Container> {<br />}{<br />}
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

                                    {/* Water */}
                                    <Container style={{float:"left", width:"100%",}}>
                                        <FormControlLabel style={{margin:"-10px 0 0 -30px"}} label={<Typography style={{fontSize:"11pt"}}>Water</Typography>} control={
                                            <Checkbox style={{}}
                                            checked={includeWater}
                                            onChange={() => setIncludeWater(!includeWater)}
                                            disabled={disableButton}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                            sx={{
                                                color:"#AB191F",
                                                '&.Mui-checked': {
                                                    color: "#AB191F",
                                                },}}
                                            />}
                                        />
                                    </Container> {<br />}{<br />}

                                    {/* Electricity */}
                                    <Container style={{float:"left", width:"100%"}}>
                                        <FormControlLabel style={{margin:"-20px 0 0 -30px"}} label={<Typography style={{fontSize:"11pt"}}>Electricity</Typography>} control={
                                            <Checkbox style={{}}
                                            checked={includeElec}
                                            onChange={() => setNoElec(!includeElec)}
                                            disabled={disableButton}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                            sx={{
                                                color:"#AB191F",
                                                '&.Mui-checked': {
                                                    color: "#AB191F",
                                                },}}
                                            />}
                                        />
                                    </Container> {<br />}{<br />}

                                    {/* Gas */}
                                    <Container style={{float:"left", width:"100%",}}>
                                        <FormControlLabel style={{margin:"-40px 0 0 -30px"}} label={<Typography style={{fontSize:"11pt"}}>Gas</Typography>} control={
                                            <Checkbox style={{}}
                                            checked={includeGas}
                                            onChange={() => setNoGas(!includeGas)}
                                            disabled={disableButton}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                            sx={{
                                                color:"#AB191F",
                                                '&.Mui-checked': {
                                                    color: "#AB191F",
                                                },}}
                                            />}
                                        />
                                    </Container> {<br />}{<br />}

                                    {/* Trash */}
                                    <Container style={{float:"left", width:"100%",}}>
                                        <FormControlLabel style={{margin:"-60px 0 0 -30px"}} label={<Typography style={{fontSize:"11pt"}}>Trash</Typography>} control={
                                            <Checkbox style={{}}
                                            checked={includeTrash}
                                            onChange={() => setNoTrash(!includeTrash)}
                                            disabled={disableButton}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                            sx={{
                                                color:"#AB191F",
                                                '&.Mui-checked': {
                                                    color: "#AB191F",
                                                },}}
                                            />}
                                        />
                                    </Container> {<br />}{<br />}

                                    {/* Sewage */}
                                    <Container style={{float:"left", width:"100%",}}>
                                        <FormControlLabel style={{margin:"-80px 0 0 -30px"}} label={<Typography style={{fontSize:"11pt"}}>Sewage</Typography>} control={
                                            <Checkbox style={{}}
                                            checked={includeSewage}
                                            onChange={() => setNoSewage(!includeSewage)}
                                            disabled={disableButton}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                            sx={{
                                                color:"#AB191F",
                                                '&.Mui-checked': {
                                                    color: "#AB191F",
                                                },}}
                                            />}
                                        />
                                    </Container> {<br />}{<br />}

                                    {/* Internet */}
                                    <Container style={{float:"left", width:"100%",}}>
                                        <FormControlLabel style={{margin:"-100px 0 0 -30px"}} label={<Typography style={{fontSize:"11pt"}}>Internet</Typography>} control={
                                            <Checkbox style={{}}
                                            checked={includeInternet}
                                            onChange={() => setNoInternet(!includeInternet)}
                                            disabled={disableButton}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                            sx={{
                                                color:"#AB191F",
                                                '&.Mui-checked': {
                                                    color: "#AB191F",
                                                },}}
                                            />}
                                        />
                                    </Container> {<br />}{<br />}
                                </Box>
                            </Box>

                            {/* Add Coop button */}
                            <Toaster
                                toastOptions={{
                                    success: {
                                        style: {
                                            background: 'green',
                                        },
                                    },
                                    error: {
                                        style: {
                                            background: 'red',
                                        },
                                    },
                                }}/>
                            <Button
                                sx={{
                                    ":hover": {
                                        borderColor: "#F6EBE1", bgcolor: "#F6EBE1", color: "#AB191F",
                                        borderWidth: 1.5
                                    },
                                    borderColor:"#AB191F", bgcolor:"#AB191F", color:"#F6EBE1", 
                                    borderWidth: 1.5, width:"100%", fontWeight:600, lineHeight:"15px",
                                    boxShadow: 5, maxWidth:"112px", maxHeight: "50px",
                                    float: "right", bottom: 20, right:35,
                                    //left: "50%",
                                    marginBottom:"30px",
                                    marginLeft: "210px",
                                    position: "absolute"

                                }}
                                onClick={() => {
                                    if (disableButton) {
                                        setDisableButton(false)
                                    } else {
                                        handleAppCoop()
                                        setDisableButton(true)
                                    }
                                }}
                                variant="outlined">{disableButton ? 'Edit' : 'Add Coop'}
                            </Button>
                        </Stack>

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
