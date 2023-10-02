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

const pages = ["Home", "Fav Coops", "Coopmates", "Log Out"];

/* 
 * RoomsterAppBar
 * login: boolean variable for now, keeps track if user is logged in or not
 */
const RoomsterAppBar = ({ login }) => {
    console.log(login)
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
                            <MenuIcon sx={{ color: "#AB191F" }} />
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
                    {login === true ?
                        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                            {pages.map((page) => {
                                return (
                                    <Button
                                        key={page}
                                        onClick={handleCloseNavMenu}
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
                        :
                        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        </Box>

                    }
                    {login ?
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open Profile" sx={{ color: "#AB191F" }}>
                                <IconButton sx={{ p: 0 }} >
                                    <Avatar alt="chickenpfp" src={chicken} style={{ transform: `scale(1.70, 1.70)` }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        :
                        <Button
                            onClick={handleCloseNavMenu}
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
                            Login/Signup
                        </Button>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default RoomsterAppBar;
