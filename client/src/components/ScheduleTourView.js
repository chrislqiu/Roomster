import * as React from 'react';
import { Dialog, DialogTitle, Divider, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ScheduleTourView = ({data}) => {
    const [open, setOpen] = React.useState(false)
    const [email, setEmail] = React.useState("")
    //const [propertyName, setPropertyName] = React.useState("")
    //const [companyName, setCompanyName] = React.useState("")
    const [date, setDate] = React.useState("")
    const [time, setTime] = React.useState("")

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
        }
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
                    

                </div>


            </Dialog>


        </React.Fragment>  
    )

}
export default ScheduleTourView