import * as React from 'react';
import Button from '@mui/material/Button';
import { List, ListItem, Box, Card, CardContent, CardMedia, IconButton, Tooltip, } from '@mui/material';
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
import { useNavigate, createSearchParams } from 'react-router-dom';
import AddCoopView from './AddCoopView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuildingCircleCheck, faStar } from '@fortawesome/free-solid-svg-icons'
import { toast, ToastContainer } from 'react-toastify';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import 'react-toastify/dist/ReactToastify.css';


/* 
 * Property Card (Rachel La)
 * More Property Detail Dialogue for the Property card (Tea Lazareto)
 * Parameters:
 * (temporary until property cards) text: button text 
 * data : The property data from the database
 * featured : Boolean to determine whether the card is featured or not
 * favCoops : Boolean to determine if card is on favCoops page
 */
const PropertyViewMore = ({ data, featured, favCoops, myCoops, login, verifyProperty, featureRequest }) => {
    var image, propertyName, address, beds, baths, cost, amenities
    if (myCoops) {
        image = data.image;
        propertyName = data.propertyName;
        address = data.address;
        beds = data.beds;
        baths = data.baths;
        cost = data.cost;
        amenities = data.amenities;
    } else {
        image = data.propertyInfo.image;
        propertyName = data.propertyInfo.propertyName;
        address = data.propertyInfo.address;
        beds = data.propertyInfo.beds;
        baths = data.propertyInfo.baths;
        cost = data.propertyInfo.cost;
        amenities = data.propertyInfo.amenities;
    }
    /*
     * open, setOpen : controls the state of the dialogue popup
     */
    const [open, setOpen] = React.useState(false)
    const [utilities, setUtilities] = React.useState('')
    const [saves, setSaves] = React.useState(myCoops === true ? data.saves : data.propertyInfo.saves)
    const [updateOrRemove, setUpdateOrRemove] = React.useState('')
    const [userData, setUserData] = React.useState('')
    const [userType, setUserType] = React.useState('')
    const [favCoopsArr, setFavCoopsArr] = React.useState([])
    const [myCoopsArr, setMyCoopsArr] = React.useState([])
    const [isVerified, setIsVerified] = React.useState(false)
    const [isFeatured, setIsFeatured] = React.useState(false)
    const coopFavorited = favCoopsArr.some(coops => coops._id.toString() === data._id.toString())

    React.useEffect(() => {

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
                        console.log("manager")
                        const obj = JSON.parse(JSON.stringify(getData));
                        setUserData(obj)
                        setMyCoopsArr(obj.user.company.myCoops)
                    }
                }

            } catch (e) {
                console.log("Error: " + e)
            }
        }

        getUserInfo()
        console.log(favCoopsArr);
    }, [userData, favCoopsArr, myCoopsArr])

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

        setSaves(data.propertyInfo.saves);
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

    const pullUtilities = () => {
        setUtilities(Object.keys(utilities).filter(key => utilities[key] === true))
    }

    const handleDeleteProperty = async () => {
        const id = data._id;
        console.log("data: " + id);
        try {
            const response = await fetch('http://localhost:8000/auth/delete-property', {
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
        console.log("data: " + id);
        try {
            const response = await fetch('http://localhost:8000/auth/property-verification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // credentials: 'include',
                body: JSON.stringify({ id: id }),
            });

            console.log(response)

            if (response.ok) {
                setIsVerified(true)
                console.log("Property verified")
            } else {
                console.log("Property not verified")
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
                setIsOwner(data.match)
            } else {
                console.log('Authentication check failed');
            }
        } catch (error) {
            console.error('Error during authentication check:', error);
        }
    };


    React.useEffect(() => {
        checkOwner();
        getPropertyVerification();
        getPropertyFeatured();
    }, []);

    React.useEffect(() => {
        const propertyDeleted = localStorage.getItem('propertyDeleted');
        if (propertyDeleted === 'true') {
            toast.success('Property deleted successfully!', { position: toast.POSITION.TOP_CENTER });
            localStorage.removeItem('propertyDeleted');
        }
    }, []);



    return (
        <React.Fragment>
            <ToastContainer />
            <Card
                variant='contained'
                onClick={() => {
                    handleOpen();
                    // checkOwner();
                }}
                onMouseEnter={handleHovered}
                onMouseLeave={handleLeave}
                sx={{
                    ":hover": {
                        bgcolor: "#AB191F",
                        color: "#f5ebe0",
                        cursor: "pointer",
                    },
                    backgroundColor: "#f5ebe0",
                    color: "#AB191F",
                    width: featured === true ? "230px" : "250px",
                    height: featured === true ? "280px" : "300px",
                    marginBottom: "20px",
                    marginRight: "20px",
                    border: featured === true ? "3px solid #AB191F" : "none",
                    borderRadius: "10px",
                    boxShadow: featured === true ? "none" : "0px 0px 3px 3px rgba(0, 0, 0, .1)"
                }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        image={imgExample}
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

                            <Typography variant="h6" style={{ margin: "-20px 0 0px 0" }}
                            > {propertyName.split(":")[0]} </Typography>
                            {/* {featured === true ? <StarIcon style={{margin: "-20px 0 0px 2.5"}} /> : ''} */}
                            {/* {favCoops === true ? <FavoriteIcon style={{margin: "-20px 0 0px 2.5"}} sx={{color: "#AB191F", ":hover": {color: "#F6EBE1",},}}/> : ''} */}
                            {/* <Typography variant="h6" style={{fontSize: "13pt", margin: "-20px 0 0px 0"}}> Property Name </Typography> */}
                            {featured === true ? <StarIcon style={{ margin: "-22px 0 0 5px", fontSize: "15pt" }} /> : ''}
                            {favCoops === true ? <FavoriteIcon style={{ margin: "-22px 0 0 5px", fontSize: "15pt" }} /> : ''}
                            {myCoops === true ? <BookmarkIcon style={{ margin: "-22px 0 0 5px", fontSize: "15pt" }} /> : ''}

                        </div>
                        <Typography variant="body2" style={{ margin: "0 0 5px 0" }}>{address}</Typography>
                        <Typography variant="body2">{beds} bedroom </Typography>
                        <Typography variant="body2" style={{ marginBottom: "5px" }}>{baths} bathroom</Typography>
                        <Divider style={styles.divider}></Divider>
                        <Typography variant="body1" style={{ marginTop: "5px", textAlign: "right", fontWeight: "500" }}> ${cost} per month</Typography>

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
                    <Stack direction={{ '400px': "column", md: "row", lg: "row", xl: "row" }} spacing={5} sx={{ marginTop: 2, p: 1 }} >
                        {/* Basic Property Info */}
                        <Box width='600px' style={{ marginTop: "5px", marginRight: "-25px" }}>
                            <Tooltip title="Go to Company Page"
                                componentsProps={{
                                    tooltip: {
                                        sx: {
                                            bgcolor: 'rgba(171, 25, 31, 0.9)',
                                            color: "#F6EBE1"
                                        },
                                    },
                                }}
                            >
                                <Link onClick={openCompanyPage} underline="hover" color="black" sx={{ fontWeight: 600, "&:hover": { cursor: "pointer", color: "#AB191F" } }}>
                                    {propertyName}
                                </Link>
                            </Tooltip>
                            <Typography
                                sx={{
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
                                    fontWeight: 300,
                                    variant: "body2",
                                }}
                            >
                                {beds} {beds > 1 ? 'beds' : 'bed'}, {baths} {baths > 1 ? 'baths' : 'bath'}
                            </Typography>
                            <Divider orientation='horizontal' width={150} sx={{ borderBottomWidth: 3, color: "#AB191F", backgroundColor: "#AB191F", marginY: 1 }} />
                            <Typography
                                sx={{
                                    fontWeight: 500,
                                    variant: "body2",
                                }}
                            >
                                ${cost} per month
                            </Typography>
                        </Box>
                        <Divider orientation={{ xs: 'horizontal', md: 'vertical', lg: 'vertical', xl: 'vertical' }} width={3} sx={{ borderBottomWidth: 3, color: "#AB191F", backgroundColor: "#AB191F", marginY: 2 }} />

                        {/* Amenitites */}
                        <Box width='600px' style={{ marginTop: "-5px", marginRight: "-25px" }} >
                            <Typography
                                sx={{
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
                                        listStyleType: 'disc',
                                        listStylePosition: 'inside',
                                        marginLeft: "-40px",
                                        marginTop: "-15px",
                                        marginBottom: "-25px"
                                    }}
                                >
                                    <ListItem sx={{ display: 'list-item' }}>
                                        {amenity}
                                    </ListItem>
                                </List>
                            })}

                        </Box>
                        <Divider orientation='verticle' width={3} sx={{ borderBottomWidth: 3, color: "#AB191F", backgroundColor: "#AB191F", marginY: 2 }} />

                        {/* Utilities */}
                        <Box width='600px' style={{ marginTop: "-5px", marginRight: "-25px" }} >
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    marginTop: 1,
                                    marginRight: "5px",
                                    marginLeft: "-25px",
                                    variant: "body2"
                                }}
                            >
                                Utilities
                            </Typography>
                            {pullUtilities}
                            <List
                                sx={{
                                    listStyleType: 'disc',
                                    listStylePosition: 'inside',
                                    marginLeft: "-40px",
                                    marginTop: "-15px",
                                    marginBottom: "-25px"
                                }}
                            >
                                <ListItem sx={{ display: 'list-item' }}>
                                    {utilities}
                                </ListItem>
                            </List>
                        </Box>

                        <Divider orientation='verticle' width={3} sx={{ borderBottomWidth: 3, color: "#AB191F", backgroundColor: "#AB191F", marginY: 2 }} />

                        <Box width='600px' style={{ marginTop: "-5px" }} >
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    marginTop: 1,
                                    marginLeft: "-25px",
                                    variant: "body2",
                                }}
                            >
                                Contact Info
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: 300,
                                    marginLeft: "-25px",
                                    variant: "body2",
                                }}
                            >
                                Company Name {<br />}
                            </Typography>
                            <Link href="https://riseonchauncey.com/" underline="always" color="#AB191F" marginLeft="-25px">
                                {'Website'}
                            </Link>
                        </Box>
                    </Stack>
                </DialogContent>
                <DialogActions>

                    {console.log(isVerified)}
                    {isVerified === true ?
                        <Tooltip title="Verified Property"
                            componentsProps={{
                                tooltip: {
                                    sx: {
                                        bgcolor: 'rgba(171, 25, 31, 0.9)',
                                        color: "#F6EBE1"
                                    },
                                },
                            }}
                        >
                            <IconButton sx={{ color: "#AB191F" }}>
                                <FontAwesomeIcon icon={faBuildingCircleCheck} />
                            </IconButton>
                        </Tooltip>
                        :
                        ''}

                    {myCoops === true ?
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
                            onClick={handleEdit}
                            variant="outlined">{'EDIT'}
                        </Button>
                        : ''}

                    {editMode === true ? <AddCoopView setOpen={setOpen} editMode={true} data={data}></AddCoopView> : ''}
                    {login === true ? (
                        verifyProperty === true ? (
                            // Admin view
                            <div sx={{ display: "flex", width: "100%" }}>
                                <Tooltip title="Delete Property">
                                    <IconButton onClick={handleDeletePropertyAdmin}>
                                        <DeleteOutlineIcon sx={{ color: "#AB191F" }} />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Verify Property">
                                    <IconButton onClick={handleVerifyProperty}>
                                        <CheckIcon sx={{ color: "green" }} />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        ) : featureRequest === true ? (
                            <div sx={{ display: "flex", width: "100%" }}>
                                <Tooltip title="Deny Feature Request">
                                    <IconButton onClick={handleDenyFeature}>
                                        <DoDisturbIcon sx={{ color: "#AB191F" }} />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Accept Feature Request">
                                    <IconButton onClick={handleAcceptFeature}>
                                        <CheckIcon sx={{ color: "green" }} />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        ): isOwner === false && userType !== "manager" ? (
                            // User view (not owner)
                            <Tooltip
                                title="Add to FAV COOPS"
                                componentsProps={{
                                    tooltip: {
                                        sx: {
                                            bgcolor: 'rgba(171, 25, 31, 0.9)',
                                            color: '#F6EBE1'
                                        },
                                    },
                                }}
                            >
                                <IconButton size="large" onClick={handleFavorite}>
                                    {coopFavorited ? (
                                        <FavoriteIcon sx={{ color: "#AB191F" }} />
                                    ) : (
                                        <FavoriteBorderIcon sx={{ color: "#AB191F" }} />
                                    )}
                                </IconButton>
                            </Tooltip>
                        ) : isOwner === true && userType === "manager" ? (
                            // Owner view
                            <div>
                                {!isFeatured ?
                                    <Tooltip title="Request Property Feature">
                                        <IconButton onClick={handleFeatureProperty} >
                                        <StarIconOutlined sx={{ color: "#AB191F" }}/>
                                        </IconButton>
                                    </Tooltip>
                                    : ''}
                                <Tooltip title="Delete Property">
                                    <IconButton onClick={handleDeleteProperty}>
                                        <DeleteOutlineIcon sx={{ color: "#AB191F" }} />
                                    </IconButton>
                                </Tooltip>
                                <IconButton size="large" disabled={true}>
                                    <FavoriteIcon />
                                </IconButton>
                            </div>
                        ) :
                            (
                                <Tooltip title="Saves"
                                    componentsProps={{
                                        tooltip: {
                                            sx: {
                                                bgcolor: 'rgba(171, 25, 31, 0.9)',
                                                color: "#F6EBE1"
                                            },
                                        },
                                    }}
                                >
                                    <IconButton size="large" disabled={true}>
                                        <FavoriteIcon />
                                    </IconButton>
                                </Tooltip>
                            )
                    ) : (
                        // Not logged in view
                        <Tooltip title="Saves"
                            componentsProps={{
                                tooltip: {
                                    sx: {
                                        bgcolor: 'rgba(171, 25, 31, 0.9)',
                                        color: "#F6EBE1"
                                    },
                                },
                            }}
                        >
                            <IconButton size="large" disabled={true}>
                                <FavoriteIcon />
                            </IconButton>
                        </Tooltip>
                    )}

                    <Typography
                        style={{
                            display: "flex",
                            alignItems: "center",
                            margin: "0 5px 0 -10px",
                            padding: "0 5px 0 5px",
                            fontWeight: 600
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
