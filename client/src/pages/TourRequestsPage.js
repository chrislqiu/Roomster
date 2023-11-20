import * as React from 'react';
import {Grid, Typography, Divider, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material"; 
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';


const TourRequestsPage = ({ login }) => {

    const styles = {
        subheader: {
            fontWeight: "600",
            fontSize: "15pt",
            color: "secondaryColor",
            padding: "0 740px 10px 0",
        },

    }

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);


    const columns = [
        { id: 'date', label: 'DATE', width: "100px"},
        { id: 'time', label: 'TIME', width: "100px" },
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
      
    function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
    }
    
    /* Pull data from DB, dummy data for now */
    const rows = [
       
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
    ];


    return (
        <Grid container spacing={0} direction="column" alignItems="center" justify="center">

            <Typography sx={styles.subheader}>
                TOUR REQUESTS
            </Typography>
            <Paper sx={{
                width: '900px', 
                height:"300px", 
                overflow: 'hidden', 
                backgroundColor:"primaryColor"
                }}>
                <TableContainer sx={{ maxHeight: 440, borderColor:"blue"}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead >
                            <TableRow sx={{backgroundColor:"blue"}}>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                        backgroundColor:"#F6EBE1",
                                        fontWeight: "600",
                                        fontSize: "13pt",
                                        color: "black",
                                        //padding: "5px 15px 5px 15px",
                                        minWidth:column.width,
                                        borderBottomColor:"#AB191F",
                                        borderBottomWidth:"3px"
                                    }}
                                >
                                {column.label}
                                </TableCell>
                            ))}

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                        <TableCell key={column.id} align={column.align}>
                                        {column.format && typeof value === 'number'
                                            ? column.format(value)
                                            : value}
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

        // <Grid container spacing={2} columns={7} direction="column" alignItems="center" justify="center">
        //     <List
        //         sx={{
        //         width: '100%',
        //         width:"1000px",
        //         //maxWidth: 360,
        //         bgcolor: 'background.paper',
        //         position: 'relative',
        //         overflow: 'auto',
        //         maxHeight: 300,
        //         '& ul': { padding: 0 },
        //         }}
        //         subheader={<li />}
        //     >
        //         <li>
        //             <ListSubheader sx={{height:"60px", marginBottom:"0px", backgroundColor:"pink"}}>
        //                 <Typography sx={styles.subheader}>
        //                     DATE
        //                 </Typography>
        //                 <Typography sx={styles.subheader}>
        //                     TIME
        //                 </Typography>
        //                 <Divider variant="middle" sx={{borderBottomWidth: 3, backgroundColor: "secondaryColor", marginY: 1 }} />
        //             </ListSubheader>
        //             <ul>
        //                 <Grid container item xs={6} direction="column">
        //                 <ListItem  sx={{paddingLeft:"15px",paddingRight:"15px"}}>
        //                     <ListItemText>
        //                         <Typography >THIS IS AN ITEM</Typography>
        //                     </ListItemText>
        //                     <ListItemText>
        //                         <Typography>AN ITEMMMMMMMMMMMM</Typography>
        //                     </ListItemText>
        //                     <ListItemText>
        //                         <Typography >THIS IS AN ITEM</Typography>
        //                     </ListItemText>
        //                 </ListItem>
        //                 </Grid>
        //             </ul>
        //         </li>
        //     </List>
        // </Grid>
    )
    
}
export default TourRequestsPage