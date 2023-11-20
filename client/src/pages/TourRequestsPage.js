import * as React from 'react';
import {Grid, Typography, Divider, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material"; 
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';


const TourRequestsPage = ({ login }) => {
    const theme = useTheme();


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
        }
    }

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(100);


    const columns = [
        { id: 'date', label: 'DATE', width: "100px", align:'center'},
        { id: 'time', label: 'TIME', width: "100px", align:'center'},
        {
          id: 'property',
          label: 'PROPERTY',
          width: "150px",
          align: 'center',
        },
        {
          id: 'user',
          label: 'USER',
          width: "150px",
          align: 'center',
        },
        {
          id: 'status',
          label: 'STATUS',
          width: "150px",
          align: 'center',
        },
      ];
      
    function pullData(date, time, property, user, status) {
        return { date, time, property, user, status };
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
                            .map((row) => {
                                return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                    const tourRequest = row[column.id];
                                    return (
                                        <TableCell key={column.id} align={column.align} sx={styles.cells}>
                                            {tourRequest}
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