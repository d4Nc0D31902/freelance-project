import React, { Fragment, useState, useEffect } from "react";
import {
  Link as RouterLink,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import MetaData from "../layout/MetaData";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../../actions/userActions";
import {
  Avatar,
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Divider,
  Stack,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [image, setImage] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("image", image);

    dispatch(register(formData));
  };

  const onChange = (e) => {
    if (e.target.name === "image") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setImage(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <Fragment>
      <MetaData title={"Register User"} />
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
          <Typography variant="h3" gutterBottom textAlign={"center"}>
            Register
          </Typography>

          <TextField
            fullWidth
            variant="outlined"
            label="Name"
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            sx={{ marginBottom: "10px" }}
            required
          />

          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            sx={{ marginBottom: "10px" }}
            required
          />

          <TextField
            fullWidth
            variant="outlined"
            label="Password"
            type="password"
            name="password"
            value={password}
            sx={{ marginBottom: "10px" }}
            onChange={onChange}
            required
          />

          <Box
            sx={{
              marginTop: "10px",
              marginBottom: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                alt="Avatar Preview"
                src={avatarPreview}
                sx={{ width: 100, height: 100, mr: 2 }}
              />
              <Button
                variant="contained"
                component="label"
                startIcon={<CameraAltIcon />}
              >
                Upload Image
                <input
                  type="file"
                  name="image"
                  accept="images/*"
                  onChange={onChange}
                  hidden
                />
              </Button>
            </Box>
          </Box>

          <Button
            variant="contained"
            fullWidth
            id="register_button"
            type="submit"
            disabled={loading ? true : false}
          >
            Register
          </Button>

          <Box sx={{ display: "flex", mt: 2, justifyContent: "center", mb: 2 }}>
            <Typography>Already have an account?</Typography>
            <Link to="/login" sx={{ ml: "2px" }}>
              Login
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
  );
};

export default Register;
