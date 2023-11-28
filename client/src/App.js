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
import { Grid, Switch, Divider, Box, Link, Paper, IconButton } from "@mui/material";
import theredthing from './images/theredthing.png'
import logo from './images/logo2.png'
import logoDarkMode from './images/logo-darkmode.png'
import theredthingDarkMode from './images/theredthing-darkmode.png'
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
import AdminFeaturePage from "./pages/AdminFeaturePage";
import AdminFeatureManagePage from "./pages/AdminFeatureManagePage";
import AdminUserPage from "./pages/AdminUserPage";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyToursPage from "./pages/MyToursPage";
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import TourRequestsPage from "./pages/TourRequestsPage";
import 'leaflet/dist/leaflet.css';

const font = "'Lato', sans-serif";
const lightTheme = {
  components: {
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          color: "#000000"
        }
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          // Controls default (unchecked) color for the thumb
          color: "#AB191F",
        },
        colorPrimary: {
          "&.Mui-checked": {
            // Controls checked color for the thumb
            color: "#AB191F"
          }
        },
        track: {
          opacity: 0.2,
          backgroundColor: "#AB191F",
          ".Mui-checked.Mui-checked + &": {
            opacity: 0.7,
            backgroundColor: "#AB191F"
          }
        }
      }
    }
  },
  palette: {
    type: "light",
    primaryColor: '#F6EBE1',
    secondaryColor: '#AB191F',
    textColor: '#000000',
    hoverColor: "#F6EBE1",
    textFieldBorder: "black",
  },
  typography: {
    color: "#000000",
    fontFamily: font,
  }
}
const darkTheme = {
  overrides: {
    MuiInput: {
      input: {
        '&::placeholder': {
          color: "#F6EBE1",
          opacity: "1",
        }
      }
    }
  },
  components: {

    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          color: "#F6EBE1"
        }
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          // Controls default (unchecked) color for the thumb
          color: "#962c1e",
        },
        colorPrimary: {
          "&.Mui-checked": {
            // Controls checked color for the thumb
            color: "#962c1e"
          }
        },
        track: {
          opacity: 0.2,
          backgroundColor: "#962c1e",
          ".Mui-checked.Mui-checked + &": {
            opacity: 0.7,
            backgroundColor: "#962c1e"
          }
        }
      }
    }
  },
  palette: {
    type: "dark",
    primaryColor: '#18100e',
    secondaryColor: '#962c1e',
    textColor: '#F6EBE1',
    hoverColor: "#F6EBE1",
    textFieldBorder: "#962c1e",
  },
  typography: {
    fontFamily: font,
  }
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      apiResponse: "",
      isAuthenticated: false,
      isAuthenticatedAdmin: false,
      isPopupOpen: false,
      popupMessage: "",
      userType: "",
      darkMode: false
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
        console.log(data)
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
        // this.setState({ userType: "admin" });
        console.log("user type: admin")
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
    var darkMode
    if (localStorage.getItem("darkMode") != null) {
      localStorage.getItem("darkMode") === "light" ? darkMode = false : darkMode = true
    } else {
      darkMode = this.state.darkMode;
    }

    const { isAuthenticated, isAuthenticatedAdmin, userType } = this.state;
    let theme = darkMode ? createTheme(darkTheme) : createTheme(lightTheme);
    //const theme = useTheme();
    const pathname = window.location.pathname
    const showAppBar = !pathname.startsWith("/Admin") || isAuthenticatedAdmin;

    const showAppBarAdmin = pathname.startsWith("/Admin") && isAuthenticatedAdmin;
    const showAppBarMain = !pathname.startsWith("/Admin") && isAuthenticated;

    const updatedUser = showAppBarAdmin ? "admin" : userType;


    const faviconPath = "favicon.ico";

    const handleDarkMode = () => {
      this.setState({ darkMode: !this.state.darkMode })
      if (darkMode === false) {
        localStorage.setItem("darkMode", "dark");
      } else {
        localStorage.setItem("darkMode", "light")
      }
    }

    return (

      <HelmetProvider>
        <Helmet>
          <title>Roomster</title>
          {/* <link rel="icon" type="image/png" href={favicon} /> */}
          <link rel="icon" href="https://i.ibb.co/NF8X7Vx/favicon.png" />

        </Helmet>

        <ThemeProvider theme={theme}>
          <GlobalStyles
            styles={{
              body: { backgroundColor: theme.palette.type === "light" ? "#F6EBE1" : "#18100e", zIndex: "-1", },
            }}
          />

          <div style={{ zIndex: "0" }}>
            <img src={darkMode ? theredthingDarkMode : theredthing}
              style={{
                position: "absolute",
                width: "100%",
              }} />
          </div>

          <BrowserRouter>
            {
              // if login is true (for now), app bar with login buttons will show
              // if login is false, appbar only has login/signup button
            }
            <IconButton
              onClick={handleDarkMode}
              sx={{
                position: "absolute",
                zIndex: 5,
                textALign: "right",
                margin: "15px 0 0 1075px",
                color: 'primaryColor',
                ":hover":
                {
                  backgroundColor: 'primaryColor',
                  color: 'secondaryColor'
                }
              }}
            >
              {darkMode ?
                <LightMode />
                :
                <DarkMode />
              }
            </IconButton>

            {showAppBar ? <RoomsterAppBar login={showAppBarAdmin || showAppBarMain} userType={updatedUser} /> : <div style={{ height: '64px' }}></div>}
            <div style={{ textAlign: "center", zIndex: "3", position: "relative", marginBottom: "50px" }}>
              <Link href="/Home">
                <img className="logo" src={darkMode ? logoDarkMode : logo} style={{ width: '35%', zIndex: "0", }} />
              </Link>
            </div>

            <ToastContainer />
            <Routes>
              <Route path="/" element={<MainPage login={isAuthenticated} />} />
              <Route path="/Home" element={<MainPage login={isAuthenticated} />} />
              <Route path="/RProfile" element={<RenterPage />} />
              <Route path="/MProfile" element={<PropertyManagerPage />} />
              <Route path="/FavCoops" element={<FavCoopsPage login={isAuthenticated} />} />
              <Route path="/MyCoops" element={<MyCoopsPage login={isAuthenticated} />} />
              <Route path="MyTours" element={<MyToursPage login={isAuthenticated} />} />
              <Route path="TourRequests" element={<TourRequestsPage login={isAuthenticated} />} />
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
              <Route path="/Admin/Featured" element={<AdminFeaturePage />} />
              <Route path="/Admin/FeaturedManage" element={<AdminFeatureManagePage />} />
              <Route path="/Admin/Users" element={<AdminUserPage />} />
              <Route path="/ResetPW/:token" element={<ResetPWPage />} />
              <Route path="/Property/:token" element={<MainPage login={isAuthenticated} />} />
              <Route path="/SetAdminPW/:token" element={<SetAdminPWPage />} />

            </Routes>

          </BrowserRouter>


        </ThemeProvider>





        {/*<body style={styles.background}>
            <div style={{ zIndex: "0" }}>
              <img className="theredthing" src={theredthing} style={styles.theredthing}></img>
    </div> 
            <BrowserRouter>
              {
                // if login is true (for now), app bar with login buttons will show
                // if login is false, appbar only has login/signup button
              }

              {showAppBar ? <RoomsterAppBar login={showAppBarAdmin || showAppBarMain} userType={updatedUser}/> : <div style={{ height: '64px' }}></div>}
              <div style={{ textAlign: "center", zIndex: "3", position: "relative", marginBottom: "50px" }}>
                <Link href="/Home">
                  <img className="logo" src={logo} style={styles.logo}></img>
                </Link>
              </div>
              
              <ToastContainer />
              <Routes>
                <Route path="/" element={<MainPage login={isAuthenticated} />} />
                <Route path="/Home" element={<MainPage login={isAuthenticated} />} />
                <Route path="/RProfile" element={<RenterPage />} />
                <Route path="/MProfile" element={<PropertyManagerPage />} />
                <Route path="/FavCoops" element={<FavCoopsPage login={isAuthenticated} />} />
                <Route path="/MyCoops" element={<MyCoopsPage login={isAuthenticated} />} />
                <Route path="/MyTours" element={<MyToursPage login={isAuthenticated} />} />
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
                <Route path="/Admin/Featured" element={<AdminFeaturePage />} />
                <Route path="/Admin/FeaturedManage" element={<AdminFeatureManagePage />} />
                <Route path="/ResetPW/:token" element={<ResetPWPage />} />
                <Route path="/SetAdminPW/:token" element={<SetAdminPWPage />} />
                <Route path="/Property/:token" element={<MainPage login={isAuthenticated}  />} />
                <Route path="/Admin/Users" element={<AdminUserPage />} />
              </Routes>
              </Layout>
            </BrowserRouter>
          
            */}

      </HelmetProvider >
    );
  }
}

export default App;
