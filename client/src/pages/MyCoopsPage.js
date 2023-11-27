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
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';

const MyCoopsPage = ({ login }) => {
    const theme = useTheme();
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
        <Container sx={{ width: '100%' }}>
            <Box style={{ position: "fixed", bottom: "0", right: "0" }}>
                <IconButton
                    onMouseEnter={handleHovered}
                    onMouseLeave={handleLeave}
                    onClick={() => setOpen(true)}
                    sx={{
                        m: 3,
                        borderRadius: '50%',
                        width: "75px",
                        height: "75px",
                        backgroundColor: hovered === true ? "primaryColor" : "secondaryColor",
                        display: "flex",
                        justifyContent: "center",
                        boxShadow: theme.palette.type === 'light' ? "0px 0px 3px 3px rgba(0, 0, 0, .1)" : "0px 0px 3px 3px rgba(245, 235, 224, .1)",
                    }}>
                    <AddHomeIcon
                        sx={{
                            color: hovered === true ? "secondaryColor" : "primaryColor",
                            fontSize: "25pt",
                            justifyContent: "center"
                        }}
                    />
                </IconButton>
            </Box>
            {open === true ? <AddCoopView setOpen={setOpen}></AddCoopView> : ''}
            <Box sx={{ marginTop: 3 }} style={styles.feed}>
                {loading ? ( // Display loading spinner while loading
                    <div style={styles.feed}>
                        {
                            /*
                             * TODO:
                             * add a full screen of placeholders
                             */
                        }
                        <CardPlaceholder isCoopmateCard={false} />
                        <CardPlaceholder isCoopmateCard={false} />
                        <CardPlaceholder isCoopmateCard={false} />
                        <CardPlaceholder isCoopmateCard={false} />
                        <CardPlaceholder isCoopmateCard={false} />
                        <CardPlaceholder isCoopmateCard={false} />
                        <CardPlaceholder isCoopmateCard={false} />
                        <CardPlaceholder isCoopmateCard={false} />

                    </div>
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
