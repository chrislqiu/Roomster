import React, { useState, useEffect } from "react"
import { InputAdornment, CircularProgress, FormControl, InputLabel, MenuItem, Select, Dialog, DialogContent, DialogActions, Tooltip, IconButton, Avatar, InputBase, Slider, Checkbox, Grid, Card, Container, Box, Typography, CardContent, Input, Divider, TextField, Link, Button, FormControlLabel, Stack, Icon } from "@mui/material";
import AddHomeIcon from '@mui/icons-material/AddHome';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { AspectRatio } from "@mui/joy";
import toast, { Toaster } from 'react-hot-toast'
import PropertyView from "../components/PropertyView";
import { useTheme } from '@mui/material/styles';


const AddCoopView = ({ setOpen, editMode, data }) => {
    const theme = useTheme();
    /* propertyInfo, setPropertyInfo to hold the card information from the server */
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
    const [imageURLs, setImageURLs] = useState([]);
    const [hasImages, setHasImages] = useState(false);
    //const [propertyImage, setPropertyImage] = React.useState("")
    //const [image, setHasImage] = React.useState(false)

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

    const [utilities, setUtilities] = React.useState([])

    /* AUTOFILL DATA */
    useEffect(() => {
        // autofill data
        if (data) {
            setImageURLs(data.image)
            setPropertyName(data.propertyName);
            setPropertyAddress(data.propertyAddress)
            setPrice(data.price);
            setBed(data.beds);
            setBath(data.baths)
            setAmenitiesArr(data.amenities)
            if (data.amenities.includes("Gym")) {
                setHasGym(true)
            }
            if (data.amenities.includes("Pet Friendly")) {
                setIsPetFriendly(true)
            }
            if (data.amenities.includes("Furnished")) {
                setIsFurnished(true)
            }
            if (data.amenities.includes("Kitchen Appliance")) {
                setHasKitchenApp(true)
            }
            if (data.amenities.includes("In Unit W/D")) {
                setHasInUnitWD(true)
            }
            if (data.amenities.includes("Parking")) {
                setHasParking(true)
            }
            setUtilities(data.utilities)
            if (data.utilities.includes("Electricity")) {
                setIncludeElec(true)
            }
            if (data.utilities.includes("Water")) {
                setIncludeWater(true)
            }
            if (data.utilities.includes("Gas")) {
                setIncludeGas(true)
            }
            if (data.utilities.includes("Trash")) {
                setIncludeTrash(true)
            }
            if (data.amenities.includes("Sewage")) {
                setIncludeSewage(true)
            }
            if (data.amenities.includes("Internet")) {
                setInternet(true)
            }
        }
    }, []);
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

    const customToastStyle = {
        color: 'white',
    };

    const handleAmenityChange = (amenity) => {
        if (amenitiesArr.includes(amenity)) {
            // If the amenity is already in the array, remove it
            setAmenitiesArr(amenitiesArr.filter((item) => item !== amenity));
        } else {
            // If the amenity is not in the array, add it
            setAmenitiesArr([...amenitiesArr, amenity]);
        }
    };

    const handleUtilChange = (util) => {
        if (utilities.includes(util)) {
            // If the util is already in the array, remove it
            setUtilities(utilities.filter((item) => item !== util));
        } else {
            // If the util is not in the array, add it
            setUtilities([...utilities, util]);
        }
    };

    const handleAppCoop = async () => {
       let loading;
        if (propertyName === '' || propertyAddress === '' || price === '' || bed === -1 || bath === -1) {
            toast.error(`Please fill in all the textfileds and dropdown! ${propertyName} ${propertyAddress} ${price} ${bed} ${bath}`, { style: customToastStyle })
            return;
        } 
        else {
            loading = toast.loading('Updating Property...Please Be Patient')
        }

        const dataToSend = {
            propertyInfo: {
                _id: editMode === true ? data._id : '',
                image: imageURLs,
                propertyName: propertyName,
                address: propertyAddress,
                beds: bed,
                baths: bath,
                cost: price,
                sqft: '',
                distance: '',
                amenities: amenitiesArr,
                utilities: utilities
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
                toast.success("Save Success!", { style: customToastStyle })
                toast.dismiss(loading)

            })
            .catch(error => {
                console.error('ERRORRR: ', error);
            });
            //toast.success("Save Success!", { style: customToastStyle })
            setTimeout(() => {
                window.location.reload();
            }, 1500);

    }

    /* Add photos */
    function handleAddPhotos(event) {
        const files = event.target.files;
        if (files.length === 0) {
            return;
        }
        const newImages = [];
        const promises = [];
        for (const file of files) {
            const promise = new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    newImages.push(reader.result);
                    resolve();
                };
            });
            promises.push(promise);
        }

        Promise.all(promises).then(() => {
            setImageURLs((prevImageUrls) => [...prevImageUrls, ...newImages]);
            setHasImages(true);
        });

    }
    /* remove photo if change mind */
    const handleRemovePhotos = (index) => {
        const updatedUrls = [...imageURLs]
        updatedUrls.splice(index, 1);
        setImageURLs(updatedUrls)

    };


    const styles = {
        feed: {
            display: "flex",
            justifyContent: "center",
            maxWidth: "1200px",
            flexWrap: "wrap",
        },
    }

    const inputBaseSX = {
        margin: "0 0 10px 0",
        width: "205px",
        height: "35px",
        borderRadius: "5px",
        border: "2px solid",
        borderColor: "secondaryColor",
        padding: "5px",
        "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: theme.palette.type === "dark" ? "#F6EBE1" : "",
        },
        input: {
            color: "textColor",
            "&::placeholder": {
                opacity: 0.7,
                color: "textColor",
                },
        },
        "&:hover": {
            border: "2px solid",
            borderColor: "secondaryColor",
            boxShadow: theme.palette.type === 'light' ? "0px 0px 3px 3px rgba(0, 0, 0, .1)" : "0px 0px 3px 3px rgba(245, 235, 224, .1)",
        },
    }

    const textfieldSX = {
        "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: theme.palette.type === "dark" ? "#F6EBE1" : "",
        },
        input: {
            color: "textColor",
            "&::placeholder": {
                opacity: 0.7,
                color: "textColor",
            },
        },
        margin: "0 0 10px 25px", 
        width:"280px", 
        borderRadius: "5px",
        border: "2px solid",
        borderColor: "secondaryColor",
        "& fieldset": { border: 'none', color: "textColor"},
        "& label": {color: "textColor"},
        "&:hover" : {boxShadow: theme.palette.type === 'light' ? "0px 0px 3px 3px rgba(0, 0, 0, .1)" : "0px 0px 3px 3px rgba(245, 235, 224, .1)",}       
    }

    const selectSX = {
        color: "textColor",
        width: "95px", height: "35px", fontSize: "11pt",
        "&.Mui-disabled": {
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "secondaryColor",
                borderWidth: "2px",
            },
            "& .MuiSelect-icon": {
                color: "secondaryColor",
            }
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "secondaryColor",
            borderWidth: "2px",
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'secondaryColor',
        },
        "& .MuiSelect-icon": {
            color: "secondaryColor",
        },
        "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: theme.palette.type === "dark" ? "#F6EBE1" : "",
            opacity: 0.7,
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
        <Dialog
            open={setOpen}
            onClose={handleClose}
            sx={{
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        width: "70%",
                        maxWidth: 750,
                        maxHeight: 500,
                        backgroundColor: "primaryColor",
                        boxShadow: theme.palette.type === 'light' ? "0px 0px 3px 3px rgba(0, 0, 0, .1)" : "0px 0px 3px 3px rgba(245, 235, 224, .1)",
                    },
                },
            }}
        >
            <DialogContent>
                <Container
                    sx={{
                        backgroundColor: "primaryColor",
                        overflow: "hidden"
                    }}
                    style={{

                    }}>
                    {
                        (
                            [0, 1, 2].map((boxIndex) => (
                                <label key={boxIndex} htmlFor={`imageFile${boxIndex}`} style={{ position: 'relative', display: 'inline-block', marginRight: '10px' }}>
                                    <Box
                                        sx={{
                                            //margin: '0',
                                            padding: 1,
                                            marginBottom: 2,
                                            border: '3px dashed',
                                            borderColor: 'secondaryColor',
                                            minHeight: '150px',
                                            maxHeight: '300px',
                                            minWidth: '300px',
                                            width: '650px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Click to Add Photo {boxIndex + 1}
                                        <input
                                            accept="image/*"
                                            type="file"
                                            onChange={(e) => handleAddPhotos(e, boxIndex)}
                                            id={`imageFile${boxIndex}`}
                                            style={{ display: 'none' }}
                                            multiple
                                            disabled={disableButton}
                                        />
                                    </Box>

                                    {imageURLs[boxIndex] && (
                                        <div style={{ position: 'absolute', top: 0, left: 0 }}>
                                            <img
                                                src={imageURLs[boxIndex]}
                                                alt={`Property Image ${boxIndex + 1}`}
                                                style={{ objectFit: 'fill', height: '175px', width: '673px' }}
                                            />
                                            <Button
                                                onClick={() => handleRemovePhotos(boxIndex)}
                                                disabled={disableButton}
                                                sx={{
                                                    ":hover": {
                                                        borderColor: "#F6EBE1", bgcolor: "#F6EBE1", color: "#AB191F",
                                                        borderWidth: 1.5
                                                    },
                                                    borderColor: disableButton ? "light grey" : "#AB191F",
                                                    bgcolor: disableButton ? "light grey" : "#AB191F",
                                                    color: "#F6EBE1",
                                                    borderWidth: 1.5, width: "112px", height: "35px", fontWeight: 600, lineHeight: "11px",
                                                    boxShadow: 5, float: "right", bottom: 15, right: 10,
                                                    position: "absolute"
                                                }}
                                                variant="outlined"
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    )}
                                </label>
                            ))
                        )
                    }

                    <Stack direction={{ '400px': "column", md: "row", lg: "row", xl: "row" }} spacing={5} sx={{ marginTop: 2, p: 1 }}>

                        {/* Property Details */}
                        <Box width='600'>
                            <InputBase
                                placeholder="Enter property name"
                                id="name-textfield"
                                sx={inputBaseSX}
                                disabled={disableButton}
                                defaultValue={editMode === true ? data.propertyName : propertyName}
                                onChange={(e) => setPropertyName(e.target.value)}
                            /> {<br />}{<br />}
                            <InputBase
                                placeholder="Enter property address"
                                id="addr-textfield"
                                sx={inputBaseSX}
                                disabled={disableButton}
                                defaultValue={editMode === true ? data.address : propertyAddress}
                                onChange={(e) => setPropertyAddress(e.target.value)}
                            /> {<br />}{<br />}
                            <InputBase
                                placeholder="Enter property price"
                                id="price-textfield"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                sx={inputBaseSX}
                                disabled={disableButton}
                                defaultValue={editMode === true ? data.cost : price}
                                onChange={(e) => setPrice(e.target.value)}
                            /> {<br />}{<br />}

                            <Select
                                id="beds-input"
                                defaultValue={editMode === true ? data.beds : bed}
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
                                defaultValue={editMode === true ? data.baths : bath}
                                disabled={disableButton}
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
                                onChange={(e) => setBath(e.target.value)}
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

                        {/* Amenities */}
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

                                {/* Furnished */}
                                <Container style={{ float: "left", width: "100%" }}>
                                    <FormControlLabel style={{ margin: "-10px 0 0 -30px" }} label={<Typography style={{ fontSize: "11pt" }}>Furnished</Typography>} control={
                                        <Checkbox style={{}}
                                            defaultChecked={editMode === true ? data.amenities.includes("Furnished") : isFurnished}
                                            onChange={() => {
                                                setIsFurnished(prevState => {
                                                    handleAmenityChange("Furnished")
                                                    return !prevState;
                                                });
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

                                {/* Kitchen Appliances */}
                                <Container style={{ float: "left", width: "100%" }}>
                                    <FormControlLabel style={{ margin: "-20px 0 0 -30px" }} label={<Typography style={{ fontSize: "11pt" }}>Kitchen Appliances</Typography>} control={
                                        <Checkbox style={{}}
                                            defaultChecked={editMode === true ? data.amenities.includes("Kitchen Appliance") : hasKitchenApp}
                                            onChange={() => {
                                                setHasKitchenApp(prevState => {
                                                    handleAmenityChange("Kitchen Appliance")
                                                    return !prevState;
                                                });
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

                                {/* In-Unit Washer Dryer */}
                                <Container style={{ float: "left", width: "100%" }}>
                                    <FormControlLabel style={{ margin: "-40px 0 0 -30px" }} label={<Typography style={{ fontSize: "11pt" }}>In-Unit Washer Dryer</Typography>} control={
                                        <Checkbox style={{}}
                                            defaultChecked={editMode === true ? data.amenities.includes("In Unit W/D") : hasInUnitWD}
                                            onChange={() => {
                                                setHasInUnitWD(prevState => {
                                                    handleAmenityChange("In Unit W/D")
                                                    return !prevState;
                                                });
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

                                {/* Parking */}
                                <Container style={{ float: "left", width: "50%" }}>
                                    <FormControlLabel style={{ margin: "-60px 0 0 -30px" }} label={<Typography style={{ fontSize: "11pt" }}>Parking</Typography>} control={
                                        <Checkbox style={{}}
                                            defaultChecked={editMode === true ? data.amenities.includes("Parking") : hasParking}
                                            onChange={() => {
                                                setHasParking(prevState => {
                                                    handleAmenityChange("Parking")
                                                    return !prevState;
                                                });
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

                                {/* Pet Friendly */}
                                <Container style={{ float: "left", width: "100%" }}>
                                    <FormControlLabel style={{ margin: "-80px 0 0 -30px" }} label={<Typography style={{ fontSize: "11pt" }}>Pet Friendly</Typography>} control={
                                        <Checkbox style={{}}
                                            defaultChecked={editMode === true ? data.amenities.includes("Pet Friendly") : isPetFriendly}
                                            onChange={() => {
                                                setIsPetFriendly(prevState => {
                                                    handleAmenityChange("Pet Friendly")
                                                    return !prevState;
                                                });
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

                                {/* Gym */}
                                <Container style={{ float: "left", width: "100%" }}>
                                    <FormControlLabel style={{ margin: "-100px 0 0 -30px" }} label={<Typography style={{ fontSize: "11pt" }}>Gym</Typography>} control={
                                        <Checkbox style={{}}
                                            defaultChecked={editMode === true ? data.amenities.includes("Gym") : hasGym}
                                            onChange={() => {
                                                setHasGym(prevState => {
                                                    handleAmenityChange("Gym")
                                                    return !prevState;
                                                });
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

                        {/* Utilities */}
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

                                {/* Water */}
                                <Container style={{ float: "left", width: "100%", }}>
                                    <FormControlLabel style={{ margin: "-10px 0 0 -30px" }} label={<Typography style={{ fontSize: "11pt" }}>Water</Typography>} control={
                                        <Checkbox style={{}}
                                            defaultChecked={editMode === true ? data.utilities.includes("Water") : includeWater}
                                            onChange={() => {
                                                setIncludeWater(prevState => {
                                                    handleUtilChange("Water");
                                                    return !prevState;
                                                });
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

                                {/* Electricity */}
                                <Container style={{ float: "left", width: "100%" }}>
                                    <FormControlLabel style={{ margin: "-20px 0 0 -30px" }} label={<Typography style={{ fontSize: "11pt" }}>Electricity</Typography>} control={
                                        <Checkbox style={{}}
                                            defaultChecked={editMode === true ? data.utilities.includes("Electricity") : includeElec}
                                            onChange={() => {
                                                setIncludeElec(prevState => {
                                                    handleUtilChange("Electricity");
                                                    return !prevState;
                                                });
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

                                {/* Gas */}
                                <Container style={{ float: "left", width: "100%", }}>
                                    <FormControlLabel style={{ margin: "-40px 0 0 -30px" }} label={<Typography style={{ fontSize: "11pt" }}>Gas</Typography>} control={
                                        <Checkbox style={{}}
                                            defaultChecked={editMode === true ? data.utilities.includes("Gas") : includeGas}
                                            onChange={() => {
                                                setIncludeGas(prevState => {
                                                    handleUtilChange("Gas");
                                                    return !prevState;
                                                });
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

                                {/* Trash */}
                                <Container style={{ float: "left", width: "100%", }}>
                                    <FormControlLabel style={{ margin: "-60px 0 0 -30px" }} label={<Typography style={{ fontSize: "11pt" }}>Trash</Typography>} control={
                                        <Checkbox style={{}}
                                            defaultChecked={editMode === true ? data.utilities.includes("Trash") : includeTrash}
                                            onChange={() => {
                                                setIncludeTrash(prevState => {
                                                    handleUtilChange("Trash");
                                                    return !prevState;
                                                });
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

                                {/* Sewage */}
                                <Container style={{ float: "left", width: "100%", }}>
                                    <FormControlLabel style={{ margin: "-80px 0 0 -30px" }} label={<Typography style={{ fontSize: "11pt" }}>Sewage</Typography>} control={
                                        <Checkbox style={{}}
                                            defaultChecked={editMode === true ? data.utilities.includes("Sewage") : includeSewage}
                                            onChange={() => {
                                                setIncludeSewage(prevState => {
                                                    handleUtilChange("Sewage");
                                                    return !prevState;
                                                });
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

                                {/* Internet */}
                                <Container style={{ float: "left", width: "100%", }}>
                                    <FormControlLabel style={{ margin: "-100px 0 0 -30px" }} label={<Typography style={{ fontSize: "11pt" }}>Internet</Typography>} control={
                                        <Checkbox style={{}}
                                            defaultChecked={editMode === true ? data.utilities.includes("Internet") : includeInternet}
                                            onChange={() => {
                                                setInternet(prevState => {
                                                    handleUtilChange("Internet");
                                                    return !prevState;
                                                });
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
                        {console.log(amenitiesArr)}
                        {console.log(propertyName, utilities, imageURLs)}
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
                                    editMode = false;
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
    )
}
export default AddCoopView;