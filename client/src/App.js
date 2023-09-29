// import React, { useState, useEffect } from "react";
import React from "react"
import "./App.css";
import MainPage from "./pages/MainPage";
import TenantPage from "./pages/TenantPage";
import PropertyOwnerPage from "./pages/ProperyOwnerPage";
import GlobalStyles from "@mui/material/GlobalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material/styles";
import RoomsterAppBar from "./components/AppBar";

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

        <BrowserRouter>
         <RoomsterAppBar/>
          <Routes>
            <Route path="/Home" element={<MainPage />} />
            <Route path="/TProfile" element={<TenantPage />} />
            <Route path="/OProfile" element={<PropertyOwnerPage />} />
          </Routes>
        </BrowserRouter>

    );
  }
}
export default App;
