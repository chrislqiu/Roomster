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
import { Grow } from "@mui/material";
import Settings from "../pages/Settings"

const pages = ["Home", "Fav Coops", "Coopmates", "Log Out"];
//const routePage = ["/Home", "/FavCoops", "/Coopmates", "/Logout"]

/* 
 * RoomsterAppBar
 * login: boolean variable for now, keeps track if user is logged in or not
 */
const RoomsterAppBar = ({ login }) => {
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

          logout();
      };

    return (
        <AppBar
            position="static"
            style={{ background: "transparent", boxShadow: "none" }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            backgroundColor="#AB191F"
                        >
                            <MenuIcon sx={{ color: "#F6EBE1" }} />
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
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    { login === true ? 
                    <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={toggleToolbarVisibility}
                            backgroundColor="#AB191F"
                        >
                            <DoubleArrowIcon sx={{ color: "#F6EBE1" }} />
                     </IconButton>
                     :
                     ''
                    }
                    {login === true ?
                        <Grow orientation="horizontal" in={!isToolbarVisible}>
                        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                            {pages.map((page, i) => {
                                return (
                                    <Button
                                        key={page}
                                        //onClick={() => navigate(`${routePage[i]}`)}
                                        onClick={() => {
                                            if (page === "Home") {
                                                navigate("/Home")
                                            } else if (page === "Fav Coops") {
                                                navigate("/FavCoops")
                                            } else if (page === "Coopmates") {
                                                //coopmates
                                            } else if (page === "Log Out") {
                                                handleLogout();
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
              <Tooltip title="Open Profile" sx={{ color: "#AB191F" }}>
                <IconButton sx={{ p: 0, mr: 1 }}>
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
