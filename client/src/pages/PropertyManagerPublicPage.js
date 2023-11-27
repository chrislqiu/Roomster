import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Box, Dialog, DialogContent, Typography, IconButton, Link } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'
import PropertyViewMore from "../components/PropertyView"
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import Contacts from '@mui/icons-material/Contacts';



const PropertyManagerPublicPage = () => {
    const theme = useTheme();
    const [searchparams] = useSearchParams();
    const [companyInfo, setCompanyInfo] = React.useState([]);
    const [property, setProperty] = React.useState([])
    const [filteredProperty, setFilteredProperty] = React.useState([]);
    const [input, setInput] = React.useState('')
    
    React.useEffect(() => {
        const sendCompanyName = async () => {
            await fetch('http://localhost:8000/cards/sendCompanyName', {
                method: "POST",
                headers: {'Content-type': "application/json"},
                body: JSON.stringify({
                    companyName: searchparams.get("companyName")
                })
            }).then(res => res.json())
            .then(data => setProperty(data))
        }
        const getCompanyInfo = async () => {
            await fetch('http://localhost:8000/cards/getCompanyInfo', {
                method: "POST",
                headers: {'Content-type': "application/json"},
                body: JSON.stringify({
                    companyName: searchparams.get("companyName")
                })
            }).then(res => res.json())
            .then(data => setCompanyInfo(data.companyInfo))
        }
        sendCompanyName();
        getCompanyInfo();
    }, [])
    const styles = {
        header: {  
            fontWeight: "600",
            fontSize: "18pt",
            color: "secondaryColor",
        },
        feed: {
            display: "flex",
            justifyContent: "center",
            maxWidth: "1200px",
            flexWrap: "wrap",
        },
        companyInfo: {
            color: "textColor",
            fontWeight: "500",
            fontSize: "12pt",
            marginBottom: "5px",
            "&:hover": {color: "secondaryColor"}
        },
        companyInfoNoHover: {
            color: "textColor",
            fontWeight: "500",
            fontSize: "12pt",
            marginBottom: "5px",
        },
        companyInfoLabel: {
            color: "textColor",
            fontWeight: "600",
            fontSize: "12pt",
            marginBottom: "5px"
        }
    }
    const [hovered, setHovered] = React.useState(false);
    const [open, setOpen] = React.useState(false)

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
    
    return (
        <Container sx={{ width: '100%' }}>
            <Typography sx={styles.header} style={{
            margin: "-20px 0px 20px 15px",
            padding: "0 25px",
            }}> 
                {"Properties from " + searchparams.get("companyName")}
            </Typography >
            <Box style ={{position:"fixed", bottom:"0", right:"0"}}>
                <IconButton 
                    onMouseEnter={handleHovered}
                    onMouseLeave={handleLeave}
                    onClick={handleOpen}
                    sx={{ 
                        m: 3,
                        borderRadius:'50%', 
                        width:"75px", 
                        height:"75px", 
                        backgroundColor: hovered === true ? "primaryColor" : "secondaryColor", 
                        display:"flex", 
                        justifyContent: "center", 
                        boxShadow: theme.palette.type === 'light' ? "0px 0px 3px 3px rgba(0, 0, 0, .1)" : "0px 0px 3px 3px rgba(245, 235, 224, .1)", 
                    }}>        
                    <Contacts 
                        sx={{ 
                            color: hovered === true ? "secondaryColor" : "primaryColor", 
                            fontSize:"23pt", 
                            justifyContent:"center"
                        }}
                    />   
                </IconButton>
            </Box>
            <Box style={{ margin: "10px" }} sx={styles.feed}>
                {
                   <Box style={{ margin: "10px" }} sx={styles.feed}>
                        {
                            property.map((cards) => {
                                return <PropertyViewMore data={cards}/>
                                }
                            )
                        }
                    </Box>
                }
            </Box>
            <Dialog open={open} onClose={handleClose}
                sx={{
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        width: "70%",
                        maxWidth: 500,
                        maxHeight: 500,
                        backgroundColor: "primaryColor",
                        boxShadow: theme.palette.type === 'light' ? "0px 0px 3px 3px rgba(0, 0, 0, .1)" : "0px 0px 3px 3px rgba(245, 235, 224, .1)", 
                    },
                },
                }}>
                <DialogContent>
                    <Container 
                        style={{
                            backgroundColor:"primaryColor",
                            overflow:"hidden"
                        }}>
                    <Typography marginBottom="10px" sx={styles.header}>Company Information</Typography>
                    <Box style={{width: "20%", float: "left"}}> 
                        <Typography sx={styles.companyInfoLabel}>Name:</Typography>
                        <Typography sx={styles.companyInfoLabel}>Address:</Typography>
                        <Typography sx={styles.companyInfoLabel}>Website:</Typography>
                        <Typography sx={styles.companyInfoLabel}>Email:</Typography>
                        <Typography sx={styles.companyInfoLabel}>Phone:</Typography>
                    </Box>
                    <Box style={{width: "80%", float: "right"}}>
                        <Typography sx={styles.companyInfoNoHover}>{companyInfo.name}</Typography>
                        <Typography sx={styles.companyInfoNoHover}>{companyInfo.address}</Typography>
                        <Link href={`https://${companyInfo.site}`}
                        sx={styles.companyInfo}>Go to {companyInfo.name} website</Link>
                        <Typography style={{marginBottom: "8px"}}></Typography>
                        <Link href="#" onClick={(e) => {window.location=`mailto:${companyInfo.email}`}} 
                        sx={styles.companyInfo}>{companyInfo.email}</Link>
                        <Typography style={{marginBottom: "8px"}}></Typography>
                        <Link href="#" onClick={(e) => {window.location=`tel:${companyInfo.phone}`}} 
                        sx={styles.companyInfo}>{companyInfo.phone}</Link>

                    </Box>
                    </Container>
                </DialogContent>
            </Dialog>
        </Container>
    )
}
export default PropertyManagerPublicPage;