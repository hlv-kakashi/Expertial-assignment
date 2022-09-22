
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Stack, TextField, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { margin } from "@mui/system";
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [isSignup, setisSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogout = (e) => {
    localStorage.clear();
    window.location.reload();
  };

  const handlsignin = (e) => {
    e.preventDefault();
    setisSignup(!isSignup);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup) {
      let res = await axios.post(
        "https://education-board-app.herokuapp.com/signup",
        formData
      );

      if (res.data.message == "User Created Successfully") {
        alert("User Created Successfully");
        setisSignup(false);
      } else {
        alert(res.data.message);
      }
    } else {
      let res = await axios.post(
        "https://education-board-app.herokuapp.com/login",
        formData
      );
      alert(res.data.message);
      console.log(res.data);
      localStorage.setItem(
        "profile",
        JSON.stringify({
          name: res.data.result.name,
          id: res.data.result._id,
          token: res.data.token,
        })
      );
      if (res.data.message == "login Successful") {
        navigate("/jobs");
      } else {
        alert(res.data.message);
      }
    }
  };

  return (
    <Stack margin={10} spacing={5}>
      {JSON.parse(localStorage.getItem("profile"))?.token ? (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogout}
          style={{ marginTop: "100px" }}
        >
          Logout
        </Button>
      ) : (
        <>
          {isSignup ? (
            <Stack spacing={4} alignItems="center">
              <LockOpenIcon fontSize="large" />
              <Typography variant="h4">CREATE AN ACCOUNT</Typography>
            </Stack>
          ) : (
            <Stack spacing={4} alignItems="center">
              <LoginIcon fontSize="large" />
              <Typography variant="h4">LOG-IN</Typography>
            </Stack>
          )}

          <form action="" onSubmit={handleSubmit}>
            <Stack width={400} margin="auto" spacing={3} direction="column">
              {isSignup && (
                <>
                  <TextField
                    color="secondary"
                    variant="standard"
                    type="text"
                    name="firstName"
                    label="Enter the first Name"
                    onChange={handleChange}
                  />
                  <br />
                  <TextField
                    type="text"
                    variant="standard"
                    color="secondary"
                    name="lastName"
                    label="Enter the last Name"
                    onChange={handleChange}
                  />
                  <br />
                </>
              )}
              <TextField
                type="text"
                variant="standard"
                name="email"
                color="secondary"
                label="Enter the email"
                onChange={handleChange}
              />
              <br />
              <TextField
                type="password"
                variant="standard"
                name="password"
                color="secondary"
                label="Enter the password"
                onChange={handleChange}
              />
              <br />
              {isSignup && (
                <TextField
                  type="password"
                  variant="standard"
                  color="secondary"
                  name="confirmPassword"
                  label="Confirm pasword"
                  onChange={handleChange}
                />
              )}
              <br />
              <Button color='secondary' variant="contained" type="submit">
                {isSignup ? "signUp" : "signIn"}
              </Button>
              <br />
              <Button color='secondary' onClick={handlsignin}>
                {isSignup
                  ? "Already have an account? log-In"
                  : "don't have an account? Sign-up"}
              </Button>
            </Stack>
          </form>
        </>
      )}
    </Stack>
  );
};

export default Auth;