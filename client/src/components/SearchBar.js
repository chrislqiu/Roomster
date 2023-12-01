import { Typography, Box, TextField, Collapse, Paper, FormGroup, FormControlLabel, Checkbox, Stack, Slider, Menu, MenuItem, IconButton, Tooltip } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCaretDown, faCaretUp, faArrowUp19 } from '@fortawesome/free-solid-svg-icons'
import React from "react"
import { useTheme } from '@mui/material/styles';
import MapIcon from '@mui/icons-material/Map';
import { Route } from 'react-router-dom';

const SearchBar = ({ data, setInput, setFilteredOptions, setNumberSelected, setSortOptions, setMapView }) => {
    const theme = useTheme();
    const [selectBed, setSelectBed] = React.useState([]);
    const [selectBath, setSelectedBath] = React.useState([]);
    const [selectAmenities, setSelectedAmenities] = React.useState([]);
    const [selectUtilities, setSelectedUtilities] = React.useState([]);
    const [searchText, setSearchText] = React.useState('')

    const [anchorEl, setAnchorEl] = React.useState(null);
    //const [sortOption, setSortOption] = React.useState('Default');

    //FILTER
    const handleBedroom = (event) => {
        const value = event.target.value;
        if (selectBed.includes(value)) {
            setSelectBed(selectBed.filter((item) => item !== value));
        } else {
            setSelectBed([...selectBed, value]);
        }
    };

    const handleBathroom = (event) => {
        const value = event.target.value;
        if (selectBath.includes(value)) {
            setSelectedBath(selectBath.filter((item) => item !== value));
        } else {
            setSelectedBath([...selectBath, value]);
        }
    };

    const handleAmenity = (event) => {
        const value = event.target.value;
        if (selectAmenities.includes(value)) {
            setSelectedAmenities(selectAmenities.filter((item) => item !== value));
        } else {
            setSelectedAmenities([...selectAmenities, value]);
        }
    };

    const handleUtility = (event) => {
        const value = event.target.value;
        console.log(value)
        if (selectUtilities.includes(value)) {
            setSelectedUtilities(selectUtilities.filter((item) => item !== value));
            console.log(selectUtilities)
        } else {
            setSelectedUtilities([...selectUtilities, value]);
        }
    };

    const handleInput = (e) => {
        //console.log(e.target.value)
        setInput(e.target.value.toLowerCase())
        setSearchText(e.target.value.toLowerCase())

    }

    //SORTING 
    const handleSortButtonClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSortButtonClose = () => {
        setAnchorEl(null);
    };

    const handleMapView = () => {
        setMapView((prevMapView) => !prevMapView);
    };

    const handleSortOptionClick = (sortOption) => {
        // set the sort option -- price or dist
        setSortOptions(sortOption);

        const sortedData = sortData(data, sortOption);
        // update the list of properties 
        setFilteredOptions(sortedData);

        handleSortButtonClose();
        if (open === true) {
            setOpen(!open)
        }
        setSelectBed([])
        setSelectedBath([])
        setSelectedAmenities([])
        setSelectedUtilities([])
      };

    const sortData = (data, sortingOption) => {
        if (sortingOption === 'Low to High') {
            return data.sort((a, b) => a.propertyInfo.cost - b.propertyInfo.cost);
        } else if (sortingOption === 'High to Low') {
            return data.sort((a, b) => b.propertyInfo.cost - a.propertyInfo.cost);
        } else {
            return data;
        }
    };


    React.useEffect(() => {
        const filteredPropertyInfo = data.filter((property) => {

            const searchTextFilter = property.propertyInfo.propertyName.toLowerCase().includes(searchText.toLowerCase());

            const bedroomFilter = selectBed.length === 0 || selectBed.includes(property.propertyInfo.beds.toString());

            const bathroomFilter = selectBath.length === 0 || selectBath.includes(property.propertyInfo.baths.toString());

            const amenityFilter = selectAmenities.length === 0 || selectAmenities.every((amenity) => property.propertyInfo.amenities.includes(amenity));

            const utilityFilter = selectUtilities.length === 0 || selectUtilities.every((util) => property.propertyInfo.utilities.includes(util));
            console.log(`utility filter ${utilityFilter}`)

            return bedroomFilter && bathroomFilter && amenityFilter && searchTextFilter && utilityFilter;
        });
        /* setFilteredOptions is the final combined list of the filtered options */
        setFilteredOptions(filteredPropertyInfo);
        setNumberSelected(selectBed.length + selectBath.length + selectAmenities.length + selectUtilities.length)

        /* */
    }, [selectBed, selectBath, selectAmenities, selectUtilities]);


    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
        if (open === true) {
            setSelectBed([])
            setSelectedBath([])
            setSelectedAmenities([])
        }
    };

    const styles = {
        search: {
            margin: "-30px 0 60px 0",
            display: "flex",
            justifyContent: "center",
        },
        searchBox: {
            width: "500px",
            height: "50px",
            border: "3px solid secondaryColor",
            borderRadius: "25px",
        },
        buttons: {
            color: "secondaryColor",
            fontSize: "22px",
        },
        menuItems: {
            color: "textColor",
            fontWeight: '600'
        },
        tooltip: {
            backgroundColor: 'secondaryColor',
            color: 'primaryColor'
        }
    }

    const checkboxSX = {
        color: "textColor",
        '&.Mui-checked': {
            color: "secondaryColor",
        }
    }

    return <Box sx={styles.search}>
        <Stack direction='column'>
            <Box sx={{
                width: "500px",
                height: "50px",
                borderStyle: "solid",
                borderWidth: "3px",
                borderColor: "secondaryColor",
                borderRadius: "25px",
            }}>
                <TextField
                    placeholder='Search'
                    sx={{
                        input: {
                            color: "textColor",
                            "&::placeholder": {
                                opacity: 0.7,
                                color: "textColor",
                            },
                        },
                        "& fieldset": { border: 'none', },
                        width: "350px",
                        height: "50px",

                    }}
                    inputProps={{
                        style: {
                            height: "50px",
                            padding: '0 20px',
                        },
                    }}
                    onSelect={handleInput}
                />
                <Box style={{ float: "right", marginTop: "7px" }}>
                    <IconButton
                        onClick={handleClick}
                        sx={styles.buttons}>
                        <FontAwesomeIcon icon={open ? faCaretUp : faCaretDown} />
                    </IconButton>
                </Box>
            </Box>
            {open && (
                <Collapse direction="down" in={open} >
                    <Paper elevation={3}
                        sx={{
                            backgroundColor: "primaryColor", color: "textColor",
                            boxShadow: theme.palette.type === 'light' ? "0px 0px 3px 3px rgba(0, 0, 0, .1)" : "0px 0px 3px 2px rgba(245, 235, 224, .3)",
                            marginTop: "10px"
                        }}>
                        <Box style={{ padding: '20px' }}>
                            <Stack direction="row" spacing={1}>
                                <Typography
                                    sx={{
                                        color: "secondaryColor",
                                        fontWeight: 600
                                    }}
                                >
                                    Filter by:
                                </Typography>
                                {/* <Box sx={{ paddingY: 5 }}>
                                    <FormGroup sx={{color: "textColor"}}>
                                        Distance
                                        <FormControlLabel
                                            control={
                                                <Slider
                                                    size="small"
                                                    defaultValue={3}
                                                    valueLabelDisplay="auto"
                                                    step={1}
                                                    marks
                                                    min={0}
                                                    max={5}
                                                    sx={{ color: "secondaryColor", width: "100px", height: "5px", marginBottom: 2 }}
                                                />
                                            }
                                        />

                                        Price
                                        <FormControlLabel
                                            control={
                                                <Slider
                                                    size="small"
                                                    defaultValue={2000}
                                                    valueLabelDisplay="auto"
                                                    step={600}
                                                    marks
                                                    min={0}
                                                    max={3000}
                                                    sx={{ color: "secondaryColor", width: "100px", height: "5px" }}
                                                />
                                            }
                                        />
                                    </FormGroup>
                                </Box> */}
                                <FormGroup sx={{color: "textColor"}}>
                                    Bedroom
                                    <FormControlLabel
                                        control={<Checkbox
                                            value="1"
                                            onChange={handleBedroom}
                                            sx={checkboxSX} />}
                                        label="1 bed"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox
                                            value="2"
                                            onChange={handleBedroom}
                                            sx={checkboxSX} />
                                        }
                                        label="2 beds"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox
                                            value="3"
                                            onChange={handleBedroom}
                                            sx={checkboxSX} />
                                        }
                                        label="3 beds"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox
                                            value="4"
                                            onChange={handleBedroom}
                                            sx={checkboxSX} />
                                        }
                                        label="4 beds"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    Bathroom
                                    <FormControlLabel
                                        control={<Checkbox
                                            value="1"
                                            onChange={handleBathroom}
                                            sx={checkboxSX} />}
                                        label="1 bath"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox
                                            value="2"
                                            onChange={handleBathroom}
                                            sx={checkboxSX} />
                                        }
                                        label="2 baths"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox
                                            value="3"
                                            onChange={handleBathroom}
                                            sx={checkboxSX} />
                                        }
                                        label="3 baths"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox
                                            value="4"
                                            onChange={handleBathroom}
                                            sx={checkboxSX} />
                                        }
                                        label="4 baths"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox
                                            value="5"
                                            onChange={handleBathroom}
                                            sx={checkboxSX} />
                                        }
                                        label="5 baths"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    Amenities
                                    <FormControlLabel
                                        control={<Checkbox
                                            value="Gym"
                                            onChange={handleAmenity}
                                            sx={checkboxSX} />}
                                        label="Gym"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox
                                            value="In Unit W/D"
                                            onChange={handleAmenity}
                                            sx={checkboxSX} />}
                                        label="In Unit W/D"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox
                                            value="Furnished"
                                            onChange={handleAmenity}
                                            sx={checkboxSX} />
                                        }
                                        label="Furnished"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                value="Pool"
                                                onChange={handleAmenity}
                                                sx={checkboxSX} />
                                        }
                                        label="Pool"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                value="Parking"
                                                onChange={handleAmenity}
                                                sx={checkboxSX} />
                                        }
                                        label="Parking"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                value="Pet Friendly"
                                                onChange={handleAmenity}
                                                sx={checkboxSX} />
                                        }
                                        label="Pet Friendly"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                value="Kitchen Appliance"
                                                onChange={handleAmenity}
                                                sx={checkboxSX} />
                                        }
                                        label="Kitchen Appliances"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    Utilities
                                    <FormControlLabel
                                        control={<Checkbox
                                            value="Internet"
                                            onChange={handleUtility}
                                            sx={checkboxSX} />}
                                        label="Internet"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox
                                            value="Sewage"
                                            onChange={handleUtility}
                                            sx={checkboxSX} />
                                        }
                                        label="Sewage"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                value="Trash"
                                                onChange={handleUtility}
                                                sx={checkboxSX} />
                                        }
                                        label="Trash"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                value="Electricity"
                                                onChange={handleUtility}
                                                sx={checkboxSX}/>
                                        }
                                        label="Electricity"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                value="Gas"
                                                onChange={handleUtility}
                                                sx={checkboxSX}/>
                                        }
                                        label="Gas"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                value="Water"
                                                onChange={handleUtility}
                                                sx={checkboxSX}/>
                                        }
                                        label="Water"
                                    />
                                </FormGroup>
                            </Stack>
                        </Box>
                    </Paper>
                </Collapse>
            )}
        </Stack>
        <Box>
            <Tooltip
                title={"Sort results"}
                componentsProps={{
                    tooltip: {
                        sx: {
                            bgcolor: theme.palette.type === "light" ? 'rgba(171, 25, 31, 0.9)' : "rgba(245, 235, 224, .8)",
                            color: "primaryColor"
                        },
                    },
                }}
            >
                <IconButton
                    aria-controls="sorting-menu"
                    aria-haspopup="true"
                    onClick={handleSortButtonClick}
                    sx={styles.buttons}
                    style={{
                        marginTop: "10px"
                    }}

                >
                    <FontAwesomeIcon icon={faArrowUp19} />
                </IconButton>

            </Tooltip>
            <Tooltip
                title={"Map View"}
                componentsProps={{
                    tooltip: {
                        sx: {
                            bgcolor: theme.palette.type === "light" ? 'rgba(171, 25, 31, 0.9)' : "rgba(245, 235, 224, .8)",
                            color: "primaryColor"
                        },
                    },
                }}
            >
                <IconButton
                    onClick={handleMapView}
                    sx={styles.buttons}
                    style={{
                        marginTop: "10px"
                    }}

                >
                    <MapIcon />
                </IconButton>
            </Tooltip>
            <Menu
                id="sorting-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleSortButtonClose}
                PaperProps={{
                    sx: {
                        backgroundColor: "primaryColor",
                        boxShadow: theme.palette.type === 'light' ? "0px 0px 3px 3px rgba(0, 0, 0, .1)" : "0px 0px 3px 3px rgba(245, 235, 224, .1)",

                    },
                }}
            >
                <MenuItem
                    sx={styles.menuItems}
                    onClick={() => handleSortOptionClick('Low to High')}
                >
                    Price: Low to High
                </MenuItem>
                <MenuItem
                    sx={styles.menuItems}
                    onClick={() => handleSortOptionClick('High to Low')}
                >
                    Price: High to Low
                </MenuItem>
            </Menu>
        </Box>
    </Box>


}
export default SearchBar;