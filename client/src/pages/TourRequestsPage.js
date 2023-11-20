import * as React from 'react';
import {Grid, Typography, Divider, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton} from "@mui/material"; 
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';


const TourRequestsPage = ({ login }) => {
    const theme = useTheme();
    const [rowClicked, setRowClicked] = React.useState(false)
    const [rowIdxClicked, setRowIdxClicked] = React.useState('')

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
      
    function pullData(date, time, property, user, status) {
        return { date, time, property, user, status };
    }

    const handleRowClicked = (e) => {
        setRowClicked(true)
        setRowIdxClicked(e)
    }
    
    /* Pull data from DB, dummy data for now. Note that properties should be specific to company */
    const rows = [
        pullData('10/21/23', '3:00PM', 'Studio A', 'Chicken A', 'APPROVED'),
        pullData('01/02/24', '11:00AM', 'Penthouse', 'Duck B', 'APPROVED'),
        pullData('10/22/23', '12:00PM', 'Studio B', 'Chicken B', 'PENDING'),
        pullData('10/23/23', '1:00PM', 'Studio C', 'Chicken C', 'DECLINED'),
        pullData('10/23/23', '10:00AM', 'Studio A', 'Cow A', 'PENDING'),
        pullData('10/25/23', '11:00AM', 'Penthouse', 'Cow B', 'APPROVED'),
        pullData('10/21/23', '3:00PM', 'Studio A', 'Pig A', 'APPROVED'),
        pullData('10/22/23', '12:00PM', 'Studio B', 'Pig B', 'PENDING'),
        pullData('10/23/23', '1:00PM', 'Studio C', 'Sheep C', 'DECLINED'),
        pullData('10/23/23', '10:00AM', 'Studio A', 'Duck A', 'PENDING'),
        pullData('10/25/23', '11:00AM', 'Penthouse', 'Duck B', 'APPROVED'),
    ];


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
                        }}
                        enableRowActions="true"
                        renderRowActions={({ row, table }) => (
                            <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                                <IconButton>
                                    <CloseIcon/>
                                </IconButton>
                                <IconButton>
                                    <CloseIcon/>
                                </IconButton>
                            </Box>
                        )}>
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
                            .map((row) => {
                                return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code} onClick={handleRowClicked}>
                                    {columns.map((column) => {
                                    const tourRequest = row[column.id];
                                    return (
                                        <TableCell key={column.id} align={column.align} sx={styles.cells}>
                                            {column.id === "action" ? 
                                                
                                                <div>
                                                    {/* TODO for DB ppl: when check/cancel clicked, update status on UI and DB */}
                                                    <IconButton>
                                                        <CheckCircleOutlineOutlinedIcon sx={{ color: "textColor" }}/>
                                                    </IconButton>
                                                    <IconButton>
                                                        <CancelOutlinedIcon sx={{ color: "textColor" }}/>
                                                    </IconButton>
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