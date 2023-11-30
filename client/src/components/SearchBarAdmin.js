import React, { useEffect } from "react";
import { Typography, Box, TextField, Stack } from '@mui/material';

const SearchBarAdmin = ({ renterData, managerData, setInput, setFilteredRenters, setFilteredManagers }) => {
    const [searchText, setSearchText] = React.useState('');

    const handleInput = (e) => {
        setInput(e.target.value.toLowerCase());
        setSearchText(e.target.value.toLowerCase());
    };

    useEffect(() => {
        console.log(searchText)
        const filteredRenters = renterData.filter((user) => {
            const renterMain = Object.values(user).filter((_, index) => index !== 2);
            const renterInfo = Object.values(user.renterInfo)

            return renterMain.some((value) => value && value.toString().toLowerCase().includes(searchText)) || renterInfo.some((value) => value && value.toString().toLowerCase().includes(searchText));
        });

        const filteredManagers = managerData.filter((user) => {
            const managerMain = Object.values(user).filter((_, index) => index !== 2);
            const managerCompanyInfo = Object.values(user.company.companyInfo)

            return managerMain.some((value) => value && value.toString().toLowerCase().includes(searchText)) || managerCompanyInfo.some((value) => value && value.toString().toLowerCase().includes(searchText));
        });


        console.log(filteredRenters);
        console.log(filteredManagers)
        setFilteredRenters(filteredRenters);
        setFilteredManagers(filteredManagers)
    }, [searchText, renterData, managerData, setFilteredRenters, setFilteredManagers]);

    const styles = {
        search: {
            margin: "-30px 0 60px 0",
            display: "flex",
            justifyContent: "center",
        },
        searchBox: {
            width: "500px",
            height: "50px",
            border: "3px solid #AB191F",
            borderRadius: "25px",
        },
    };

    return (
        <Box style={styles.search}>
            <Stack direction="column">
                <Box style={styles.searchBox}>
                    <TextField
                        placeholder="Search"
                        sx={{
                            "& fieldset": { border: 'none' },
                            width: "350px",
                            height: "50px",
                        }}
                        inputProps={{
                            style: {
                                height: "50px",
                                padding: '0 20px',
                            },
                        }}
                        onChange={handleInput}
                    />
                </Box>
            </Stack>
        </Box>
    );
};

export default SearchBarAdmin;
