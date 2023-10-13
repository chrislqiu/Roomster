import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import theredthing from '../images/theredthing.png';
import logo from '../images/logo.png';

const styles = {
  background: {
    // position: "absolute",
    margin: "0",
    padding: "0",
    backgroundColor: "#f5ebe0",
    zIndex: "-1",
    height: "100vh",
    width: "100vw"
  },
  logo: {
    margin: "-30px",
    width: '35%',
    zIndex: "0",
  },
  theredthing: {
    position: "absolute",
    width: "100%",
  },
  message: {
    textAlign: "center",
    marginTop: "50px",
    fontSize: "24px",
  },
  link: {
    display: "block",
    textAlign: "center",
    fontSize: "18px",
    marginTop: "20px",
    color: "#AB191F",  
  },
  button: {
    backgroundColor: "#AB191F"
  }
};

const theme = createTheme({
  palette: {
    background: {
      default: "#F6EBE1",
    },
  },
});

class VerifyPage extends React.Component {
  render() {
    return (
      <body style={styles.background}>
        <div style={styles.message}>
          Thank you for verifying your account!
        </div>

        <Link to="http://localhost:3001/Home" style={styles.link}>
        <Button variant="contained" style={styles.button}>
            Go Home
          </Button>
        </Link>
      </body>
    );
  }
}

export default VerifyPage;
