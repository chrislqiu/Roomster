import * as React from 'react';
import { Box, Paper, List, ListItem, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Stack, Divider } from '@mui/material';
import CoopmateView from './CoopmateView';

const FavoriteCoopmates = ({ coopmateArr, style, login, username, userData }) => {
    console.log(coopmateArr)
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
                    d color="#AB191F"
                    sx={{ marginTop: 1, textAlign: "center", fontWeight: "600", fontSize: "20pt" }}
                >
                    LIKED COOPMATES
                </Typography>
            </Container>


            <List component={Stack} direction="row" sx={{ overflow: 'auto', marginTop: -1 }} maxWidth='xl' spacing={-4}>
                {
                    coopmateArr.length > 0 ?
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
                                color="#AB191F"
                                fontWeight={500}
                                sx={{ marginY: 1, textAlign: "center"}}
                                style={{ textAlign: 'center', marginLeft: 50 }}
                            >
                                No Liked Coopmates!
                            </Typography>
                        </Box>

                }
            </List>

        </Container>
    )
}
export default FavoriteCoopmates;