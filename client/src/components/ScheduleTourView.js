import * as React from 'react';
import { Dialog, DialogTitle, Divider, IconButton, TextField, Container, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTheme } from '@mui/material/styles';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import toast, { Toaster } from 'react-hot-toast'


const ScheduleTourView = ({ data, userData, requestTourOpen, handleClose }) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false)
    const [email, setEmail] = React.useState("")
    //const [propertyName, setPropertyName] = React.useState("")
    //const [companyName, setCompanyName] = React.useState("")
    const [date, setDate] = React.useState("")
    const [time, setTime] = React.useState("")
    const [DT, setDT] = React.useState("")

    const styles = {
        fields: {
            margin: "0 0 10px 25px",
            width: "185px",
            height: "20px",
            borderRadius: "5px",
            border: "2px solid #AB191F",
            padding: "5px",
            "&:hover": {
                border: "2px solid #AB191F",
                boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, .1)",
            }
        },
        body: {
            width: "40px",
            justifyContent: "center",
            fontSize: "10pt",
            fontWeight: "450",
            color: "textColor",
            marginTop: "32px",
        },
        times: {
            width: "200px",
            textAlign: "center",
            fontSize: "10pt",
            fontWeight: "550",
            color: "textColor",
            marginTop: "32px",
            marginLeft: "-10px",
            backgroundColor: "secondaryColor",
            borderRadius: "5px",
            borderWidth: "2px",
            borderStyle: "solid",
            borderColor: theme.palette.type === "light" ? "secondaryColor" : "textColor",
            "&:hover": {
                border: "2px solid #AB191F",
                boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, .1)",
            }
        }
    }

    const customToastStyle = {
        color: 'white'
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
        marginTop: "15px",
        marginBottom: "5px",
        marginLeft: "15px",
        width: "368px"
    }

    const handleScheduleTour = async () => {
        if (DT === "") {
            toast.error("Please fill in a time!", { style: customToastStyle })
            return;
        } else {
            toast.success("Request Sent", { style: customToastStyle })
        }
        const utc = new Date(DT)
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        };
        const formattedDT = utc.toLocaleString('en-US', options);
        const dataToSend = {
            tour: {
                username: userData.username,
                propertyName: data.propertyInfo.propertyName,
                companyName: data.companyInfo.name,
                dateTime: formattedDT
            }
        }

        await fetch('http://localhost:8000/reqTour', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend)
        })
            .then(response => response.json())
            .then(data => {
                console.log('REQ SENT', data.message);
            })
            .catch(error => {
                console.error('REQ NOT SENT', error);
            });
    }


    return (
        <React.Fragment>
            <Dialog
                open={requestTourOpen}
                onClose={handleClose}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            //width: "100%",
                            width: "400px",
                            height: "440px",
                            bgcolor: 'primaryColor'
                        }
                    }
                }}
            >
                <div sx={{ justifyContent: "left" }}>
                    <IconButton
                        style={{ position: "absolute", top: "0", right: "0" }}
                        onClick={() => handleClose()}
                    >
                        <CloseIcon sx={{ color: "textColor" }} />
                    </IconButton>
                    <DialogTitle sx={{ fontWeight: 600, fontSize: 25, marginBottom: "-20px", color: "textColor" }}> Schedule A Tour! </DialogTitle>
                    <Divider variant="middle" sx={{ borderBottomWidth: 3, color: "secondaryColor", backgroundColor: "secondaryColor", marginY: 1 }} />
                </div>

                <div>
                    <TextField
                        placeholder={userData.username} id="username-textfield" variant="outlined" fullWidth
                        inputProps={{ readOnly: true, }}
                        sx={textfieldSX}
                    >
                        {console.log("PROPERTY NAME:    " + data.propertyInfo.propertyName)}
                    </TextField>

                    <TextField
                        placeholder={data.propertyInfo.propertyName} id="property-name-textfield" variant="outlined" fullWidth
                        inputProps={{ readOnly: true, }}
                        sx={textfieldSX}
                    />

                    <TextField
                        placeholder={data.companyInfo.name} id="company-name-textfield" variant="outlined" fullWidth
                        inputProps={{ readOnly: true, }}
                        sx={textfieldSX}
                    />

                    <Container style={{ display: "flex", gap: "1rem", margin: "0 0 0 0", padding: "0" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DemoContainer
                                components={['DateTimePicker']}
                                sx={{ 
                                    input: {
                                        color: "textColor",
                                        "&::placeholder": {
                                            opacity: 0.7,
                                            color: "textColor",
                                        },
                                    },
                                    "& fieldset": { border: 'none', color: "textColor" },
                                    "& label": { color: "textColor" },
                                    "& label.Mui-focused": { color: "textColor" },
                                    "&.Mui-focused fieldset": { color: "textColor" },

                                    boxShadow: theme.palette.type === 'light' ? "0px 0px 3px 3px rgba(0, 0, 0, .1)" : "0px 0px 3px 3px rgba(245, 235, 224, .1)",
                                    marginTop: "15px",
                                    marginBottom: "5px",
                                    marginLeft: "15px",
                                    width: "368px",
                                    height: "50px"
                                }}>
                                <DateTimePicker label="Select a tour date and time" slotProps={{openPickerButton: {sx:{color: 'textColor',} },}} value={DT} onChange={(newVal) => setDT(newVal)} />
                            </DemoContainer>
                        </LocalizationProvider>
                        <Button sx={{
                            ":hover": {
                                backgroundColor: "secondaryColor",
                                border: "none",
                                boxShadow: theme.palette.type === 'light' ? "0px 0px 3px 3px rgba(0, 0, 0, .1)" : "0px 0px 3px 3px rgba(245, 235, 224, .1)",
                            },
                            border: "none",
                            backgroundColor: "secondaryColor",
                            color: theme.palette.type === "light" ? "primaryColor" : "textColor",
                            width: "45%", fontWeight: 600, justifyContent: "center", position: "absolute", bottom: 7, marginBottom: "5px", right: 15, maxWidth: "95px", maxHeight: "50px"
                        }}
                            variant="outlined"
                            onClick={() => {
                                handleScheduleTour()
                            }}>
                            SUBMIT
                        </Button>
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
                    </Container>
                </div>
            </Dialog>


        </React.Fragment>
    )

}
export default ScheduleTourView