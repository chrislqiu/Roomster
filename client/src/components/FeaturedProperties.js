import * as React from 'react';
import { Box, Paper, List, ListItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Stack, Divider } from '@mui/material';
import PropertyViewMore from './PropertyView';



const FeaturedProperties = ({ data, style }) => {
    const styles = {
        divider: {
            borderTop: "3px solid #AB191F",
            padding: "0",
            marginBottom: "10px",
            width: '1100px',
        }
    }
    return (
        <Box component={Paper} maxWidth='1000px' sx={{ backgroundColor: "#eddece" }} style={style}>
            <Box>
                <Typography
                    variant="h3"
                    color="#AB191F"
                    sx={{ marginTop: 2, fontStyle: 'italic', textAlign:'center' }}
                    fontWeight={600}
                    >
                    Featured Properties
                </Typography>
                <hr style={styles.divider}/>
            </Box>
           
            <List component={Stack} direction="row" sx={{ overflow: 'auto' }} maxWidth='xl' spacing={-4}>
                {data.map(featuredCards => {
                    return <ListItem>
                        <PropertyViewMore data={featuredCards} featured={true} />
                    </ListItem>
                }
                )
                }
            </List>

        </Box>
    )
}
export default FeaturedProperties;