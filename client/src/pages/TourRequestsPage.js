import * as React from 'react';
import {Grid, Typography, Divider, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, IconButton} from "@mui/material"; 
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import {useTheme } from '@mui/material/styles';
import ConfirmCancelTourView from '../components/ConfirmCancelTourView';
import { useEffect } from 'react';


const TourRequestsPage = ({ login }) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false)
    const [tourRowIdx, setTourRowIdx] = React.useState(-1)
    const [action, setAction] = React.useState('')

    const styles = {
        header: {
            fontWeight: "600",
            fontSize: "15pt",
            color: "secondaryColor",
            padding: "0 740px 10px 0",
        },

        subheader: {
            fontWeight: "600",
            fontSize: "13pt",
            color: "textColor",
            backgroundColor:"primaryColor",
            padding: "15px 15px 15px 15px",
            borderBottomColor:"secondaryColor",
            borderBottomWidth:"3px"
        },
        cells: {
            fontWeight:"400",
            fontSize:"11pt",
            color: "textColor",
        },
        buttons: {
            display:"inline",
            fontWeight:"400",
            fontSize:"11pt",
            color: "textColor",
            position:"center",
            marginLeft:"-15px"

        }

    }

    const columns = [
        { id: 'date', label: 'DATE', width: "90px", align:'center'},
        { id: 'time', label: 'TIME', width: "90px", align:'center'},
        {
          id: 'property',
          label: 'PROPERTY',
          width: "140px",
          align: 'center',
        },
        {
          id: 'user',
          label: 'USER',
          width: "140px",
          align: 'center',
        },
        {
          id: 'status',
          label: 'STATUS',
          width: "140px",
          align: 'center',
        },
        {
            id: 'action',
            label: 'ACTIONS',
            width: "100px",
            align: 'center',
          },
      ];
    
    const handleActionClicked = (rowIndex, action) => {
        setOpen(true)
        setTourRowIdx(rowIndex)
        setAction(action)
    }

    const handleActionConfirmed = (rowIndex) => {
        if (action === 'decline') {
            rows[rowIndex].status = 'DECLINED'
        } else {
            rows[rowIndex].status = 'APPROVED'
        }
        handleClose()
    }

    const handleClose = () => {
        setOpen(false)
    }
      
    function pullData(date, time, property, user, status) {
        return { date, time, property, user, status };
    }

    const [tours, setTours] = React.useState([])

    fetch('http://localhost:8000/auth/current-user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Handle the JSON response
            setTours(data.user.company.tours)
        })
        .catch(error => {
            // Handle errors
            console.error('Fetch error:', error);
        });
        console.log(tours)
    /* Pull data from DB, dummy data for now. Note that properties should be specific to company */
    const [rows, setRows] = React.useState(() => []);

    useEffect(() => {
        // Assuming tours is an array of structures

        // Function to parse dateTime and separate date and time
        const parseDateTime = (dateTime) => {
            const [date, time] = dateTime.split(', '); // Split at the comma and space
            return { date, time };
        };

        // Loop through tours and create rows using modified pullData function
        const newRows = tours.map(tour => {
            const { date, time } = parseDateTime(tour.dateTime);
            return pullData(date, time, tour.propertyName, tour.username, tour.status);
        });

        // Update the state with the new rows
        setRows(newRows);
    }, [tours]);

    return (
        <Grid container spacing={0} direction="column" alignItems="center" justify="center">

            <Typography sx={styles.header}>
                TOUR REQUESTS
            </Typography>

            <Paper sx={{
                width: '900px', 
                height:"300px", 
                overflow: 'hidden', 
                backgroundColor:"primaryColor",
                boxShadow: theme.palette.type === 'light' ? "0px 0px 3px 3px rgba(0, 0, 0, .1)" : "0px 0px 3px 3px rgba(245, 235, 224, .1)",
            }}>
                <TableContainer sx={{ maxHeight: "440px", height:"100%"}}>
                    <Table stickyHeader aria-label="sticky table"
                        sx={{
                            "& .MuiTableRow-root:hover": {
                                bgcolor: "secondaryColor",
                                color: theme.palette.type === 'light' ? "primaryColor" : "textColor",
                                cursor: "pointer",
                            }
                        }}>
                        <TableHead >
                            <TableRow >
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    sx={styles.subheader}
                                    style={{
                                        minWidth:column.width
                                    }}
                                >
                                {column.label}
                                </TableCell>
                            ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                            .map((row, rowIndex) => {
                                return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                    const tourRequest = row[column.id];
                                    return (
                                        <TableCell key={column.id} align={column.align} sx={styles.cells}>
                                            {column.id === "action" ? 
                                                
                                                <div>
                                                    {/* TODO for DB ppl: when check/cancel clicked, update status on DB */}
                                                    <Tooltip title="Approve Tour Request"
                                                        componentsProps={{
                                                            tooltip: {
                                                                sx: {
                                                                    bgcolor: theme.palette.type === "light" ? 'rgba(171, 25, 31, 0.9)' : "rgba(245, 235, 224, .8)",
                                                                    color: "primaryColor"
                                                                },
                                                            },
                                                        }}>
                                                        <IconButton onClick={() => {handleActionClicked(rowIndex, 'approve')}}>
                                                            <CheckCircleOutlineOutlinedIcon sx={{ color: "textColor" }}/>
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Decline Tour Request"
                                                        componentsProps={{
                                                            tooltip: {
                                                                sx: {
                                                                    bgcolor: theme.palette.type === "light" ? 'rgba(171, 25, 31, 0.9)' : "rgba(245, 235, 224, .8)",
                                                                    color: "primaryColor"
                                                                },
                                                            },
                                                        }}>
                                                        <IconButton onClick={() => {handleActionClicked(rowIndex, 'decline')}}>
                                                            <CancelOutlinedIcon sx={{ color: "textColor" }}/>
                                                        </IconButton>
                                                        <ConfirmCancelTourView open={open} handleClose={handleClose} rowIndex={tourRowIdx} text={action} handleCancelConfirmed={handleActionConfirmed}/>
                                                    </Tooltip>
                                                </div>
                                            : tourRequest}
                                        </TableCell>
                                    );
                                    })}
                                </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
            </TableContainer>
        </Paper>
    </Grid>
    )
}
export default TourRequestsPage