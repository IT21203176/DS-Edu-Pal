import React from "react";
import "../App.css";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Box,
  Divider,
  TextField,
  Button,
  Link as MuiLink,
} from "@mui/material";

class Footer extends React.Component {
  render() {
    return (
      <Box
        style={{
          backgroundColor: "#343A40",
          color: "#fff",
          textAlign: "center",
          padding: "20px",
          bottom: "0",
          width: "100%",
        }}
      >
        <Container>
          <h1>Welcome to My Website</h1>
          <TextField
            variant="standard"
            placeholder="Search"
            style={{ marginRight: "10px", borderColor: "white" }}
          />

          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: '#2196f3', color: '#FFFFFF' }}
          >
            Search
          </Button>
        </Container>
        <Divider style={{ marginTop: "20px", backgroundColor: "#fff" }} />
        <Container>
          <Row>
            <Col md={6}>
              <p>&copy; 2024 My Website. All rights reserved.</p>
            </Col>
            <Col md={6}>
              <p className="text-end">Powered by React and Bootstrap</p>
            </Col>
          </Row>
        </Container>
      </Box>
    );
  }
}

export default Footer;
