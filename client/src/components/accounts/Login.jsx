import React, { useEffect } from "react";
import { useState, useContext } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  dialogActionsClasses,
  styled,
} from "@mui/material";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";

const Container = styled(Box)`
  min-height: 100vh;
  width: 100%;
  background: url("loginpage5.jpg");
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Component = styled(Box)`
  height: 500px;
  width: 400px;
  background-color: rgba(225, 225, 225, 0.1);
  border: 1px solid #101010;
  border-radius: 12px;
  backdrop-filter: blur(5px);
`;

const Details = styled(Box)`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  padding: 4%;
`;

const Image = styled("img")({
  width: 300,
  display: "flex",
  margin: "auto",
});

const Wrapper = styled(Box)`
  padding: 15px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;

  & > div,
  & > button,
  & > p {
    margin-top: 15px;
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
    if (localStorage.getItem("accessToken")) {
      isUserAuthenticated(true);
      setLogin(loginInitialValues);
      navigate("/");
    }
  }, []);

  return (
    <>
      <Container>
        <Component>
          <Details>
            <Image
              src={imageURL}
              alt="sherlock-holmes-high-resolution-logo-transparent"
              border="0"
            />
            {account === "login" ? (
              <Wrapper className="loginPage">
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
              <Wrapper className="signUpPage">
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
          </Details>
        </Component>
      </Container>
    </>
  );
};

export default Login;
