import React, { useState, useEffect, Fragment } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login, clearErrors } from "../../actions/userActions";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
  Divider,
  Stack,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  const redirect = new URLSearchParams(location.search).get("redirect");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, navigate, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Login"} />
          <Container maxWidth="sm" sx={{ height: "100vh" }}>
            <Box
              component="form"
              onSubmit={submitHandler}
              sx={{
                boxShadow: 3,
                p: 4,
                borderRadius: "20px",
                backgroundColor: "#fff",
                mt: 3,
              }}
            >
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                textAlign={"center"}
              >
                Login
              </Typography>

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email_field"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password_field"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Link
                component={RouterLink}
                to="/password/forgot"
                sx={{
                  display: "block",
                  textAlign: "center",
                  textDecoration: "none",
                }}
              >
                Forgot Password?
              </Link>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Login
              </Button>

              <Box
                sx={{ display: "flex", mt: 2, justifyContent: "center", mb: 2 }}
              >
                <Typography>Don't have an account?</Typography>
                <Link
                  component={RouterLink}
                  to="/register"
                  sx={{ ml: "2px", textDecoration: "none" }}
                >
                  Signup
                </Link>
              </Box>
              <Divider sx={{ mb: "5px" }}>Or</Divider>

              <Stack gap={2}>
                <Button
                  variant="contained"
                  startIcon={<GoogleIcon />}
                  sx={{
                    margin: "2px",
                    backgroundColor: "white",
                    color: "black",
                  }}
                >
                  Sign In with Google
                </Button>
                <Button
                  variant="contained"
                  startIcon={<FacebookIcon />}
                  sx={{ margin: "2px" }}
                >
                  Sign In with Facebook
                </Button>
              </Stack>
            </Box>
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
