import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Box, Dialog, DialogContent, Typography, IconButton, Link } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'
import PropertyViewMore from "../components/PropertyView"



const PropertyManagerPublicPage = () => {
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
            .then(data => setCompanyInfo(data))
        }
        sendCompanyName();
        getCompanyInfo();
    }, [])
    const styles = {
        header: {  
            fontWeight: "600",
            fontSize: "18pt",
            color: "#AB191F",
        },
        feed: {
            display: "flex",
            justifyContent: "center",
            maxWidth: "1200px",
            flexWrap: "wrap",
        },
        companyInfo: {
            color: "black",
            fontWeight: "500",
            fontSize: "12pt",
            marginBottom: "5px"
        },
        companyInfoLabel: {
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
            <Typography style={styles.header} sx={{
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
                    <FontAwesomeIcon icon={faAddressCard}
                        style={{ 
                            color: hovered === true ? "#AB191F" : "#f5ebe0", 
                            fontSize:"23pt", 
                            justifyContent:"center"
                        }}
                    />   
                </IconButton>
            </Box>
            <Box sx={{ m: 1 }} style={styles.feed}>
                {
                   <Box sx={{ m: 1 }} style={styles.feed}>
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
                        backgroundColor: "#F6EBE1"
                    },
                },
                }}>
                <DialogContent>
                    <Container 
                        style={{
                            backgroundColor:"#F6EBE1",
                            overflow:"hidden"
                        }}>
                    <Typography marginBottom="10px" style={styles.header}>Company Information</Typography>
                    <Box style={{width: "20%", float: "left"}}> 
                        <Typography style={styles.companyInfoLabel}>Name:</Typography>
                        <Typography style={styles.companyInfoLabel}>Address:</Typography>
                        <Typography style={styles.companyInfoLabel}>Website:</Typography>
                        <Typography style={styles.companyInfoLabel}>Email:</Typography>
                        <Typography style={styles.companyInfoLabel}>Phone:</Typography>
                    </Box>
                    <Box style={{width: "80%", float: "right"}}>
                        <Typography style={styles.companyInfo}>{companyInfo.name}</Typography>
                        <Typography style={styles.companyInfo}>{companyInfo.address}</Typography>
                        <Link href={`https://${companyInfo.site}`}
                        style={styles.companyInfo} sx={{"&:hover": {color: "#AB191F"}
                        }}>Go to {companyInfo.name} website</Link>
                        <Typography style={{marginBottom: "8px"}}></Typography>
                        <Link href="#" onClick={(e) => {window.location=`mailto:${companyInfo.email}`}} 
                        style={styles.companyInfo} sx={{"&:hover": {color: "#AB191F"}
                        }}>{companyInfo.email}</Link>
                        <Typography style={{marginBottom: "8px"}}></Typography>
                        <Link href="#" onClick={(e) => {window.location=`tel:${companyInfo.phone}`}} 
                        style={styles.companyInfo} sx={{"&:hover": {color: "#AB191F"}
                        }}>{companyInfo.phone}</Link>

                    </Box>
                    </Container>
                </DialogContent>
            </Dialog>
        </Container>
    )
}
export default PropertyManagerPublicPage;