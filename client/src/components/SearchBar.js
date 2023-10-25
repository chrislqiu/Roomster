import { Typography, Box, TextField, Button } from '@mui/material'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

const SearchBar = ({ data, setInput }) => {

    const handleInput = (e) => {
        console.log(e.target.value)
        setInput(e.target.value.toLowerCase())
      }
    
    const styles = {
        search: {
            margin: "-30px 0 60px 0",
            display: "flex",
            justifyContent:"center",
        },
        searchBox: {
            width: "500px", 
            height: "50px",
            border: "3px solid #AB191F",
            borderRadius: "25px",
        },
        buttons: {
            color:"#AB191F", 
            fontSize:"22px", 
        }
    }

    return <Box style={styles.search}>
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
                <Box style={{float:"right", marginTop:"7px"}}>
                    <Button style={styles.buttons}>
                        <FontAwesomeIcon icon={faCaretDown}/>
                    </Button>
                    
                </Box>
               
            </Box>
            

    </Box>

}
export default SearchBar;