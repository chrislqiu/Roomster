// import React, { useState, useEffect } from "react";
import React from "react"
import "./App.css";
import MainPage from "./pages/MainPage";
import RenterPage from "./pages/RenterPage";
import PropertyManagerPage from "./pages/ProperyManagerPage";
import RenterCreateAccountPage from "./pages/RenterCreateAccountPage";
import MyCoopsPage from "./pages/MyCoopsPage";
import LoginPage from "./pages/LoginPage"
import GlobalStyles from "@mui/material/GlobalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Divider, Box } from "@mui/material";
import theredthing from './images/theredthing.png'
import logo from './images/logo2.png'
import RoomsterAppBar from "./components/AppBar";
import FavCoopsPage from "./pages/FavCoopsPage";
import Settings from "./pages/Settings"
import VerifyPage from "./pages/VerifyPage"
import Popup from "./components/Popup";
import RenterCreateAccountView from "./components/RenterCreateAccounView";
import ManagerCreateAccountView from "./components/PropertyManagerCreateAccountView";
import CoopmatesPage from "./pages/CoopmatesPage";

  const styles = {
    background: {
      position: "absolute",
      width:"100%",
      margin: "0",
      padding:"0",
      backgroundColor: "#f5ebe0",
      zIndex: "-1",
    },
    logo: {
      marginTop: "-50px",
      width: '35%',
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
    this.state = {
      apiResponse: "",
      isAuthenticated: false,
      isPopupOpen: false,
      popupMessage: "",
    };
  }

  callServer() {
    fetch('http://localhost:8000')
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }))
  }

  async componentDidMount() {
    this.callServer();
    this.checkAuthentication();
  }

  checkAuthentication = async () => {
    try {
      const response = await fetch('http://localhost:8000/auth/authorize', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        this.setState({ isAuthenticated: true });
      } else {
        console.log('Authentication check failed');
      }
    } catch (error) {
      console.error('Error during authentication check:', error);
    }
  };

  // checkVerification = async () => {
  //   try {
  //     const response = await fetch('http://localhost:8000/auth/check-verify', {
  //       method: 'GET',
  //       credentials: 'include',
  //     });
  
  //     if (response.ok) {
  //       const data = await response.json();
  //       // console.log(data.user.isVerified);
  //       if (data.user && data.user.isVerified) {
  //         // this.setState({ popupMessage: 'User is verified' });
  //       } else {
  //         this.setState({ popupMessage: 'You are not verified, please check your email' });
  //       }
  //     } else {
  //       // this.setState({ popupMessage: 'Error during verification check' });
  //     }
  //       this.setState({ isPopupOpen: true });

      
  //   } catch (error) {
  //     this.setState({ isPopupOpen: true });

  //     // this.setState({ popupMessage: 'Error during verification check' });
  //     // this.setState({ isPopupOpen: true });
  //   }
  // };
  
  

  render() {
    const { isAuthenticated } = this.state;
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

         <RoomsterAppBar login={isAuthenticated}/>
          <div style={{textAlign:"center", zIndex: "3", position: "relative", marginBottom:"50px"}}>

            <img className="logo" src={logo} style={styles.logo}></img>
          </div>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/Home" element={<MainPage login={isAuthenticated}/>} />
            <Route path="/RProfile" element={<RenterPage />} />
            <Route path="/MProfile" element={<PropertyManagerPage />} />
            <Route path="/FavCoops" element={<FavCoopsPage login={isAuthenticated}/>} />
            <Route path="/MyCoops" element={<MyCoopsPage />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/RCreate" element={<RenterCreateAccountView />} />
            <Route path="/MCreate" element={<ManagerCreateAccountView/>}/>
            <Route path="/Settings" element={<Settings />} />
            <Route path="/VerifyPage" element={<VerifyPage />} />
            <Route path="/Coopmates" element={<CoopmatesPage />} />
          </Routes>
        </BrowserRouter>
      </body>  

      /* </ThemeProvider> */
   

    );
  }
}

export default App;
