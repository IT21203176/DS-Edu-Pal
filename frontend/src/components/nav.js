import React from "react";
import "../App.css";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import lmsLogo from "./lms.png";
import "../css/nav.css";

class nav extends React.Component {
  Logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  dashboard = () => {
    if (localStorage.getItem("usertype") === "admin") {
      window.location.href = "/admin";
    } else {
      window.location.href = "/login";
    }
  };

  render() {
    if (localStorage.getItem("user_session") !== "true") {
      return (
        <Navbar
          className="navbar-custom bg-dark"
          expand="lg"
          style={{ paddingTop: "20px", marginBottom: "50px" }}
        >
          <Container>
            <Navbar.Brand href="/" className="d-flex align-items-center text-light">
              <div className="logo-container">
                <img
                  src={lmsLogo} // Insert your logo image source here
                  alt="Logo"
                  className="logo"
                />
              </div>
              Research LMS            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Nav.Link href="/login" className="text-light">Login</Nav.Link>
                <Nav.Link href="/register" className="text-light">Register</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    } else {
      return (
        <Navbar
          className="navbar-custom bg-dark"
          expand="lg"
          style={{ paddingTop: "20px", marginBottom: "50px" }}
        >
          <Container>
            <Navbar.Brand href="/" className="d-flex align-items-center text-light">
              <div className="logo-container">
                <img
                  src={lmsLogo} // Insert your logo image source here
                  alt="Logo"
                  className="logo"
                />
              </div>
              Research LMS            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Nav.Link onClick={() => this.dashboard()} className="text-light">Dashboard</Nav.Link>
                <Nav.Link onClick={() => this.Logout()} className="text-light">Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    }
  }
}

export default nav;
