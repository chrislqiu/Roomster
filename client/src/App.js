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
import AdminVerifyPage from "./pages/AdminVerifyPage";
import Popup from "./components/Popup";
import RenterCreateAccountView from "./components/RenterCreateAccountView";
import ManagerCreateAccountView from "./components/PropertyManagerCreateAccountView";
import CoopmatesPage from "./pages/CoopmatesPage";
import PropertyManagerPublicPage from "./pages/PropertyManagerPublicPage";
import AdminPage from "./pages/AdminPage";
import ResetPWPage from "./pages/ResetPWPage"
import SetAdminPWPage from "./pages/SetAdminPWPage";
import AdminDenyPage from "./pages/AdminDenyPage";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const styles = {
  background: {
    position: "absolute",
    width: "100%",
    minHeight: "100vh",
    margin: "0",
    padding: "0",
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
      isAuthenticatedAdmin: false,
      isPopupOpen: false,
      popupMessage: "",
      userType: ""
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
    this.checkAuthenticationAdmin();
    // this.checkVerification();
  }



  checkAuthentication = async () => {
    try {
      const response = await fetch('http://localhost:8000/auth/authorize', {
        method: 'GET',
        credentials: 'include',
      });



      if (response.ok) {
        this.setState({ isAuthenticated: true });
        const data = await response.json();
        const userType = data.userType;
        this.setState({ userType: userType });
        console.log("user type: " + userType)
      } else {
        console.log('Authentication check failed');
      }
    } catch (error) {
      console.error('Error during authentication check:', error);
    }
  };

  checkAuthenticationAdmin = async () => {
    try {
      const response = await fetch('http://localhost:8000/auth/authorize-admin', {
        method: 'GET',
        credentials: 'include',
      });



      if (response.ok) {
        this.setState({ isAuthenticatedAdmin: true });
        const data = await response.json();
        const userType = data.userType;
        this.setState({ userType: userType });
        console.log("user type: " + userType)
      } else {
        console.log('Authentication check failed');
      }
    } catch (error) {
      console.error('Error during authentication check:', error);
    }
  };


  checkVerification = async () => {
    try {
      const response = await fetch('http://localhost:8000/auth/check-verify', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
          // toast.success('User is verified');
      } else {
        toast.error('You are not verified, please check your email');
        // toast.error('Error during verification check');
      }

    } catch (error) {
      // toast.error('Error during verification check');
    }
  };



  render() {
    const { isAuthenticated, isAuthenticatedAdmin, userType } = this.state;
    const pathname = window.location.pathname
    const showAppBar = pathname !== "/Admin" || isAuthenticatedAdmin;

    const showAppBarAdmin = pathname === "/Admin" && isAuthenticatedAdmin;
    const showAppBarMain = pathname !== "/Admin" && isAuthenticated;

    const faviconPath = "favicon.ico";

    return (
      
      // <ThemeProvider theme={theme}>
      //   <GlobalStyles
      //     sx={{
      //       body: { backgroundColor: "#F6EBE1" }
      //     }}
      //   />


      <HelmetProvider>
        <Helmet>
          <title>Roomster</title>
          {/* <link rel="icon" type="image/png" href={favicon} /> */}
          <link rel="icon" href="https://i.ibb.co/NF8X7Vx/favicon.png" />

        </Helmet>


        <html>
          <body style={styles.background}>
            <div style={{ zIndex: "0" }}>
              <img className="theredthing" src={theredthing} style={styles.theredthing}></img>
            </div>
            <BrowserRouter>
              {
                // if login is true (for now), app bar with login buttons will show
                // if login is false, appbar only has login/signup button
              }

              {showAppBar ? <RoomsterAppBar login={showAppBarAdmin || showAppBarMain} /> : <div style={{ height: '64px' }}></div>}
              <div style={{ textAlign: "center", zIndex: "3", position: "relative", marginBottom: "50px" }}>
                <img className="logo" src={logo} style={styles.logo}></img>
              </div>
              <ToastContainer />
              <Routes>
                <Route path="/" element={<MainPage login={isAuthenticated} />} />
                <Route path="/Home" element={<MainPage login={isAuthenticated} />} />
                <Route path="/RProfile" element={<RenterPage />} />
                <Route path="/MProfile" element={<PropertyManagerPage />} />
                <Route path="/FavCoops" element={<FavCoopsPage login={isAuthenticated} />} />
                <Route path="/MyCoops" element={<MyCoopsPage login={isAuthenticated} />} />
                <Route path="/Login" element={<LoginPage />} />
                <Route path="/RCreate" element={<RenterCreateAccountView />} />
                <Route path="/MCreate" element={<ManagerCreateAccountView />} />
                <Route path="/Settings" element={<Settings />} />
                <Route path="/VerifyPage" element={<VerifyPage />} />
                <Route path="/AdminVerifyPage" element={<AdminVerifyPage />} />
                <Route path="/AdminDenyPage" element={<AdminDenyPage />} />
                <Route path="/Coopmates" element={<CoopmatesPage />} />
                <Route path="/CompanyPage" element={<PropertyManagerPublicPage />} />
                <Route path="/Admin" element={<AdminPage />} />
                <Route path="/ResetPW/:token" element={<ResetPWPage />} />
                <Route path="/SetAdminPW/:token" element={<SetAdminPWPage />} />
              </Routes>
            </BrowserRouter>
          </body>
        </html>
      </HelmetProvider >
    );
  }
}

export default App;
