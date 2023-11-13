import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const AdminUserView = ({ username, userType }) => {
  return (
    <Card
      variant='contained'
      alignContent='center'
      sx={{
        ":hover": {
          bgcolor: "#AB191F",
          color: "#f5ebe0",
          cursor: "pointer",
        },
        backgroundColor: "#f5ebe0",
        color: "#AB191F",
        width: "250px",
        height: "100px",
        marginBottom: "20px",
        marginRight: "20px",
        marginLeft: "20px",
        borderRadius: "10px",
        boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, .1)"
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {userType}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default AdminUserView;
