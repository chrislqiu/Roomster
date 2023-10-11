// import React, { useState, useEffect } from "react";
import React from "react"
import "./App.css";
import MainPage from "./pages/MainPage";
import RenterPage from "./pages/RenterPage";
import PropertyManagerPage from "./pages/ProperyManagerPage";
import RenterCreateAccountPage from "./pages/RenterCreateAccountPage";
import LoginPage from "./pages/LoginPage"
import GlobalStyles from "@mui/material/GlobalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Divider, Box } from "@mui/material";
import theredthing from './images/theredthing.png'
import logo from './images/logo.png'
import RoomsterAppBar from "./components/AppBar";
import Settings from "./pages/Settings"

  const styles = {
    background: {
      position: "absolute",
      margin: "0",
      padding:"0",
      backgroundColor: "#f5ebe0",
      zIndex: "-1",

    },
    logo: {
      margin: "-20px",
      width: '40%',
      zIndex: "0",
    },
    theredthing: {
      position: "absolute",
      width: "100%",
    }
  };

  const theme = createTheme({
    palette: {
      background: {
        default: "#F6EBE1"
      }
    }
  });

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" }
  }

  callServer() {
    fetch('http://localhost:8000')
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }))
  }

  componentDidMount() {
    this.callServer();
  }

  render() {
    return (
      
      
      // <ThemeProvider theme={theme}>
      //   <GlobalStyles
      //     sx={{
      //       body: { backgroundColor: "#F6EBE1" }
      //     }}
      //   />
      <body style={styles.background}>
        <div style={{zIndex: "0"}}>
          <img className="theredthing" src={theredthing} style={styles.theredthing}></img>
        </div>
        <BrowserRouter>
          {
            // if login is true (for now), app bar with login buttons will show
            // if login is false, appbar only has login/signup button
          }

         <RoomsterAppBar login={true}/>
          <div style={{textAlign:"center"}}>

            <img className="logo" src={logo} style={styles.logo}></img>
          </div>
          <Routes>
            <Route path="/Home" element={<MainPage />} />
            <Route path="/RProfile" element={<RenterPage />} />
            <Route path="/MProfile" element={<PropertyManagerPage />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/Settings" element={<Settings />} />
            <Route path="/RCreate" element={<RenterCreateAccountPage />} />
          </Routes>
        </BrowserRouter>
      </body>  

      /* </ThemeProvider> */
   

    );
  }
}
export default App;
