import * as React from 'react';
import { Dialog, DialogTitle, Divider, IconButton, TextField, Container, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';



const ScheduleTourView = ({data}) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false)
    const [email, setEmail] = React.useState("")
    //const [propertyName, setPropertyName] = React.useState("")
    //const [companyName, setCompanyName] = React.useState("")
    const [date, setDate] = React.useState("")
    const [time, setTime] = React.useState("")

    const styles = {
        fields: {
            margin: "0 0 10px 25px", 
            width:"185px", 
            height: "20px",
            borderRadius: "5px",
            border: "2px solid #AB191F",
            padding: "5px",
            "&:hover": {
                border: "2px solid #AB191F",
                boxShadow:"0px 0px 3px 3px rgba(0, 0, 0, .1)", 
            }
        },
        body:{
            width:"40px",
            justifyContent:"center",
            fontSize: "10pt",
            fontWeight:"450",
            color:"textColor",
            marginTop:"32px",
        },
        times: {
            width:"200px",
            textAlign:"center",
            fontSize: "10pt",
            fontWeight:"550",
            color:"textColor",
            marginTop:"32px",
            marginLeft:"-10px",
            backgroundColor: "secondaryColor",
            borderRadius: "5px",
            borderWidth: "2px",
            borderStyle: "solid",
            borderColor: theme.palette.type === "light" ? "secondaryColor" : "textColor",
            "&:hover": {
                border: "2px solid #AB191F",
                boxShadow:"0px 0px 3px 3px rgba(0, 0, 0, .1)", 
            }
        }
    }

    const textfieldSX = {
        input: {
            color: "textColor",
            "&::placeholder": {
                opacity: 0.7,
                color: "textColor",
                },
        },
        "& fieldset": { border: 'none', },
        boxShadow: theme.palette.type === 'light' ? "0px 0px 3px 3px rgba(0, 0, 0, .1)" : "0px 0px 3px 3px rgba(245, 235, 224, .1)",
        marginTop:"15px",
        marginBottom: "5px",
        marginLeft:"15px",
        width:"350px"
    }

    /* Pre-populating */
    var propertyName = data.propertyInfo.propertyName
    var companyName = data.companyInfo.companyName
    // setPropertyName(data.propertyInfo.propertyName)
    // setCompanyName(data.companyInfo.companyName)


    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <React.Fragment>
             <Dialog
                open={setOpen}
                onClose={handleClose}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            //width: "100%",
                            width: "400px",
                            height: "400px",
                            bgcolor: '#F6EBE1'
                        }
                    }
                }}
            > 
                <div sx={{ justifyContent: "left" }}>
                    <IconButton
                        style={{ position: "absolute", top: "0", right: "0" }}
                        onClick={() => handleClose()}
                    >
                        <CloseIcon style={{ color: "black" }} />
                    </IconButton>
                    <DialogTitle sx={{ fontWeight: 600, fontSize: 25, marginBottom: "-20px" }}> Schedule A Tour! </DialogTitle>
                    <Divider variant="middle" sx={{ borderBottomWidth: 3, color: "#AB191F", backgroundColor: "#AB191F", marginY: 1 }} />
                </div>

                <div>
                    <TextField
                        placeholder="Prepopulate to username" id="username-textfield" variant="outlined" fullWidth
                        sx={textfieldSX}
                    />

                    <TextField
                        placeholder="Prepopulate to property name" id="property-name-textfield" variant="outlined" fullWidth
                        sx={textfieldSX}
                    />

                    <TextField
                        placeholder="Prepopulate to company name" id="company-name-textfield" variant="outlined" fullWidth
                        sx={textfieldSX}
                    /> 

                    <Container style={{display: "flex", gap: "1rem", width: "200px", margin:"0 0 0 15px", padding:"0"}}>
                        <Typography
                            //variant='button'
                            style={styles.body}>
                            From
                        </Typography>
                        {/* From time */}
                        <Typography
                            //variant='button'
                            style={styles.times}>
                            
                        </Typography>
                        <Typography
                            //variant='button'
                            style={styles.body}>
                            To
                        </Typography>
                        {/* To time */}
                        <Typography
                            style={styles.times}>
                            
                        </Typography>

                    </Container>
                </div>


            </Dialog>


        </React.Fragment>  
    )

}
export default ScheduleTourView