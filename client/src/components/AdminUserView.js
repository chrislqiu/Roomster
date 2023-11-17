import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { List, ListItem, Box, CardMedia, IconButton, Tooltip, } from '@mui/material';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckIcon from "@mui/icons-material/Check";
import LockResetIcon from '@mui/icons-material/LockReset';


const AdminUserView = ({ username, userType }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }


  const handleDeleteUser = async () => {
    try {
        const response = await fetch('http://localhost:8000/auth/admin/deleteUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ username: username }),
        });

        console.log(response)

        if (response.ok) {
            // console.log("good")
            localStorage.setItem('userDeleted', 'true');
            window.location.reload(true);

        } else {
            console.log("nope")
        }
    } catch (error) {
        console.log(error)
    }
};


  return (
    <React.Fragment>
      <Card
        variant='contained'
        alignContent='center'
        onClick={() => {
          handleOpen();
        }}
        sx={{
          ":hover": {
            bgcolor: "#AB191F",
            color: "#f5ebe0",
            cursor: "pointer",
          },
          backgroundColor: "#f5ebe0",
          color: "#AB191F",
          width: "300px",
          height: "100px",
          marginBottom: "20px",
          marginRight: "20px",
          marginLeft: "20px",
          borderRadius: "10px",
          boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, .1)"
        }}
      >
        <CardContent>
          <Typography variant="h6" component="div" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {userType}
          </Typography>
        </CardContent>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "70%",
              maxWidth: 500,
              maxHeight: 300,
              backgroundColor: "#F6EBE1"
            },
          },
        }}
      >
        <DialogContent>
          <Typography variant="h6" component="div" sx={{ color: "#AB191F", overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {userType}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
          <Tooltip title="Delete User Account">
            <IconButton onClick={handleDeleteUser}>
              <DeleteOutlineIcon sx={{ color: "#AB191F" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Reset User Password">
            <IconButton onClick={null}>
              <LockResetIcon sx={{ color: "#AB191F" }} />
            </IconButton>
          </Tooltip>
          </Box>
        </DialogContent>
      </Dialog>

    </React.Fragment>

  );
}

export default AdminUserView;
