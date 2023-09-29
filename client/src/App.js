// import React, { useState, useEffect } from "react";
import React from "react"
import "./App.css";
import MainPage from "./pages/MainPage";
import GlobalStyles from "@mui/material/GlobalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Divider, Box } from "@mui/material";
import background from './images/theredthing.png'
import logo from './images/logo.png'

  const styles = {
    background: {
      position: "absolute",
      backgroundImage: `url(${background})`,
      backgroundColor: "#f5ebe0",
      backgroundPosition: 'cover',
      backgroundSize: "100% 75%",
      backgroundRepeat: "no-repeat",
      height: '100%',
      width: "100%",
    },
    logo: {
      width: '40%',
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
        <div style={{textAlign:"center"}}>
          <img className="logo" src={logo} style={styles.logo}></img>
        </div>
        
        <BrowserRouter>
          <Routes>
            <Route path="/Home" element={<MainPage />} />
          </Routes>
        </BrowserRouter>
      </body>  

      /* </ThemeProvider> */
   
    );
  }
}
export default App;
