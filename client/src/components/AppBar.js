import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import chicken from "../images/profile-pic.png"
import LoginView from "./LoginView";
import { useNavigate, useLocation } from "react-router-dom";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useTheme } from '@mui/material/styles';
import { Grow } from "@mui/material";
import Settings from "../pages/Settings"
import { createTheme, ThemeProvider } from '@mui/material/styles';

const pagesManager = ["Home", "My Coops", "Tour Requests", "Log Out"];
const pagesRenter = ["Home", "Fav Coops", "Coopmates", "My Tours", "Log Out"];
const pagesAdmin = ["Unverified Properties", "Property Feature Requests", "Featured Properties", "Users", "Log Out"]

//const routePage = ["/Home", "/FavCoops", "/Coopmates", "/Logout"]

/* 
 * RoomsterAppBar
 * login: boolean variable for now, keeps track if user is logged in or not
 */
const RoomsterAppBar = ({ login, userType }) => {
  const theme = useTheme();

  console.log(login)
  let location = useLocation();
  console.log(location.pathname)
  let navigate = useNavigate();
  /*
   * TODO: 
   * hide the login stuff with a "Log In/ Sign Up Button"
   */
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [pfp, setPfp] = React.useState('')
  const [findingCoopmates, setFindingCoopmates] = React.useState(false)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const [isToolbarVisible, setIsToolbarVisible] = React.useState(true);

  const toggleToolbarVisibility = () => {
    setIsToolbarVisible(!isToolbarVisible);
  };

  const [settingsOpen, setSettingsOpen] = React.useState(false);

  const handleCloseSettings = () => {
    setSettingsOpen(false);
  };

  const handleLogout = async () => {
    const logout = async () => {
      try {
        const response = await fetch('http://localhost:8000/auth/logout', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          console.log('Logout successful');
          window.location.href = 'http://localhost:3001/Home';
        } else {
          console.log('Logout failed');
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };


    const logoutAdmin = async () => {
      try {
        const response = await fetch('http://localhost:8000/auth/logout-admin', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          console.log('Logout successful');
          window.location.href = 'http://localhost:3001/Admin';
        } else {
          console.log('Logout failed');
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };


    if (!window.location.pathname.startsWith("/Admin")) {
      logout();
    } else {
      logoutAdmin();
    }
  };

  React.useEffect(() => {
    const getPFP = async () => {
      try {
        const res = await fetch('http://localhost:8000/auth/current-user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });

        const getData = await res.json();

        const obj = JSON.parse(JSON.stringify(getData));
        console.log(obj.user)
        if (obj.user.renterInfo) {
          setPfp(obj.user.renterInfo.pfp)
          setFindingCoopmates(obj.user.findingCoopmates)
        }

      } catch (e) {
        console.log("error: " + e)

      }
    };

    getPFP();
  }, []);

  return (
    <AppBar
      position="static"
      style={{ boxShadow: "none", height: "30px", zIndex: "5" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ zIndex: "5", flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              backgroundColor="secondaryColor"
            >
              <MenuIcon sx={{ color: "primaryColor" }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" }
              }}
            >
              {userType === "renter" ? (
                pagesRenter.map((renterPage) => (
                  <MenuItem key={renterPage} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{renterPage}</Typography>
                  </MenuItem>
                ))
              ) : userType === "manager" ? (
                pagesManager.map((managerPage) => (
                  <MenuItem key={managerPage} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{managerPage}</Typography>
                  </MenuItem>
                ))
              ) : (
                pagesAdmin.map((adminPage) => (
                  <MenuItem key={adminPage} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{adminPage}</Typography>
                  </MenuItem>
                ))
              )}
            </Menu>
          </Box>
          {login === true ?
            <IconButton sx={{ zIndex: "5" }}
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleToolbarVisibility}
              backgroundColor="secondaryColor"
            >
              <DoubleArrowIcon sx={{ color: "primaryColor" }} />
            </IconButton>
            :
            ''
          }
          {login === true ?
            <Grow orientation="horizontal" in={!isToolbarVisible}>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex", zIndex: 5 } }}>
                {userType === "renter" ? (
                  pagesRenter.map((page, i) => (
                    <Button
                      key={page}
                      disabled={page === "Coopmates" && !findingCoopmates}
                      onClick={() => {
                        if (page === "Home") {
                          navigate("/Home");
                        } else if (page === "Fav Coops") {
                          navigate("/FavCoops");
                        } else if (page === "Coopmates") {
                          navigate("/Coopmates");
                        } else if (page === "My Tours") {
                          navigate("/MyTours")
                          //} else if (page === "My Coopmates") {
                          //  navigate("/MyCoopmates")
                        } else if (page === "Log Out") {
                          handleLogout();
                        }
                        handleCloseNavMenu();
                      }}
                      sx={{
                        my: 2,
                        ":hover": {
                          bgcolor: "secondaryColor",
                          color: "primaryColor",
                          cursor: "pointer"
                        },
                        "&.Mui-disabled": {
                          display: "none",
                        },
                        color: "secondaryColor",
                        backgroundColor: "primaryColor",
                        display: "block",
                        mx: 0.5,
                        fontWeight: 600,
                        padding: 1,
                        boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, .1)"
                      }}
                    >
                      {page}
                    </Button>
                  ))
                ) : userType === "manager" ? (
                  pagesManager.map((page, i) => (
                    <Button
                      key={page}
                      onClick={() => {
                        if (page === "Home") {
                          navigate("/Home");
                        } else if (page === "My Coops") {
                          navigate("/MyCoops");
                        } else if (page == "Tour Requests") {
                          navigate("/TourRequests")
                        } else if (page === "Log Out") {
                          handleLogout();
                        }
                        handleCloseNavMenu();
                      }}
                      sx={{
                        my: 2,
                        ":hover": {
                          bgcolor: "secondaryColor",
                          color: "primaryColor",
                          cursor: "pointer"
                        },
                        color: "secondaryColor",
                        backgroundColor: "primaryColor",
                        display: "block",
                        mx: 0.5,
                        fontWeight: 600,
                        padding: 1,
                        boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, .1)"
                      }}
                    >
                      {page}
                    </Button>
                  ))
                ) : (
                  pagesAdmin.map((adminPage, i) => (
                    < Button
                      key={adminPage}
                      onClick={() => {
                        if (adminPage === "Unverified Properties") {
                          navigate("/Admin");
                        } else if (adminPage === "Property Feature Requests") {
                          navigate("/Admin/Featured");
                        } else if (adminPage === "Log Out") {
                          handleLogout();
                        } else if (adminPage === "Featured Properties") {
                          navigate("/Admin/FeaturedManage");
                        } else if (adminPage === "Users") {
                          navigate("/Admin/Users");
                        }
                        handleCloseNavMenu();
                      }}
                      sx={{
                        my: 2,
                        ":hover": {
                          bgcolor: "#AB191F",
                          color: "#f5ebe0",
                          cursor: "pointer"
                        },
                        color: "#AB191F",
                        backgroundColor: "#F6EBE1",
                        display: "block",
                        mx: 0.5,
                        fontWeight: 600,
                        padding: 1,
                        boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, .1)"
                      }}
                    >
                      {adminPage}
                    </Button>
                  ))
                )}


              </Box>
            </Grow>
            :
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          }
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          {login ?
            <Box sx={{ flexGrow: 0 }}>

              <Tooltip title="Open Profile" sx={{ color: 'secondaryColor' }} onClick={() => { userType === "renter" ? navigate("/RProfile") : navigate("/MProfile") }}>
                <IconButton sx={{ p: 0, mr: 1, ml: 1, zIndex: "5" }}>
                  <Avatar alt="chickenpfp" src={pfp === undefined || pfp === '' ? chicken : pfp} style={{ transform: `scale(1.70, 1.70)` }} />

                </IconButton>
              </Tooltip>
            </Box>
            :
            <LoginView text={"Login/Signup"} />
          }

          {login && (
            <Settings open={settingsOpen} handleClose={handleCloseSettings} />
          )}
        </Toolbar>
      </Container>
    </AppBar >
  );

}
export default RoomsterAppBar;
