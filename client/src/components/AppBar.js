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

const pages = ["Home", "My Coops", "Fav Coops", "Coopmates", "Log Out"];
const pagesManager = ["Home", "My Coops", "Log Out"];
const pagesRenter = ["Home", "Fav Coops", "Coopmates", "Log Out"];

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


          if(window.location.pathname !== "/Admin"){
            logout();
          } else {
            logoutAdmin();
          }
      };

      return (
        <AppBar
            position="static"
            style={{ boxShadow: "none", height: "30px", zIndex: "5"}}
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
                             {userType === "renter" ? pagesRenter.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            )): pagesManager.map((page) => (
                              <MenuItem key={page} onClick={handleCloseNavMenu}>
                                  <Typography textAlign="center">{page}</Typography>
                              </MenuItem>
                          ))}
                        </Menu>
                    </Box>
                    { login === true ? 
                    <IconButton sx={{zIndex:"5"}}
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
                        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex", zIndex: 5} }}>
                            {userType === "renter" ? pagesRenter.map((page, i) => {
                                return (
                                    <Button
                                        key={page}
                                        onClick={() => {
                                            if (page === "Home") {
                                                navigate("/Home")
                                            } else if (page === "Fav Coops") {
                                                navigate("/FavCoops")
                                            } else if (page === "Coopmates") {
                                                navigate("/Coopmates")
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
                                            color: "secondaryColor",
                                            backgroundColor: "primaryColor",
                                            display: "block",
                                            mx: .5,
                                            fontWeight: 600,
                                            padding: 1,
                                            boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, .1)"
                                        }}
                                    >
                                        {page}
                                    </Button>
                                );
                            }) : pagesManager.map((page, i) => {
                              return (
                                  <Button
                                      key={page}
                                      onClick={() => {
                                          if (page === "Home") {
                                              navigate("/Home")
                                          } else if (page == "My Coops") {
                                              navigate("/MyCoops")
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
                                          mx: .5,
                                          fontWeight: 600,
                                          padding: 1,
                                          boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, .1)"
                                      }}
                                  >
                                      {page}
                                  </Button>
                              );
                          })}
                            
                        </Box>
                        </Grow>
                        :
                        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
                    }
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
                    
                    {login ?
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open Profile" sx={{ color: 'secondaryColor' }}  onClick={() => {userType === "renter" ? navigate("/RProfile") : navigate("/MProfile")}}> 
                <IconButton sx={{ p: 0, mr: 1, ml: 1, zIndex: "5"}}>
                  <Avatar alt="chickenpfp" src={chicken} style={{ transform: `scale(1.70, 1.70)` }} />
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
        </AppBar>
    );
    
}
export default RoomsterAppBar;
