import React, { useState, useEffect } from "react"
import "../App.css"
import { Grid, Button, Card, CardContent, Typography } from '@material-ui/core'

function Instructor() {

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  }

  return (
    <div className="App">
      <br />
      <Typography gutterBottom variant="h3" align="center">
        Instructor Dashboard
      </Typography>
      <Grid>
        <Card style={{ maxWidth: 50 + '%', padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              Instructor
            </Typography>
            <br />
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <Button href="/course"
                  type="submit"
                  variant="contained"
                  style={{ backgroundColor: '#2196f3', color: '#FFFFFF', width: '50%' }}>Add New Course</Button>
              </Grid>

              <Grid item xs={12}>
                <Button href="/allcourse"
                  type="submit"
                  variant="contained"
                  style={{ backgroundColor: '#2196f3', color: '#FFFFFF', width: '50%' }}>Course Manage</Button>
              </Grid>

              <Grid item xs={12}>
                <Button
                  onClick={() => logout()}
                  variant="contained"
                  style={{ backgroundColor: '#ff5722', color: '#FFFFFF', width: '40%' }}
                >
                  Logout
                </Button>
              </Grid>

            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <br />
    </div>
  );
}

export default Instructor;