import * as React from 'react';
import { Box, Paper, List, ListItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import PropertyViewMore from './PropertyView';


const FeaturedProperties = ({ data, style }) => {

    return (
        <Box component={Paper} maxWidth='1000px' sx={{backgroundColor: "#eddece"}} style={style}>
            <Typography
                variant="h3" 
                color="#AB191F"
                sx={{marginTop: 2, fontStyle: 'italic', textDecoration: 'underline'}}
                fontWeight={600}

            >
                Featured Properties
            </Typography>
            <List component={Stack} direction="row" sx={{ overflow: 'auto' }} maxWidth='xl'>
                {data.map(featuredCards => {
                    return <ListItem>
                        <PropertyViewMore data={featuredCards} featured={true}/>
                    </ListItem>
                    }
                 )
                }
            </List>
        </Box>
    )
}
export default FeaturedProperties;