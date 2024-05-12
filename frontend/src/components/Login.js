import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import ButterToast, { Cinnamon } from "butter-toast";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { useHistory } from "react-router-dom";

function Login() {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const inputRef = React.useRef();

  useEffect(async () => {
    if (localStorage.getItem("user_session")) {

    }
  }, []);

  const setEmailForm = (e) => {
    setEmail(e.target.value);
  };

  const setPasswordForm = (e) => {
    setPassword(e.target.value);
  };

  const onClear = () => {
    setEmail("");
    setPassword("");
    inputRef.current.focus();
  };

  const validation = () => {
    var Error = false;

    if (email === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="Email Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
          />
        ),
      });
      Error = true;
    }

    if (password === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="Password Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
          />
        ),
      });
      Error = true;
    }

    if (Error) {
      return false;
    }

    return true;
  };

  const Form_Sub_Fun = async (e) => {
    e.preventDefault();

    if (validation()) {
      const url = "http://localhost:8001/User/login";
      const data = JSON.stringify({
        email: email,
        password: password,
      });
      console.log(data);
      await axios
        .post(url, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(async (res) => {
          console.log(res.data);
          if (res.data.err !== "User not found") {
            if (res.data.err === "Access Deny!") {
              ButterToast.raise({
                content: (
                  <Cinnamon.Crisp
                    title="Validation Error!"
                    content="Access Deny!"
                    scheme={Cinnamon.Crisp.SCHEME_RED}
                    icon={<ErrorOutlineIcon />}
                  />
                ),
              });
            } else if (res.data.err === "Incorrect Password") {
              ButterToast.raise({
                content: (
                  <Cinnamon.Crisp
                    title="Validation Error!"
                    content="Incorrect Password!"
                    scheme={Cinnamon.Crisp.SCHEME_RED}
                    icon={<ErrorOutlineIcon />}
                  />
                ),
              });
            } else {
              onClear();
              ButterToast.raise({
                content: (
                  <Cinnamon.Crisp
                    title="Success!"
                    content="Login Successful!"
                    scheme={Cinnamon.Crisp.SCHEME_GREEN}
                    icon={<CheckCircleOutlineIcon />}
                  />
                ),
              });
              localStorage.setItem("email", res.data.email);
              localStorage.setItem("type", res.data.res);
              localStorage.setItem("id", res.data.id);
              localStorage.setItem("user_session", true);
              if (res.data.res === "admin") {
                history.push("/admin");
              } else if (res.data.res === "instructor") {
                history.push("/instructor");
              } else {
                history.push("/student");
              }
            }
          } else {
            ButterToast.raise({
              content: (
                <Cinnamon.Crisp
                  title="Validation Error!"
                  content="User not found!"
                  scheme={Cinnamon.Crisp.SCHEME_RED}
                  icon={<ErrorOutlineIcon />}
                />
              ),
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <div className="App">
      <br />
      <Grid>
        <Card
          style={{
            maxWidth: 30 + "%",
            padding: "20px 5px",
            margin: "0 auto",
            boxShadow: "0 10px 6px rgba(0, 0, 0, 0.16)",
          }}
        >
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              style={{ fontFamily: "Arial", fontSize: "34px" }}
            >
              Login
            </Typography>
            <br />
            <form autoComplete="off" onSubmit={Form_Sub_Fun}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    type="email"
                    placeholder="Email"
                    inputRef={inputRef}
                    autoFocus
                    label="Email"
                    variant="standard"
                    name="email"
                    value={email}
                    onChange={setEmailForm}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    placeholder="Password"
                    inputRef={inputRef}
                    label="Password"
                    variant="standard"
                    name="password"
                    value={password}
                    onChange={setPasswordForm}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ backgroundColor: '#2196f3', color: '#FFFFFF' }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <br />
    </div>
  );
}

export default Login;
