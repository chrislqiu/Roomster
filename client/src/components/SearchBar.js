import { Typography, Box, TextField, Autocomplete } from '@mui/material'

const SearchBar = ({ data, setInput }) => {
    const handleInput = (e) => {
        console.log(e.target.value)
        setInput(e.target.value.toLowerCase())
      }


    return <Box>
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            disableClearable={true}
            options={data.map(property=>property.propertyInfo.propertyName)}
            onSelect={handleInput}
            sx={{
                '&.MuiInputBase-root:focus': {
                    borderColor: '#AB191F',
                  },
            }}
            renderInput={(params) => 
            <TextField {...params}
                label="Search "
                sx={{
                    width: 1100,
                    margin: '1px auto',
                    '&.MuiInputBase-root:focus': {
                        borderColor: "#AB191F",
                      },
                }} 
            />}
        />
    </Box>

}
export default SearchBar;