import { Typography, Box, TextField, Button, Collapse, Paper, FormGroup, FormControlLabel, Checkbox, Stack, Container, Slider, Divider } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import React from "react"

const SearchBar = ({ data, setInput }) => {

    const handleInput = (e) => {
        console.log(e.target.value)
        setInput(e.target.value.toLowerCase())
    }

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
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
            border: "3px solid #AB191F",
            borderRadius: "25px",
        },
        buttons: {
            color: "#AB191F",
            fontSize: "22px",
        }
    }

    return <Box style={styles.search}>
        <Stack direction='column'>
            <Box style={styles.searchBox}>
                <TextField
                    placeholder='Search'
                    sx={{
                        "& fieldset": { border: 'none', },
                        width: "350px",
                        height: "50px"
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
                    <Button
                        onClick={handleClick}
                        style={styles.buttons}>
                        <FontAwesomeIcon icon={open ?  faCaretUp : faCaretDown} />
                    </Button>
                </Box>
            </Box>
            {open && (
                <Collapse direction="down" in={open} >
                    <Paper elevation={3} sx={{ backgroundColor: "#F6EBE1", color: "black" }}>
                        <Box style={{ padding: '20px' }}>
                            <Stack direction="row" spacing={1}>
                                <Typography
                                    sx={{
                                        color: "#AB191F",
                                        fontWeight: 600
                                    }}
                                >
                                    Filter by:
                                </Typography>
                                <Box sx={{paddingY: 5}}>
                                <FormGroup>
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
                                                sx={{ color: "#AB191F", width: "100px", height: "5px", marginBottom: 2}}
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
                                                sx={{ color: "#AB191F", width: "100px", height: "5px" }}
                                            />
                                        }
                                    />
                                </FormGroup>
                                </Box>
                                <FormGroup>
                                    Bedroom
                                    <FormControlLabel
                                        control={<Checkbox sx={{
                                            color: "black",
                                            '&.Mui-checked': {
                                                color: "#AB191F",
                                            }
                                        }} />}
                                        label="1 bed"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox sx={{
                                            color: "black",
                                            '&.Mui-checked': {
                                                color: "#AB191F",
                                            }
                                        }} />
                                        }
                                        label="2 beds"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox sx={{
                                            color: "black",
                                            '&.Mui-checked': {
                                                color: "#AB191F",
                                            }
                                        }} />
                                        }
                                        label="3 beds"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox sx={{
                                            color: "black",
                                            '&.Mui-checked': {
                                                color: "#AB191F",
                                            }
                                        }} />
                                        }
                                        label="4 beds"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    Bathroom
                                    <FormControlLabel
                                        control={<Checkbox sx={{
                                            color: "black",
                                            '&.Mui-checked': {
                                                color: "#AB191F",
                                            }
                                        }} />}
                                        label="1 bath"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox sx={{
                                            color: "black",
                                            '&.Mui-checked': {
                                                color: "#AB191F",
                                            }
                                        }} />
                                        }
                                        label="2 baths"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox sx={{
                                            color: "black",
                                            '&.Mui-checked': {
                                                color: "#AB191F",
                                            }
                                        }} />
                                        }
                                        label="3 baths"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox sx={{
                                            color: "black",
                                            '&.Mui-checked': {
                                                color: "#AB191F",
                                            }
                                        }} />
                                        }
                                        label="4 baths"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox sx={{
                                            color: "black",
                                            '&.Mui-checked': {
                                                color: "#AB191F",
                                            }
                                        }} />
                                        }
                                        label="5 baths"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    Amenities
                                    <FormControlLabel
                                        control={<Checkbox sx={{
                                            color: "black",
                                            '&.Mui-checked': {
                                                color: "#AB191F",
                                            }
                                        }} />}
                                        label="Lounge"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox sx={{
                                            color: "black",
                                            '&.Mui-checked': {
                                                color: "#AB191F",
                                            }
                                        }} />
                                        }
                                        label="Parking"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox sx={{
                                            color: "black",
                                            '&.Mui-checked': {
                                                color: "#AB191F",
                                            }
                                        }} />
                                        }
                                        label="Pool"
                                    />
                                </FormGroup>
                            </Stack>
                        </Box>
                    </Paper>
                </Collapse>
            )}
        </Stack>
    </Box>


}
export default SearchBar;