import React, { useState, useEffect } from "react"
import { InputAdornment, CircularProgress, FormControl, InputLabel, MenuItem, Select, Dialog, DialogContent, DialogActions, Tooltip, IconButton, Avatar, InputBase, Slider, Checkbox, Grid, Card, Container, Box, Typography, CardContent, Input, Divider, TextField, Link, Button, FormControlLabel, Stack, Icon } from "@mui/material";
import AddHomeIcon from '@mui/icons-material/AddHome';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { AspectRatio } from "@mui/joy";
import toast, { Toaster } from 'react-hot-toast'
import PropertyView from "../components/PropertyView";
import AddCoopView from "../components/AddCoopView";
import CardPlaceholder from "../components/CardPlaceholder";

const MyCoopsPage = ({ login }) => {
    /* propertyInfo, setPropertyInfo to hold the card information from the server */
    const [open, setOpen] = React.useState(false)
    const [propertyInfo, setPropertyInfo] = React.useState([])
    const [hovered, setHovered] = React.useState(false);
    const [openMessage, setOpenMessage] = React.useState(false);

    /* Textfield for property name, address, price, bed, and baths*/
    const [propertyName, setPropertyName] = React.useState('')
    const [propertyAddress, setPropertyAddress] = React.useState('')
    const [price, setPrice] = React.useState('')
    const [bed, setBed] = React.useState(-1)
    const [bath, setBath] = React.useState(-1)

    /* Upload Image */
    const [propertyImage, setPropertyImage] = React.useState("")
    const [image, setHasImage] = React.useState(false)

    /* Amenities: pet friendly, in-unit WD, parking, kitchen appliances, furnished, gym */
    const [isPetFriendly, setIsPetFriendly] = React.useState(false)
    const [hasInUnitWD, setHasInUnitWD] = React.useState(false)
    const [hasParking, setHasParking] = React.useState(false)
    const [hasKitchenApp, setHasKitchenApp] = React.useState(false)
    const [isFurnished, setIsFurnished] = React.useState(false)
    const [hasGym, setHasGym] = React.useState(false)
    const [amenitiesArr, setAmenitiesArr] = React.useState([])

    /* Utilities: electricity, gas, water, trash, sewage, internet */
    const [includeElec, setIncludeElec] = React.useState(false)
    const [includeGas, setIncludeGas] = React.useState(false)
    const [includeWater, setIncludeWater] = React.useState(false)
    const [includeTrash, setIncludeTrash] = React.useState(false)
    const [includeSewage, setIncludeSewage] = React.useState(false)
    const [includeInternet, setInternet] = React.useState(false)
//    const presetData = [
//        ['water', false],
//        ['electricity', false],
//        ['gas', false],
//        ['trash', false],
//        ['sewage', false],
//        ['internet', false]
//    ];
//    const [utilities, setUtilities] = useState(new Map(presetData));
    const [utilitiesArr, setUtilitiesArr] = React.useState([])

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
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState('');
    const [myCoopsArr, setMyCoopsArr] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    React.useEffect(() => {
        const getUserInfo = async () => {
            const res = await fetch('http://localhost:8000/auth/current-user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            const getData = await res.json();
            const obj = JSON.parse(JSON.stringify(getData));
            setUsername(obj.username);
            setUserData(obj);
            if (obj.user.company) {
                setMyCoopsArr(obj.user.company.myCoops);
                // console.log(obj.user.company.myCoops)
            }
            setLoading(false);
        };

        getUserInfo();
        /*const getPropertyInfo = async () => {
            const data = await fetch('http://localhost:8000/auth/current-user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            })
            const userData = await data.json()
            const res = await fetch('http://localhost:8000/cards/my-coops-cards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username: userData.username}),
                credentials: 'include'
            })
            const getData = await res.json()
            const obj = JSON.parse(JSON.stringify(getData));
            setPropertyInfo(obj);
        }
        getPropertyInfo()*/
    }, [userData, myCoopsArr])

    const customToastStyle = {
        color: 'white',
    };

    const handleCheckboxChange = (amenity) => {
        if (amenitiesArr.includes(amenity)) {
            // If the amenity is already in the array, remove it
            setAmenitiesArr(amenitiesArr.filter((item) => item !== amenity));
        } else {
            // If the amenity is not in the array, add it
            setAmenitiesArr([...amenitiesArr, amenity]);
        }
    };

//    const handleUtilChange = (key, value) => {
//        setUtilities((prevUtilities) => new Map(prevUtilities.set(key, value)));
//    };

    const handleAppCoop = async () => {
        if (propertyName === '' || propertyAddress === '' || price === '' || bed === -1 || bath === -1) {
            toast.error("Please fill in all the textfileds and dropdown!", { style: customToastStyle })
            return;
        } else {
            toast.success("Save Success", { style: customToastStyle })
        }

        const dataToSend = {
            propertyInfo: {
                image: propertyImage,
                propertyName: propertyName,
                address: propertyAddress,
                beds: bed,
                baths: bath,
                cost: price,
                sqft: '',
                distance: '',
                amenities: amenitiesArr,
                //utilities: Object.fromEntries(utilities)
            }
        }

        await fetch('http://localhost:8000/sendProperty', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                console.log('DATA SAVEDDDD: ', data.message);
            })
            .catch(error => {
                console.error('ERRORRR: ', error);
            });
    }

    function handleAddPhotos(event) {
        var file = event.target.files[0] // image uploaded
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            setPropertyImage(reader.result)
            setHasImage(true)
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
        marginLeft: "-10px",
        marginTop: "-10px",
        width: "205px",
        height: "35px",
        borderRadius: "5px",
        border: "2px solid #AB191F",
        padding: "5px",
        "&:hover": {
            border: "2px solid #AB191F",
            boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, .1)",
        }
    }

    const selectSX = {
        marginLeft: "-10px",
        marginRight: "15px",
        marginTop: "-10px",
        width: "100px", height: "35px", fontSize: "11pt",
        '.MuiOutlinedInput-notchedOutline': {
            border: "2px solid #AB191F"

        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: "2px solid #AB191F"
        },
    }

    const menuItemSX = {
        borderRadius: "5px",
        padding: "5px",
        "&:hover": {

            boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, .1)",
        }

    }

    return (
        
        /*
        <Container sx={{ width: '100%' }}>
            <Box style={{ position: "fixed", bottom: "0", right: "0" }}>
                <IconButton
                    onMouseEnter={handleHovered}
                    onMouseLeave={handleLeave}
                    onClick={handleOpen}
                    sx={{ m: 3 }}
                    style={{
                        borderRadius: '50%',
                        width: "75px",
                        height: "75px",
                        backgroundColor: hovered === true ? "#f5ebe0" : "#AB191F",
                        display: "flex",
                        justifyContent: "center",
                        boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, .2)",
                    }}>
                    <AddHomeIcon
                        style={{
                            color: hovered === true ? "#AB191F" : "#f5ebe0",
                            fontSize: "25pt",
                            justifyContent: "center"
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
                            marginTop: "15px",

                        }}
                        style={{
                            backgroundColor: "#F6EBE1",
                            overflow: "hidden"
                        }}>
                        <AspectRatio minHeight={100} maxHeight={200} minWidth={300} maxWidth={400}
                            style={{
                                borderStyle: "dotted",
                                borderColor: "black",
                                marginBottom: "30px"
                            }}>

                            {!image &&
                                <label id="imageLabel" for="imageFile" style={{ color: "#AB191F" }}>
                                    Click to Add A Photo
                                    <input
                                        accept="image/*"
                                        type="file"
                                        onChange={handleAddPhotos}
                                        id="imageFile"
                                        style={{ display: "none" }}
                                    />
                                </label>}

                            {propertyImage === "" || propertyImage === null ? "" : <img src={propertyImage} />}
                        </AspectRatio>

                        <Stack direction={{ '400px': "column", md: "row", lg: "row", xl: "row" }} spacing={5} sx={{ marginTop: 2, p: 1 }}>


                            {/* Property Details }
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
                                    defaultValue="# beds"
                                    sx={selectSX}
                                    disabled={disableButton}
                                    onChange={(e) => setBed(e.target.value)}
                                    value={bed}
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
                                    value={bath}
                                    sx={{
                                        marginLeft: "-10px",
                                        marginRight: "-50px",
                                        marginTop: "-10px",
                                        width: "100px", height: "35px", fontSize: "11pt",
                                        '.MuiOutlinedInput-notchedOutline': {
                                            border: "2px solid #AB191F"

                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            border: "2px solid #AB191F"
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

                            {/* Amenities }
                            <Divider orientation={{ xs: 'horizontal', md: 'vertical', lg: 'vertical', xl: 'vertical' }} width={3} sx={{ borderBottomWidth: 3, color: "#AB191F", backgroundColor: "#AB191F", marginY: 2, marginX: 0, maxHeight: "175px" }} />
                            <Box height="175px" style={{ marginRight: "-45px", }}>
                                <Box width='200px' height='600px' style={{ margin: "-10px 0 0 -30px", textAlign: "left", padding: "0" }}>
                                    <Typography
                                        sx={{
                                            fontWeight: 600,
                                            marginTop: "-30px",
                                            marginBottom: "5px",
                                            //marginLeft:"-25px",
                                            variant: "body2"
                                        }}
                                    >
                                        Amenities
                                    </Typography>

                                    {/* Furnished }
                                    <Container style={{ float: "left", width: "100%" }}>
                                        <FormControlLabel style={{ margin: "-10px 0 0 -30px" }} label={<Typography style={{ fontSize: "11pt" }}>Furnished</Typography>} control={
                                            <Checkbox style={{}}
                                                checked={isFurnished}
                                                onChange={() => {
                                                    if (!isFurnished) {
                                                        setIsFurnished(true)
                                                        handleCheckboxChange("Furnished")
                                                    } else {
                                                        setIsFurnished(false)
                                                        handleCheckboxChange("Furnished")
                                                    }
                                                }}
                                                disabled={disableButton}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                                sx={{
                                                    color: "#AB191F",
                                                    '&.Mui-checked': {
                                                        color: "#AB191F",
                                                    },
                                                }}
                                            />}
                                        />
                                    </Container> {<br />}{<br />}

                                    {/* Kitchen Appliances }
                                    <Container style={{ float: "left", width: "100%" }}>
                                        <FormControlLabel style={{ margin: "-20px 0 0 -30px" }} label={<Typography style={{ fontSize: "11pt" }}>Kitchen Appliances</Typography>} control={
                                            <Checkbox style={{}}
                                                checked={hasKitchenApp}
                                                onChange={() => {
                                                    if (!hasKitchenApp) {
                                                        setHasKitchenApp(true)
                                                        handleCheckboxChange("Kitchen Appliance")
                                                    } else {
                                                        setHasKitchenApp(false)
                                                        handleCheckboxChange("Kitchen Appliance")
                                                    }
                                                }}
                                                disabled={disableButton}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                                sx={{
                                                    color: "#AB191F",
                                                    '&.Mui-checked': {
                                                        color: "#AB191F",
                                                    },
                                                }}
                                            />}
                                        />
                                    </Container> {<br />}{<br />}

                                    {/* In-Unit Washer Dryer }
                                    <Container style={{ float: "left", width: "100%" }}>
                                        <FormControlLabel style={{ margin: "-40px 0 0 -30px" }} label={<Typography style={{ fontSize: "11pt" }}>In-Unit Washer Dryer</Typography>} control={
                                            <Checkbox style={{}}
                                                checked={hasInUnitWD}
                                                onChange={() => {
                                                    if (!hasInUnitWD) {
                                                        setHasInUnitWD(true)
                                                        handleCheckboxChange("In Unit W/D")
                                                    } else {
                                                        setHasInUnitWD(false)
                                                        handleCheckboxChange("In Unit W/D")
                                                    }
                                                }}
                                                disabled={disableButton}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                                sx={{
                                                    color: "#AB191F",
                                                    '&.Mui-checked': {
                                                        color: "#AB191F",
                                                    },
                                                }}
                                            />}
                                        />
                                    </Container> {<br />}{<br />}

                                    {/* Parking }
                                    <Container style={{ float: "left", width: "50%" }}>
                                        <FormControlLabel style={{ margin: "-60px 0 0 -30px" }} label={<Typography style={{ fontSize: "11pt" }}>Parking</Typography>} control={
                                            <Checkbox style={{}}
                                                checked={hasParking}
                                                onChange={() => {
                                                    if (!hasParking) {
                                                        setHasParking(true)
                                                        handleCheckboxChange("Parking")
                                                    } else {
                                                        setHasParking(false)
                                                        handleCheckboxChange("Parking")
                                                    }
                                                }}
                                                disabled={disableButton}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                                sx={{
                                                    color: "#AB191F",
                                                    '&.Mui-checked': {
                                                        color: "#AB191F",
                                                    },
                                                }}
                                            />}
                                        />
                                    </Container> {<br />}{<br />}

                                    {/* Pet Friendly}
                                    <Container style={{ float: "left", width: "100%" }}>
                                        <FormControlLabel style={{ margin: "-80px 0 0 -30px" }} label={<Typography style={{ fontSize: "11pt" }}>Pet Friendly</Typography>} control={
                                            <Checkbox style={{}}
                                                checked={isPetFriendly}
                                                onChange={() => {
                                                    if (!isPetFriendly) {
                                                        setIsPetFriendly(true)
                                                        handleCheckboxChange("Pet Friendly")
                                                    } else {
                                                        setIsPetFriendly(false)
                                                        handleCheckboxChange("Pet Friendly")
                                                    }
                                                }}
                                                disabled={disableButton}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                                sx={{
                                                    color: "#AB191F",
                                                    '&.Mui-checked': {
                                                        color: "#AB191F",
                                                    },
                                                }}
                                            />}
                                        />
                                    </Container> {<br />}{<br />}

                                    {/* Gym }
                                    <Container style={{ float: "left", width: "100%" }}>
                                        <FormControlLabel style={{ margin: "-100px 0 0 -30px" }} label={<Typography style={{ fontSize: "11pt" }}>Gym</Typography>} control={
                                            <Checkbox style={{}}
                                                checked={hasGym}
                                                onChange={() => {
                                                    if (!hasGym) {
                                                        setHasGym(true)
                                                        handleCheckboxChange("Gym")
                                                    } else {
                                                        setHasGym(false)
                                                        handleCheckboxChange("Gym")
                                                    }
                                                }}
                                                disabled={disableButton}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                                sx={{
                                                    color: "#AB191F",
                                                    '&.Mui-checked': {
                                                        color: "#AB191F",
                                                    },
                                                }}
                                            />}
                                        />
                                    </Container>
                                </Box>
                            </Box>

                            {/* Utilities }
                            <Divider orientation={{ xs: 'horizontal', md: 'vertical', lg: 'vertical', xl: 'vertical' }} width={3} sx={{ borderBottomWidth: 3, color: "#AB191F", backgroundColor: "#AB191F", marginY: 2, marginX: 0, maxHeight: "175px" }} />
                            <Box height="175px" style={{ marginRight: "-25px", }}>
                                <Box width='200px' height='600px' style={{ margin: "-10px 0 0 -30px", textAlign: "left", padding: "0" }}>
                                    <Typography
                                        sx={{
                                            fontWeight: 600,
                                            marginTop: "-30px",
                                            marginBottom: "5px",
                                            //marginLeft:"-25px",
                                            variant: "body2"
                                        }}
                                    >
                                        Utilities
                                    </Typography>

                                    {/* Water}
                                    <Container style={{ float: "left", width: "100%", }}>
                                        <FormControlLabel style={{ margin: "-10px 0 0 -30px" }} label={<Typography style={{ fontSize: "11pt" }}>Water</Typography>} control={
                                            <Checkbox style={{}}
                                                checked={includeWater}
                                                onChange={() => {
                                                    if (!includeWater) {
                                                        setIncludeWater(true)
                                                        handleUtilChange('water', true)
                                                    } else {
                                                        setIncludeWater(false)
                                                        handleUtilChange('water', false)
                                                    }
                                                }}
                                                disabled={disableButton}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                                sx={{
                                                    color: "#AB191F",
                                                    '&.Mui-checked': {
                                                        color: "#AB191F",
                                                    },
                                                }}
                                            />}
                                        />
                                    </Container> {<br />}{<br />}

                                    {/* Electricity }
                                    <Container style={{ float: "left", width: "100%" }}>
                                        <FormControlLabel style={{ margin: "-20px 0 0 -30px" }} label={<Typography style={{ fontSize: "11pt" }}>Electricity</Typography>} control={
                                            <Checkbox style={{}}
                                                checked={includeElec}
                                                onChange={() => {
                                                    if (!includeElec) {
                                                        setIncludeElec(true)
                                                        handleUtilChange('electricity', true)
                                                    } else {
                                                        setIncludeElec(false)
                                                        handleUtilChange('electricity', false)
                                                    }
                                                }}
                                                disabled={disableButton}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                                sx={{
                                                    color: "#AB191F",
                                                    '&.Mui-checked': {
                                                        color: "#AB191F",
                                                    },
                                                }}
                                            />}
                                        />
                                    </Container> {<br />}{<br />}

                                    {/* Gas }
                                    <Container style={{ float: "left", width: "100%", }}>
                                        <FormControlLabel style={{ margin: "-40px 0 0 -30px" }} label={<Typography style={{ fontSize: "11pt" }}>Gas</Typography>} control={
                                            <Checkbox style={{}}
                                                checked={includeGas}
                                                onChange={() => {
                                                    if (!includeGas) {
                                                        setIncludeGas(true)
                                                        handleUtilChange('gas', true)
                                                    } else {
                                                        setIncludeGas(false)
                                                        handleUtilChange('gas', false)
                                                    }
                                                }}
                                                disabled={disableButton}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                                sx={{
                                                    color: "#AB191F",
                                                    '&.Mui-checked': {
                                                        color: "#AB191F",
                                                    },
                                                }}
                                            />}
                                        />
                                    </Container> {<br />}{<br />}

                                    {/* Trash }
                                    <Container style={{ float: "left", width: "100%", }}>
                                        <FormControlLabel style={{ margin: "-60px 0 0 -30px" }} label={<Typography style={{ fontSize: "11pt" }}>Trash</Typography>} control={
                                            <Checkbox style={{}}
                                                checked={includeTrash}
                                                onChange={() => {
                                                    if (!includeTrash) {
                                                        setIncludeTrash(true)
                                                        handleUtilChange('trash', true)
                                                    } else {
                                                        setIncludeTrash(false)
                                                        handleUtilChange('trash', false)
                                                    }
                                                }}
                                                disabled={disableButton}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                                sx={{
                                                    color: "#AB191F",
                                                    '&.Mui-checked': {
                                                        color: "#AB191F",
                                                    },
                                                }}
                                            />}
                                        />
                                    </Container> {<br />}{<br />}

                                    {/* Sewage }
                                    <Container style={{ float: "left", width: "100%", }}>
                                        <FormControlLabel style={{ margin: "-80px 0 0 -30px" }} label={<Typography style={{ fontSize: "11pt" }}>Sewage</Typography>} control={
                                            <Checkbox style={{}}
                                                checked={includeSewage}
                                                onChange={() => {
                                                    if (!includeSewage) {
                                                        setIncludeSewage(true)
                                                        handleUtilChange('sewage', true)
                                                    } else {
                                                        setIncludeSewage(false)
                                                        handleUtilChange('sewage', false)
                                                    }
                                                }}
                                                disabled={disableButton}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                                sx={{
                                                    color: "#AB191F",
                                                    '&.Mui-checked': {
                                                        color: "#AB191F",
                                                    },
                                                }}
                                            />}
                                        />
                                    </Container> {<br />}{<br />}

                                    {/* Internet }
                                    <Container style={{ float: "left", width: "100%", }}>
                                        <FormControlLabel style={{ margin: "-100px 0 0 -30px" }} label={<Typography style={{ fontSize: "11pt" }}>Internet</Typography>} control={
                                            <Checkbox style={{}}
                                                checked={includeInternet}
                                                onChange={() => {
                                                    if (!includeInternet) {
                                                        setInternet(true)
                                                        handleUtilChange('internet', true)
                                                    } else {
                                                        setInternet(false)
                                                        handleUtilChange('internet', false)
                                                    }
                                                }}
                                                disabled={disableButton}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                                sx={{
                                                    color: "#AB191F",
                                                    '&.Mui-checked': {
                                                        color: "#AB191F",
                                                    },
                                                }}
                                            />}
                                        />
                                    </Container> {<br />}{<br />}
                                </Box>
                            </Box>

                            {/* Add Coop button }
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
                                }} />
                            <Button
                                sx={{
                                    ":hover": {
                                        borderColor: "#F6EBE1", bgcolor: "#F6EBE1", color: "#AB191F",
                                        borderWidth: 1.5
                                    },
                                    borderColor: "#AB191F", bgcolor: "#AB191F", color: "#F6EBE1",
                                    borderWidth: 1.5, width: "112px", height: "35px", fontWeight: 600, lineHeight: "11px",
                                    boxShadow: 5, float: "right", bottom: 20, right: 30,
                                    marginBottom: "30px",
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
            </Dialog>
            */
        <Container sx={{ width: '100%' }}>
            <Box style={{ position: "fixed", bottom: "0", right: "0" }}>
                <IconButton
                    onMouseEnter={handleHovered}
                    onMouseLeave={handleLeave}
                    onClick={() => setOpen(true)}
                    sx={{ m: 3 }}
                    style={{
                        borderRadius: '50%',
                        width: "75px",
                        height: "75px",
                        backgroundColor: hovered === true ? "#f5ebe0" : "#AB191F",
                        display: "flex",
                        justifyContent: "center",
                        boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, .2)",
                    }}>
                    <AddHomeIcon
                        style={{
                            color: hovered === true ? "#AB191F" : "#f5ebe0",
                            fontSize: "25pt",
                            justifyContent: "center"
                        }}
                    />
                </IconButton>
            </Box>
            {open === true ? <AddCoopView setOpen={setOpen}></AddCoopView> : ''}
            <Box sx={{ marginTop: 3 }} style={styles.feed}>
                {loading ? ( // Display loading spinner while loading
                    <CardPlaceholder isCoopmateCard={false}/>
                ) : (
                    myCoopsArr.length > 0 ? (
                        myCoopsArr.map(cards => {
                            return <PropertyView data={cards} myCoops={true} login={login} />;
                        })
                    ) : (
                        <Typography
                            sx={{
                                fontWeight: 600,
                                fontSize: 25,
                                color: "#AB191F",
                            }}
                        >
                            You have no properties!
                        </Typography>
                    )
                )}
            </Box>

        </Container>
    )
}
export default MyCoopsPage;
