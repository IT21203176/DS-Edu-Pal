import React from "react";
import "../App.css";
import { Grid, Button, Typography } from "@material-ui/core";

function Student() {

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  }

  return (
    <div className="App">
      <br />

      <div style={{ maxWidth: 80 + '%', padding: "20px 5px", margin: "0 auto", align: "center", marginLeft: 15 + '%' }}>

        <Typography gutterBottom variant="h3" align="center">
          Student Dashboard
        </Typography>

        <Grid item xs={12}>
          <Button href="/courselist"
            type="submit"
            variant="contained"
            style={{ backgroundColor: '#2196f3', color: '#FFFFFF', width: '50%' }}>
            Find Course
          </Button>
        </Grid>
        <br />
        <Grid item xs={12}>
          <Button href="/myCourse"
            type="submit"
            variant="contained"
            style={{ backgroundColor: '#2196f3', color: '#FFFFFF', width: '50%' }}>
            My Enroll Course
          </Button>
        </Grid>
        <br />
        <Grid item xs={12}>
          <Button href="/paymentCourseList"
            type="submit"
            variant="contained"
            style={{ backgroundColor: '#2196f3', color: '#FFFFFF', width: '50%' }}>
            Payment Gateway Enrollment
          </Button>
        </Grid>
        <br />
        <Grid item xs={12}>
          <Button
            onClick={() => logout()}
            variant="contained"
            style={{ backgroundColor: '#ff5722', color: '#FFFFFF', width: '40%' }}
          >
            Logout
          </Button>
        </Grid>

      </div>

      <br />
    </div>
  );
}

export default Student;
