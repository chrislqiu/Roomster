import * as React from 'react';
import { Box, List, ListItem, Container, Typography, Stack } from '@mui/material';
import CoopmateView from './CoopmateView';
import CardPlaceholder from './CardPlaceholder';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';

const FavoriteCoopmates = ({ coopmateArr, style, login, username, userData, loading }) => {
    console.log(coopmateArr)
    const theme = useTheme();
    const styles = {
        divider: {
            borderTop: "3px solid",
            borderColor: "secondaryColor",
            padding: "0",
            marginBottom: "10px",
            width: '1100px',
        },
        box: {
            backgroundColor: "primaryColor",
            boxShadow: theme.palette.type === 'light' ? "0px 0px 3px 3px rgba(0, 0, 0, .1)" : "0px 0px 3px 3px rgba(245, 235, 224, .1)",
            margin: "-30px 0 0 0",
            padding: "0",
            width: "1250px",
            //borderRadius: "10px",
            overflow: "hidden"

        }
    }
    return (
        <Container sx={styles.box}>
            <Container>
                <Typography
                    color="secondaryColor"
                    sx={{ marginTop: 1, textAlign: "center", fontWeight: "600", fontSize: "20pt" }}
                >
                    LIKED COOPMATES
                </Typography>
            </Container>


            <List component={Stack} direction="row" sx={{ overflow: 'auto', marginTop: -1 }} maxWidth='xl' spacing={-4}>
                {
                    loading === false ?
                    (coopmateArr.length > 0 ?
                        coopmateArr.map(favCoopmate => {
                            return <ListItem>
                                <CoopmateView coopmate={favCoopmate} coopmatesArr={coopmateArr} username={username} userData={userData} />
                            </ListItem>
                        }
                        )
                        :
                        <Box sx={{ m: 5, textAlign: 'center' }} >
                            <Typography
                                variant="h5"
                                color="secondaryColor"
                                fontWeight={500}
                                sx={{ marginY: 1, textAlign: "center",  textAlign: 'center', marginLeft: 50}}
                            >
                                No Liked Coopmates!
                            </Typography>
                        </Box>)
                        :
                        <Box>
                        <CardPlaceholder isCoopmateCard={true}/>
                        </Box>

                }
            </List>

        </Container>
    )
}
export default FavoriteCoopmates;