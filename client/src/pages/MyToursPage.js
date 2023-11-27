import * as React from 'react';
import {Dialog, DialogTitle, Button, Grid, Typography, Divider, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, IconButton} from "@mui/material"; 
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import ConfirmCancelTourView from '../components/ConfirmCancelTourView';

const MyToursPage = ({ login }) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false)
    const [tourCancelledClicked, setTourCancelledClicked] = React.useState(false)
    const [tourCancelledConfirmed, setTourCancelledConfirmed] = React.useState(false)
    const [tourRowIdx, setTourRowIdx] = React.useState(-1)

    const styles = {
        header: {
            fontWeight: "600",
            fontSize: "15pt",
            color: "secondaryColor",
            padding: "0 790px 10px 0",
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
          id: 'company',
          label: 'COMPANY',
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

    const handleCancelClicked = (rowIndex) => {
        //setTourCancelledClicked(!tourCancelledClicked)
        setOpen(true)
        setTourRowIdx(rowIndex)
    }

    const handleCancelConfirmed = (rowIndex) => {
        console.log("cancel confirmed")
        //setTourCancelledConfirmed(true)
        setRows(() => {return [...rows.slice(0, rowIndex),...rows.slice(rowIndex + 1)]})
        setOpen(false)

    }

    const handleClose = () => {
        setOpen(false)
    }

      
    function pullData(date, time, property, company, status) {
        return { date, time, property, company, status };
    }
    
    /* TODO: Pull data from DB, dummy data for now. */
    
    const [rows, setRows] = React.useState(() => [
        pullData('10/21/23', '3:00PM', 'Studio A', 'Campus Edge', 'APPROVED'),
        pullData('01/02/24', '11:00AM', 'Penthouse A', 'RISE', 'APPROVED'),
        pullData('10/22/23', '12:00PM', 'Studio B', 'Campus Edge', 'PENDING'),
        pullData('10/23/23', '1:00PM', 'Studio C', 'Campus Edge', 'DECLINED'),
        pullData('10/23/23', '10:00AM', '1 bed 1 bath', 'RISE', 'PENDING'),
        pullData('10/25/23', '11:00AM', 'RISE on Chauncey', 'RISE', 'APPROVED'),
        pullData('10/21/23', '3:00PM', 'Studio D', 'Campus Edge', 'APPROVED'),
        pullData('10/22/23', '12:00PM', 'Studio E', 'Campus Edge', 'PENDING'),
        pullData('10/23/23', '1:00PM', 'Studio F', 'Campus Edge', 'DECLINED'),
        pullData('10/23/23', '10:00AM', '2 bed 2 bath ', 'RISE', 'PENDING'),
        pullData('10/25/23', '11:00AM', 'Penthouse C', 'RISE', 'APPROVED'),
    ]);


    return (
        <Grid container spacing={0} direction="column" alignItems="center" justify="center">

            <Typography sx={styles.header}>
                MY TOURS
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
                                  <TableRow hover tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                    const tourRequest = row[column.id];
                                    
                                    return (
                                        <TableCell key={column.id} align={column.align} sx={styles.cells}>
                                            {column.id === "action" ? 
                                                <div>
                                                    {/* TODO for DB ppl: when check/cancel clicked, update status on UI and DB  */}
                                                    <Tooltip title="Cancel Tour Request"
                                                        componentsProps={{
                                                            tooltip: {
                                                                sx: {
                                                                    bgcolor: theme.palette.type === "light" ? 'rgba(171, 25, 31, 0.9)' : "rgba(245, 235, 224, .8)",
                                                                    color: "primaryColor"
                                                                },
                                                            },
                                                        }}>
                                                        <IconButton onClick={() => {
                                                            console.log("hello")
                                                            console.log(rowIndex)
                                                            handleCancelClicked(rowIndex)
                                                            }}>
                                                            <CancelOutlinedIcon sx={{ color: "textColor" }}/> 
                                                        </IconButton>
                                                        <ConfirmCancelTourView open={open} handleClose={handleClose} rowIndex={tourRowIdx} handleCancelConfirmed={handleCancelConfirmed}/>
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
export default MyToursPage
