import * as React from 'react';
import Button from '@mui/material/Button';
import { List, ListItem, Box, Card, CardContent, CardMedia, IconButton, Tooltip, CircularProgress, } from '@mui/material';
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
import StarIconOutlined from '@mui/icons-material/StarOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckIcon from "@mui/icons-material/Check";
import LinkIcon from '@mui/icons-material/Link';
import { useNavigate, createSearchParams } from 'react-router-dom';
import AddCoopView from './AddCoopView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuildingCircleCheck, faStar } from '@fortawesome/free-solid-svg-icons'
import { toast, ToastContainer } from 'react-toastify';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './ImageGallery';
import ScheduleTourView from './ScheduleTourView';
import { useTheme } from '@mui/material/styles';
import amongus from '../images/amongusturkey.jpeg'
import MapIcon from '@mui/icons-material/Map';
import MapView from "../components/MapView"
import { Buffer } from "buffer";

/* 
 * Property Card (Rachel La)
 * More Property Detail Dialogue for the Property card (Tea Lazareto)
 * Parameters:
 * (temporary until property cards) text: button text 
 * data : The property data from the database
 * featured : Boolean to determine whether the card is featured or not
 * favCoops : Boolean to determine if card is on favCoops page
 */
const PropertyViewMore = ({ data, featured, favCoops, myCoops, login, verifyProperty, featureRequest, featureRequestManage, autoOpen }) => {
    const [newImage, setImage] = React.useState([]);


    var image, propertyName, address, beds, baths, cost, amenities, utilities, id
    if (myCoops) {
        image = data.image;
        id = data._id
        propertyName = data.propertyName;
        address = data.address;
        beds = data.beds;
        baths = data.baths;
        cost = data.cost;
        amenities = data.amenities;
        utilities = data.utilities;
    } else {
        image = data.propertyInfo.image;
        id = data.propertyInfo._id
        propertyName = data.propertyInfo.propertyName;
        address = data.propertyInfo.address;
        beds = data.propertyInfo.beds;
        baths = data.propertyInfo.baths;
        cost = data.propertyInfo.cost;
        amenities = data.propertyInfo.amenities;
        utilities = data.propertyInfo.utilities;
    }
    React.useEffect(() => {
        const fetchImages = async (objectId) => {
            try {
                const response = await fetch(`http://localhost:8000/images/${objectId}`);
                const data = await response.json();
                // console.log(data.images)

                if (data.success) {
                    setImage(data.images)
                } else {
                    console.error('Error fetching images:', data.message);
                    setImage([])
                }
            } catch (error) {
                console.error('Error fetching images:', error.message);
                setImage([])
            }
        }

        fetchImages(id)

    }, []);

    // console.log(newImage)

    for (let i = 0; i < newImage.length; i++) {
        const imageDataObject = newImage[i].image;
        // console.log(Buffer.from)
        
        // Assuming imageDataObject has a 'data' property that is a Buffer
        const base64String = Buffer.from(imageDataObject.data).toString("base64")
        console.log(base64String)
        
        // Now store the base64 string in the image array
        image[i] = `data:image/jpeg;base64,${base64String}`;
        console.log(image[i])
      }


    if (image.length > 0) {
        console.log(image[0])
    }





    //const testimages = [image, amongus]
    const imageArr = image

    /*
     * open, setOpen : controls the state of the dialogue popup
     */
    const [open, setOpen] = React.useState(false)
    //const [utilities, setUtilities] = React.useState('')
    const [saves, setSaves] = React.useState(myCoops === true ? (data.saves < 0 ? 0 : data.saves) : (data.propertyInfo.saves < 0 ? 0 : data.propertyInfo.saves))
    const [updateOrRemove, setUpdateOrRemove] = React.useState('')
    const [userData, setUserData] = React.useState('')
    const [userType, setUserType] = React.useState('')
    const [favCoopsArr, setFavCoopsArr] = React.useState([])
    const [myCoopsArr, setMyCoopsArr] = React.useState([])
    const [isVerified, setIsVerified] = React.useState(false)
    const [isFeatured, setIsFeatured] = React.useState(false)
    const [loading, setLoading] = React.useState(true);
    const coopFavorited = favCoopsArr.some(coops => coops._id.toString() === data._id.toString())
    const [mapOpen, setMapOpen] = React.useState(false)

    /* Scheduling Tour */
    const [requestTourOpen, setRequestTourOpen] = React.useState(false)

    const handleOpenRequestTour = () => {
        // console.log("request = " + requestTourOpen)
        setRequestTourOpen(true)
    }

    const handleCloseRequestTour = () => {
        setRequestTourOpen(false)
    }


    const handleOpenMap = () => {
        if (!mapOpen) {
            setMapOpen(true)
        } else {
            setMapOpen(false)
        }
    }


    const getUserInfo = async () => {
        try {
            const res = await fetch('http://localhost:8000/auth/current-user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            })

            if (res.ok) {
                const getData = await res.json()
                if (getData.user_type == "renter") {
                    setUserType("renter")
                    const obj = JSON.parse(JSON.stringify(getData));
                    setUserData(getData)
                    setFavCoopsArr(obj.user.renterInfo.favCoops)
                } else if (getData.user_type == "manager") {
                    setUserType("manager")
                    const obj = JSON.parse(JSON.stringify(getData));
                    setUserData(obj)
                    setMyCoopsArr(obj.user.company.myCoops)
                }
            }

        } catch (e) {
            console.log("Error: " + e)
        }
    }


    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }


    const [editMode, setEditMode] = React.useState(false);

    const handleEdit = () => {
        setEditMode(true);
    }
    //need user information for favCoops
    //if renter user and user.favCoops contains property then set favCoops to true
    //console.log(favCoops)
    const [active, setActive] = React.useState(favCoops === true ? true : false)
    const [hovered, setHovered] = React.useState(false);
    const [isOwner, setIsOwner] = React.useState(false);
    const handleHovered = () => {
        setHovered(true)
    }
    const handleLeave = () => {
        setHovered(false)
    }


    /*
    * Handle favorite button
    */
    const handleFavorite = async () => {

        /* the id of the single property */
        const propertyId = data._id;

        //var newSavesCount = active === true ? saves - 1 : saves + 1;
        /* update the active for the button */
        setActive(!active);
        /* send id, number of saves, coop to be added, the check for delete/add */
        try {
            const response = await fetch('http://localhost:8000/cards/update-saves', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: propertyId, favCoop: data, updateOrRemove: updateOrRemove, username: userData.username }),
                credentials: "include",
            });

            if (response.ok) {
                console.log('Update successful:', response);
            } else {
                console.error(`Failed to update: ${response.status}`);
            }
        } catch (error) {
            console.error(`Error: ${error}`);
        }

        setSaves(data.propertyInfo.saves < 0 ? 0 : data.propertyInfo.saves );
        window.location.reload(true)
    }
    const styles = {
        divider: {
            height: "3px",
            backgroundColor: hovered === true ? "#f5ebe0" : "#AB191F",
            padding: "0",
            margin: "15px 0 15x 0",
        }
    }

    const navigate = useNavigate()
    const openCompanyPage = (property) => {
        navigate({
            pathname: "/CompanyPage",
            search: createSearchParams({
                companyName: data.companyInfo.name
            }).toString()
        })
    }

    //    const pullUtilities = () => {
    //        setUtilities(Object.keys(utilities).filter(key => utilities[key] === true))
    //    }

    const handleShare = async () => {
        const id = data._id;

        //("data: " + id);
        var link = window.location.href + "Property/" + id
        //console.log(link)
        //window.location.assign(link) //redirects to link
        if (link.includes("Home")) {
            link = link.replace("Home", '')
        }
        navigator.clipboard.writeText(link)
        toast.success('Link copied to clipboard!', { position: toast.POSITION.TOP_CENTER });
    };

    const handleDeleteProperty = async () => {
        const id = data._id;
        //console.log("data: " + id);
        try {
            const response = await fetch('http://localhost:8000/auth/delete-property', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ id: id }),
            });

            //console.log(response)

            if (response.ok) {
                console.log("good")
                localStorage.setItem('propertyDeleted', 'true');
                window.location.reload(true);

            } else {
                console.log("nope")
            }
        } catch (error) {
            console.log(error)
        }
    };

    const handleDeletePropertyAdmin = async () => {
        const id = data._id;
        console.log("data: " + id);
        try {
            const response = await fetch('http://localhost:8000/auth/delete-property-admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ id: id }),
            });

            console.log(response)

            if (response.ok) {
                console.log("good")
                localStorage.setItem('propertyDeleted', 'true');
                window.location.reload(true);
            } else {
                console.log("nope")
            }
        } catch (error) {
            console.log(error)
        }
    };

    const handleVerifyProperty = async () => {
        const id = data._id;
        console.log("data: " + id);
        try {
            const response = await fetch('http://localhost:8000/auth/verify-property', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ id: id }),
            });

            console.log(response)

            if (response.ok) {
                console.log("good")
                window.location.reload(true);
            } else {
                console.log("nope")
            }
        } catch (error) {
            console.log(error)
        }
    };

    const handleAcceptFeature = async () => {
        const id = data._id;
        console.log("data: " + id);
        try {
            const response = await fetch('http://localhost:8000/auth/accept-feature', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ id: id }),
            });

            console.log(response)

            if (response.ok) {
                console.log("good")
                window.location.reload(true);
            } else {
                console.log("nope")
            }
        } catch (error) {
            console.log(error)
        }
    };

    const handleDenyFeature = async () => {
        const id = data._id;
        console.log("data: " + id);
        try {
            const response = await fetch('http://localhost:8000/auth/deny-feature', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ id: id }),
            });

            console.log(response)

            if (response.ok) {
                console.log("good")
                window.location.reload(true);
            } else {
                console.log("nope")
            }
        } catch (error) {
            console.log(error)
        }
    };

    const getPropertyVerification = async () => {
        const id = data._id;
        //console.log("data: " + id);
        try {
            const response = await fetch('http://localhost:8000/auth/property-verification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // credentials: 'include',
                body: JSON.stringify({ id: id }),
            });

            //console.log(response)

            if (response.ok) {
                setIsVerified(true)
                //console.log("Property verified")
            } else {
                //console.log("Property not verified")
            }
        } catch (error) {
            console.log(error)
        }
    };

    const getPropertyFeatured = async () => {
        const id = data._id;
        console.log("data: " + id);
        try {
            const response = await fetch('http://localhost:8000/cards/get-featured', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // credentials: 'include',
                body: JSON.stringify({ id: id }),
            });

            console.log(response)

            if (response.ok) {
                setIsFeatured(true)
                console.log("Property featured")
            } else {
                console.log("Property not featured")
            }
        } catch (error) {
            console.log(error)
        }
    };

    const handleFeatureProperty = async () => {
        const id = data._id;
        console.log("data: " + id);
        try {
            const response = await fetch('http://localhost:8000/cards/request-featured', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ id: id }),
            });

            console.log(response)

            if (response.ok) {
                console.log("good")
                window.location.reload(true);
            } else {
                console.log("nope")
            }
        } catch (error) {
            console.log(error)
        }
    };

    const checkOwner = async () => {
        const id = data._id;
        // console.log(id)
        try {
            const response = await fetch('http://localhost:8000/auth/check-owner', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ id: id }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("is a owner: " + data.match)
                setIsOwner(data.match)
            } else {
                console.log('Authentication check failed');
            }
            setLoading(false);

        } catch (error) {
            console.error('Error during authentication check:', error);
        }
    };


    React.useEffect(() => {
        // checkOwner();
        // getUserInfo();
        getPropertyVerification();
        getPropertyFeatured();
        if (autoOpen === true) {
            handleOpen();
        }
    }, []);

    React.useEffect(() => {
        const propertyDeleted = localStorage.getItem('propertyDeleted');
        if (propertyDeleted === 'true') {
            toast.success('Property deleted successfully!', { position: toast.POSITION.TOP_CENTER });
            localStorage.removeItem('propertyDeleted');
        }
    }, []);

    const theme = useTheme();
    const toolTipSX = {
        tooltip: {
            sx: {
                bgcolor: theme.palette.type === "light" ? 'rgba(171, 25, 31, 0.9)' : "rgba(245, 235, 224, .8)",
                color: "primaryColor"
            },
        },
    }
    return (
        <React.Fragment>
            <ToastContainer />
            <Card
                variant='contained'
                onClick={() => {
                    if (userType === '') {
                        setLoading(true);
                    }
                    handleOpen();
                    getUserInfo();
                    checkOwner();

                }}
                onMouseEnter={handleHovered}
                onMouseLeave={handleLeave}
                sx={{
                    ":hover": {
                        bgcolor: "secondaryColor",
                        color: theme.palette.type === 'light' ? "primaryColor" : "textColor",
                        cursor: "pointer",
                    },
                    backgroundColor: "primaryColor",
                    color: theme.palette.type === 'light' ? "secondaryColor" : "textColor",
                    width: featured === true ? "230px" : "250px",
                    height: featured === true ? "280px" : "300px",
                    marginBottom: "20px",
                    marginRight: "20px",
                    borderStyle: "solid",
                    borderWidth: featured === true ? "3px" : "0",
                    borderColor: featured === true ? (theme.palette.type === 'light' ? "secondaryColor" : "textColor") : "",
                    borderRadius: "10px",
                    boxShadow: !featured ? (theme.palette.type === 'light' ? "0px 0px 3px 3px rgba(0, 0, 0, .1)" : "0px 0px 3px 2px rgba(245, 235, 224, .3)") : "none"
                }}>
                <CardActionArea>
                    {/* {console.log(data.image)} */}
                    
                    <CardMedia
                        component="img"
                        //image={data.propertyInfo.image === undefined ? data.image : data.propertyInfo.image}
                        src={imageArr[0] !== undefined ? imageArr[0] : amongus}
                        //height="140px"
                        style={{
                            height: featured === true ? "120px" : "130px",
                            width: featured === true ? "210px" : "230px",
                            margin: "10px",
                            borderRadius: "5px"
                        }}
                    />
                    <CardContent>
                        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 0 }}>

                            <Typography variant="h6" sx={{ margin: "-20px 0 0px 0" }}
                            > {propertyName.split(":")[0]} </Typography>
                            {/* {featured === true ? <StarIcon style={{margin: "-20px 0 0px 2.5"}} /> : ''} */}
                            {/* {favCoops === true ? <FavoriteIcon style={{margin: "-20px 0 0px 2.5"}} sx={{color: "#AB191F", ":hover": {color: "#F6EBE1",},}}/> : ''} */}
                            {/* <Typography variant="h6" style={{fontSize: "13pt", margin: "-20px 0 0px 0"}}> Property Name </Typography> */}
                            {featured === true ? <StarIcon style={{ margin: "-22px 0 0 5px", fontSize: "15pt" }} /> : ''}
                            {favCoops === true ? <FavoriteIcon style={{ margin: "-22px 0 0 5px", fontSize: "15pt" }} /> : ''}
                            {myCoops === true ? <BookmarkIcon style={{ margin: "-22px 0 0 5px", fontSize: "15pt" }} /> : ''}

                        </div>

                        <Typography variant="body2" sx={{ margin: "0 0 5px 0" }}>{address}</Typography>
                        <Typography variant="body2">{beds} bedroom </Typography>
                        <Typography variant="body2" sx={{ marginBottom: "5px" }}>{baths} bathroom</Typography>
                        <Divider sx={{
                            height: "3px",
                            backgroundColor: hovered === true ? (theme.palette.type === 'light' ? "primaryColor" : "textColor") : "secondaryColor",
                            padding: "0",
                            margin: "15px 0 15x 0",
                        }}></Divider>
                        <Typography variant="body1" sx={{ marginTop: "5px", textAlign: "right", fontWeight: "500", }}> ${cost} per month</Typography>

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
                            backgroundColor: "primaryColor",
                            boxShadow: theme.palette.type === 'light' ? "0px 0px 3px 3px rgba(0, 0, 0, .1)" : "0px 0px 3px 3px rgba(245, 235, 224, .1)",
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
                    {/* <img 
                            src={image}
                            srcSet={image}
                            alt=""
                            style={{ objectFit: 'fill', width: '700px', height: '200px', borderRadius: '5px'}}
                        /> */}
                    <ImageGallery images={imageArr} />
                    {
                        /*
                         * Stack direction row has each text 'chunk'
                         */
                    }
                    <Box width='600px' style={{ marginTop: "25px", marginRight: "-25px" }} >
                        {mapOpen && <MapView propertyList={data} />}
                    </Box>
                    <Stack direction={{ '400px': "column", md: "row", lg: "row", xl: "row" }} spacing={5} sx={{ marginTop: 2, p: 1 }} >
                        {/* Basic Property Info */}
                        <Box width='600px' style={{ marginTop: "5px", marginRight: "-25px" }}>

                            <Tooltip title="Go to Company Page"
                                componentsProps={toolTipSX}
                            >
                                <Link onClick={openCompanyPage} underline="hover" color="textColor" sx={{ fontWeight: 600, "&:hover": { cursor: "pointer", color: "secondaryColor" } }}>
                                    {propertyName}
                                </Link>
                            </Tooltip>
                            <Typography
                                sx={{
                                    color: "textColor",
                                    fontWeight: 300,
                                    variant: "body2",
                                    fontStyle: 'italic',
                                    marginTop: .5
                                }}
                            >
                                {address}
                            </Typography>
                            <Typography
                                sx={{
                                    color: "textColor",
                                    fontWeight: 300,
                                    variant: "body2",
                                }}
                            >
                                {beds} {beds > 1 ? 'beds' : 'bed'}, {baths} {baths > 1 ? 'baths' : 'bath'}
                            </Typography>
                            <Divider orientation='horizontal' width={150} sx={{ borderBottomWidth: 3, backgroundColor: "secondaryColor", marginY: 1 }} />
                            <Typography
                                sx={{
                                    color: "textColor",
                                    fontWeight: 500,
                                    variant: "body2",
                                }}
                            >
                                ${cost} per month
                            </Typography>
                        </Box>
                        <Divider orientation={{ xs: 'horizontal', md: 'vertical', lg: 'vertical', xl: 'vertical' }} width={3} sx={{ borderBottomWidth: 3, backgroundColor: "secondaryColor", marginY: 2 }} />

                        {/* Amenitites */}
                        <Box width='600px' style={{ marginTop: "-5px", marginRight: "-25px" }} >
                            <Typography
                                sx={{
                                    color: "textColor",
                                    fontWeight: 600,
                                    marginTop: 1,
                                    marginLeft: "-25px",
                                    variant: "body2"
                                }}
                            >
                                Amenities
                            </Typography>
                            {amenities.map((amenity) => {
                                return <List
                                    sx={{
                                        color: "textColor",
                                        listStyleType: 'disc',
                                        listStylePosition: 'inside',
                                        marginLeft: "-40px",
                                        marginTop: "-15px",
                                        marginBottom: "-25px"
                                    }}
                                >
                                    <ListItem sx={{ color: "textColor", display: 'list-item' }}>
                                        {amenity}
                                    </ListItem>
                                </List>
                            })}

                        </Box>
                        <Divider orientation='verticle' width={3} sx={{ borderBottomWidth: 3, backgroundColor: "secondaryColor", marginY: 2 }} />

                        {/* Utilities */}
                        <Box width='600px' style={{ marginTop: "-5px", marginRight: "-25px" }} >
                            <Typography
                                sx={{
                                    color: "textColor",
                                    fontWeight: 600,
                                    marginTop: 1,
                                    marginRight: "5px",
                                    marginLeft: "-25px",
                                    variant: "body2"
                                }}
                            >
                                Utilities
                            </Typography>
                            {utilities.map((utility) => {
                                return <List
                                    sx={{
                                        color: "textColor",
                                        listStyleType: 'disc',
                                        listStylePosition: 'inside',
                                        marginLeft: "-40px",
                                        marginTop: "-15px",
                                        marginBottom: "-25px"
                                    }}
                                >
                                    <ListItem sx={{ color: "textColor", display: 'list-item' }}>
                                        {utility}
                                    </ListItem>
                                </List>
                            })}
                        </Box>

                        <Divider orientation='verticle' width={3} sx={{ borderBottomWidth: 3, backgroundColor: "secondaryColor", marginY: 2 }} />

                        <Box width='600px' style={{ marginTop: "-5px" }} >
                            <Typography
                                sx={{
                                    color: "textColor",
                                    fontWeight: 600,
                                    marginTop: 1,
                                    marginLeft: "-25px",
                                    variant: "body2",
                                }}
                            >
                                Contact Info
                            </Typography>
                            {data.companyInfo ?
                            <>
                            <Typography
                                sx={{
                                    color: "textColor",
                                    fontWeight: 300,
                                    marginLeft: "-25px",
                                    variant: "body2",
                                    //textOverflow: "ellipsis",
                                    //overflow: "hidden",
                                    overflowWrap: "anywhere",
                                    width: "10rem"
                                }}
                            >
                                {data.companyInfo.name} {<br />}
                                {data.companyInfo.phone} {<br />}
                                {data.companyInfo.email} {<br />}
                            </Typography>
                            <Link href= {"https://" + data.companyInfo.site} underline="always" color="secondaryColor" marginLeft="-25px">
                                {'Website'}
                            </Link>
                            </>
                            :
                            <Typography
                                sx={{
                                    color: "textColor",
                                    fontWeight: 300,
                                    marginLeft: "-25px",
                                    variant: "body2",
                                    //textOverflow: "ellipsis",
                                    //overflow: "hidden",
                                    overflowWrap: "anywhere",
                                    width: "10rem"
                                }}
                            >
                                Our Company {<br />}
                            </Typography>
                            }
                        </Box>

                    </Stack>

                </DialogContent>

                <DialogActions>

                    

                    {data.companyInfo ?
                    <Tooltip title="Map View" componentsProps={toolTipSX}>
                        <IconButton onClick={handleOpenMap}>
                            <MapIcon sx={{ color: "secondaryColor" }} />
                        </IconButton>
                    </Tooltip>
                    : ''}

                    {/* {console.log(isVerified)} */}
                    {isVerified === true ?
                        <Tooltip title="Verified Property"
                        componentsProps={toolTipSX}
                        >
                            <IconButton sx={{ color: "secondaryColor" }}>
                                <FontAwesomeIcon icon={faBuildingCircleCheck} style={{ color: theme.palette.type === "light" ? "#AB191F" : "#962c1e" }} />
                            </IconButton>
                        </Tooltip>
                        :
                        ''}

                    {myCoops === true ?
                        <Button
                            sx={{
                                ":hover": {
                                    backgroundColor: "secondaryColor",
                                    border: "none",
                                    boxShadow: theme.palette.type === 'light' ? "0px 0px 3px 3px rgba(0, 0, 0, .1)" : "0px 0px 3px 3px rgba(245, 235, 224, .1)",
                                },
                                border: "none",
                                backgroundColor: "secondaryColor",
                                color: theme.palette.type === "light" ? "primaryColor" : "textColor",
                                width: "100px", height: "35px", fontWeight: 600, lineHeight: "11px", float: "left",
                            }}
                            onClick={handleEdit}
                            variant="outlined">{'EDIT'}
                        </Button>
                        : ''}
                    <Tooltip title="Copy Link" componentsProps={toolTipSX}>
                    <IconButton onClick={() => handleShare()}>
                        <LinkIcon
                            sx={{ color: "secondaryColor" }}
                        />
                    </IconButton>
                    </Tooltip>
                    {editMode === true ? <AddCoopView setOpen={setOpen} editMode={true} data={data}></AddCoopView> : ''}
                    {/* {loading && <CircularProgress />} */}
                    {loading ? (
                        <CircularProgress size={20} sx={{ color: "secondaryColor", marginRight: 2 }} />
                    ) : (
                        login === true ? (
                            verifyProperty === true ? (
                                // Admin view
                                <div sx={{ display: "flex", width: "100%" }}>
                                    <Tooltip title="Delete Property" componentsProps={toolTipSX}>
                                        <IconButton onClick={handleDeletePropertyAdmin}>
                                            <DeleteOutlineIcon sx={{ color: "secondaryColor" }} />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Verify Property" componentsProps={toolTipSX}>
                                        <IconButton onClick={handleVerifyProperty}>
                                            <CheckIcon sx={{ color: "green" }} />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            ) : featureRequest === true ? (
                                <div sx={{ display: "flex", width: "100%" }}>
                                    <Tooltip title="Deny Feature Request" componentsProps={toolTipSX}>
                                        <IconButton onClick={handleDenyFeature}>
                                            <DoDisturbIcon sx={{ color: "secondaryColor" }} />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Accept Feature Request" componentsProps={toolTipSX}>
                                        <IconButton onClick={handleAcceptFeature}>
                                            <CheckIcon sx={{ color: "green" }} />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            ) : featureRequestManage === true ? (
                                <div sx={{ display: "flex", width: "100%" }}>
                                    <Tooltip title="Remove Feature" componentsProps={toolTipSX}>
                                        <IconButton onClick={handleDenyFeature}>
                                            <DoDisturbIcon sx={{ color: "secondaryColor" }} />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            ) : isOwner === false && userType !== "manager" ? (
                                // User view (not owner)
                                <div>
                                    <Tooltip
                                        title="Add to FAV COOPS"
                                        componentsProps={toolTipSX}
                                    >
                                        <IconButton size="large" onClick={handleFavorite}>
                                            {coopFavorited ? (
                                                <FavoriteIcon sx={{ color: "secondaryColor" }} />
                                            ) : (
                                                <FavoriteBorderIcon sx={{ color: "secondaryColor" }} />)}
                                        </IconButton>
                                    </Tooltip>
                                    <Button
                                        onClick={handleOpenRequestTour}
                                        sx={{
                                            ":hover": {
                                                bgcolor: "secondaryColor", color: theme.palette.type === "light" ? "primaryColor" : "textColor", border: "none", fontWeight: "600",
                                                width: "175px", fontSize: "11pt", padding: "0",
                                                boxShadow: theme.palette.type === 'light' ? "0px 0px 3px 3px rgba(0, 0, 0, .1)" : "0px 0px 3px 3px rgba(245, 235, 224, .1)",
                                            },
                                            bgcolor: "secondaryColor", color: theme.palette.type === "light" ? "primaryColor" : "textColor", border: "none",
                                            width: "175px", fontSize: "11pt", padding: "0", fontWeight: "600",
                                            justifyContent: "center", position: "absolute", bottom: 15, left: 25
                                        }}
                                        variant="outlined">REQUEST A TOUR
                                    </Button>
                                    {requestTourOpen && <ScheduleTourView data={data} userData={userData} requestTourOpen={requestTourOpen} handleClose={handleCloseRequestTour} />}
                                </div>
                            ) : isOwner === true && userType === "manager" ? (
                                // Owner view
                                <div>
                                    {!isFeatured ?
                                        <Tooltip title="Request Property Feature" componentsProps={toolTipSX}>
                                            <IconButton onClick={handleFeatureProperty} >
                                                <StarIconOutlined sx={{ color: "secondaryColor" }} />
                                            </IconButton>
                                        </Tooltip>
                                        : ''}
                                    <Tooltip title="Delete Property" componentsProps={toolTipSX}>
                                        <IconButton onClick={handleDeleteProperty}>
                                            <DeleteOutlineIcon sx={{ color: "secondaryColor" }} />
                                        </IconButton>
                                    </Tooltip>
                                    <IconButton size="large" disabled={true}>
                                        <FavoriteIcon />
                                    </IconButton>
                                </div>
                            ) :
                                (
                                    <Tooltip title="Saves"
                                    componentsProps={toolTipSX}
                                    >
                                        <IconButton size="large" disabled={true}>
                                            <FavoriteIcon />
                                        </IconButton>
                                    </Tooltip>
                                )
                        ) : (
                            // Not logged in view
                            <Tooltip title="Saves"
                            componentsProps={toolTipSX}
                            >
                                <IconButton size="large" disabled={true}>
                                    <FavoriteIcon />
                                </IconButton>
                            </Tooltip>
                        ))}

                    <Typography
                        sx={{
                            color: "textColor",
                            display: "flex",
                            alignItems: "center",
                            margin: "0 5px 0 -10px",
                            padding: "0 5px 0 5px",
                        }}
                    >
                        {saves}
                    </Typography>
                </DialogActions>
            </Dialog>

        </React.Fragment>

    )
}
export default PropertyViewMore
