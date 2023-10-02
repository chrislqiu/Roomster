// import React, { useState, useEffect } from "react";
import React from "react"
import "./App.css";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage"
import GlobalStyles from "@mui/material/GlobalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material/styles";

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
        <BrowserRouter>
          <Routes>
            <Route path="/Home" element={<MainPage />} />
            <Route path="/Login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      /* </ThemeProvider> */
   
    );
  }
}
export default App;
