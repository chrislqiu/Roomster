import * as React from 'react';
import { Box, Paper, List, ListItem, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Stack, Divider } from '@mui/material';
import PropertyViewMore from './PropertyView';



const FeaturedProperties = ({ data, style, login }) => {
    const styles = {
        divider: {
            borderTop: "3px solid #AB191F",
            padding: "0",
            marginBottom: "10px",
            width: '1100px',
        },
        box: {
            backgroundColor: "#f5ebe0", 
            boxShadow: "0px 0px 3px 2px rgba(0, 0, 0, .1)",
            margin: "-30px 0 0 0",
            padding: "0",
            width: "1250px",
            //borderRadius: "10px",
            overflow: "hidden"
            
        }
    }
    return (
        <Container sx={{}} style={styles.box}>
            <Container style={{}}>
                <Typography
d                    color="#AB191F"
                    sx={{ marginTop: 1, textAlign: "center", fontWeight: "600", fontSize:"20pt"}}
                    >
                    FEATURED PROPERTIES
                </Typography>
            </Container>
            
            

            <List component={Stack} direction="row" sx={{ overflow: 'auto', marginTop: -1}} maxWidth='xl' spacing={-4}>
                {data.filter(property => property.featured == true).map(featuredCards => {
                    return <ListItem>
                        <PropertyViewMore data={featuredCards} featured={true} login={login} />
                    </ListItem>
                }
                )
                }
            </List>
            
            {(data.filter(property => property.featured == true).length == 0)
                && <Typography
                    variant="h5"
                    color="#AB191F"
                    sx={{ m: 10, textAlign: 'center' }}
                    fontWeight={500}
                >
                    No Featured Properties
                </Typography>}
            
        </Container>
    )
}
export default FeaturedProperties;