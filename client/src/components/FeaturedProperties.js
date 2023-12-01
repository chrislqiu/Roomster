import * as React from 'react';
import { Box, Paper, List, ListItem, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Stack, Divider } from '@mui/material';
import PropertyViewMore from './PropertyView';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import CardPlaceholder from './CardPlaceholder';



const FeaturedProperties = ({ data, style, login, loading }) => {
    const theme = useTheme();
    const styles = {
        box: {
            backgroundColor: "primaryColor",
            boxShadow: theme.palette.type === "light" ? "0px 0px 3px 2px rgba(0, 0, 0, .1)" : "0px 0px 3px 2px rgba(245, 235, 224, .3)",
            margin: "-30px 0 0 0",
            padding: "0",
            width: "1250px",
            //borderRadius: "10px",
            overflow: "hidden"

        }
    }
    return (
        <Container sx={styles.box}>
            <Container style={{}}>
                <Typography
                    sx={{ color: "secondaryColor", marginTop: 1, textAlign: "center", fontWeight: "600", fontSize: "20pt" }}
                >
                    FEATURED PROPERTIES
                </Typography>
            </Container>


            <List component={Stack} direction="row" sx={{ overflow: 'auto', marginTop: -1 }} maxWidth='xl' spacing={-4}>

                {loading ? (
                    <>
                        <ListItem>
                            <CardPlaceholder isCoopmateCard={false} />
                        </ListItem>
                        <ListItem>
                            <CardPlaceholder isCoopmateCard={false} />
                        </ListItem>
                        <ListItem>
                            <CardPlaceholder isCoopmateCard={false} />
                        </ListItem>
                        <ListItem>
                            <CardPlaceholder isCoopmateCard={false} />
                        </ListItem>
                    </>
                ) : (
                    data.filter(property => property.propertyInfo.featured === true).map(featuredCards => (
                        <ListItem key={featuredCards._id}>
                            <PropertyViewMore data={featuredCards} featured={true} login={login} />
                        </ListItem>
                    ))
                )}
            </List>

            {!loading && data.filter(property => property.propertyInfo.featured === true).length === 0 && (
                <Typography
                    variant="h5"
                    sx={{ color: "secondaryColor", fontWeight: 500, m: 10, textAlign: 'center' }}
                >
                    No Featured Properties
                </Typography>
            )}

        </Container>
    )
}
export default FeaturedProperties;