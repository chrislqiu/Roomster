import * as React from 'react';
import { Container, Box } from "@mui/material";
import CoopmatesView from '../components/CoopmateView';

const CoopmatesPage = ({ }) => {
    const styles = {
        feed: {
            display: "flex",
            justifyContent: "center",
            maxWidth: "1200px",
            flexWrap: "wrap",
        },
        
    }
    return (
        <Container sx={{ width: '100%' }}>
        <Box sx={{ m: 1 }} style={styles.feed}>
              <CoopmatesView/>
        </Box>
    </Container>

    );
    
}
export default CoopmatesPage;