import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { Box, Button, TextField, Typography, styled } from "@mui/material";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";

const Container = styled(Box)`
  padding: 100px;
  background-image: url("login-background-4.jpeg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 41% 96%;
  display: flex;
  margin: auto;
`;

const Component = styled(Box)`
  width: 400px;
  margin: auto;
`;

const Image = styled("img")({
  width: 300,
  display: "flex",
  margin: "auto",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;

  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #000;
  height: 48px;
  box-shadow: 2px 2px 4px 2px rgb(0 0 0/ 20%);
  &:hover {
    background: #101010;
  }
`;

const SignupButton = styled(Button)`
  text-transform: none;
  color: #000;
  height: 48px;
  box-shadow: 2px 2px 4px 2px rgb(0 0 0/ 20%);
  &:hover {
    background: #f0dbb3;
  }
`;

const Text = styled(Typography)`
  color: #878787;
`;

const Error = styled(Typography)``;

const loginInitialValues = {
  username: "",
  password: "",
};

const signupInitialValues = {
  name: "",
  username: "",
  password: "",
};

const Login = ({ isUserAuthenticated }) => {
  const [login, setLogin] = useState(loginInitialValues);
  const [signup, setSignup] = useState(signupInitialValues);
  const [error, setError] = useState("");
  const [account, toggleAccount] = useState("login");

  const navigate = useNavigate();
  const { setAccount } = useContext(DataContext);

  const imageURL =
    "https://i.ibb.co/7SPyPsT/sherlock-holmes-high-resolution-logo-transparent.png";

  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const signupUser = async () => {
    let response = await API.userSignup(signup);
    if (response.isSuccess) {
      setError("");
      setSignup(signupInitialValues);
      toggleAccount("login");
    } else {
      setError("Something went wrong.");
    }
  };

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    let response = await API.userLogin(login);

    console.log(response);
    if (response.isSuccess) {
      setError("");
      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );
      localStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      localStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );

      setAccount({
        name: response.data.name,
        username: response.data.username,
      });

      isUserAuthenticated(true);
      setLogin(loginInitialValues);

      navigate("/");
    } else {
      setError("Something went wrong! Please try again later");
      setLogin(loginInitialValues);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("accessToken")) {
      isUserAuthenticated(true);
      setLogin(loginInitialValues);
      navigate("/");
    }
  }, []);

  return (
    <>
      <Container>
        <Component>
          <Box>
            <Image
              src={imageURL}
              alt="sherlock-holmes-high-resolution-logo-transparent"
              border="0"
            />
            {account === "login" ? (
              <Wrapper>
                <TextField
                  label="Enter username"
                  onChange={(e) => onValueChange(e)}
                  name="username"
                  value={login.username}
                  variant="standard"
                  sx={{
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: "#000",
                    },
                    "&  .css-1eed5fa-MuiInputBase-root-MuiInput-root": {
                      "&::after": {
                        borderBottom: "#000",
                      },
                    },
                  }}
                />
                <TextField
                  label="Enter password"
                  onChange={(e) => onValueChange(e)}
                  name="password"
                  value={login.password}
                  variant="standard"
                  sx={{
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: "#000",
                    },
                    "& .css-1eed5fa-MuiInputBase-root-MuiInput-root": {
                      "&::after": {
                        borderBottom: "#000",
                      },
                    },
                  }}
                />
                {error && <Error>{error}</Error>}
                <LoginButton variant="contained" onClick={() => loginUser()}>
                  Login
                </LoginButton>
                <Text style={{ textAlign: "center" }}>OR</Text>
                <SignupButton onClick={() => toggleSignup()}>
                  Create an account
                </SignupButton>
              </Wrapper>
            ) : (
              <Wrapper>
                <TextField
                  label="Enter Name"
                  onChange={(e) => onInputChange(e)}
                  variant="standard"
                  name="name"
                  sx={{
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: "#000",
                    },
                    "& .css-1eed5fa-MuiInputBase-root-MuiInput-root": {
                      "&::after": {
                        borderBottom: "#000",
                      },
                    },
                  }}
                />
                <TextField
                  label="Enter Username"
                  onChange={(e) => onInputChange(e)}
                  variant="standard"
                  name="username"
                  sx={{
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: "#000",
                    },
                    "& .css-1eed5fa-MuiInputBase-root-MuiInput-root": {
                      "&::after": {
                        borderBottom: "#000",
                      },
                    },
                  }}
                />
                <TextField
                  label="Enter Password"
                  onChange={(e) => onInputChange(e)}
                  variant="standard"
                  name="password"
                  sx={{
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: "#000",
                    },
                    "& .css-1eed5fa-MuiInputBase-root-MuiInput-root": {
                      "&::after": {
                        borderBottom: "#000",
                      },
                    },
                  }}
                />
                {error && <Error>{error}</Error>}

                <SignupButton onClick={() => signupUser()}>Signup</SignupButton>
                <Text style={{ textAlign: "center" }}>OR</Text>
                <LoginButton variant="contained" onClick={() => toggleSignup()}>
                  Already have an account
                </LoginButton>
              </Wrapper>
            )}
          </Box>
        </Component>
      </Container>
    </>
  );
};

export default Login;
