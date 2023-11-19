import React, { useState } from "react";
import { Toolbar, Grid, Paper, Card, Switch, Typography, Link } from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from "./components/AppBar.js"
import logo from './images/logo2.png'
import logoDarkMode from './images/logo-darkmode.png'
import theredthing from './images/theredthing.png'
import theredthingDarkMode from './images/theredthing-darkmode.png'

const lightTheme = {
    palette: {
        primar: '#F6EBE1',
        secondar: '#AB191F',
        textColor: '#FFFFFF'
    }
}
const darkTheme = {
    palette: {
        primar: '#18100e',
        secondar: '#962c1e',
        textColor: '#F6EBE1'
    }
}
function Layout({children}) {
  const [darkMode, setDarkMode] = useState(false);

  let theme = darkMode ? createTheme(darkTheme) : createTheme(lightTheme);

  return (
    <ThemeProvider theme={theme}>
      <Paper variant="body" sx={{
        backgroundColor: "primar",
        width: "100%",
        minHeight: "100vh",
        margin: "0",
        padding: "0",
        zIndex: "-1",
        justifyContent: "center"
      }}>
        <div style={{ zIndex: "0" }}>
            <img src={darkMode ? theredthingDarkMode : theredthing}
            style={{
                position: "absolute",  
                width: "100%",
            }}/>  
        </div>
        <div style={{ textAlign: "center", zIndex: "3", position: "relative", marginBottom: "50px" }}>
            <Link href="/Home">
                <img className="logo" src={darkMode ? logoDarkMode : logo} style={{marginTop: "10px", width: '35%', zIndex: "0",}}/>
            </Link>
        </div>
      <Grid container direction="column">
          <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
            { children }
        </Grid>
      </Paper>
    </ThemeProvider>
  );
}

export default Layout;