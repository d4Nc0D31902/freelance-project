import React from "react";
import Search from "./Search";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Box,
  Avatar,
  ListItemIcon,
  ListItemText,
  Divider,
  Stack,
  Badge,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import ReceiptIcon from "@mui/icons-material/Receipt";

import "../../App.css";

const Header = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    dispatch(logout());
    handleClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Stack
          direction={"row"}
          spacing={2}
          alignContent={"center"}
          alignItems={"center"}
        >
          <Box>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Logo
            </Link>
          </Box>
        </Stack>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton sx={{ color: "white" }}>
          <Link to="/content">
            <DashboardCustomizeIcon />
          </Link>
        </IconButton>
        {user ? (
          <div>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar
                alt={user.name}
                sx={{ marginRight: "5px" }}
                src={
                  user.image && user.image.url
                    ? user.image.url
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.name
                      )}`
                }
              />

              <Typography>{user && user.name}</Typography>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {user && user.role === "admin" && (
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to="/dashboard"
                >
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </MenuItem>
              )}
              <MenuItem onClick={handleClose} component={Link} to="/orders/me">
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Orders" />
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/me">
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </MenuItem>
              <Divider />
              <MenuItem onClick={logoutHandler} sx={{ color: "red" }}>
                <ListItemIcon>
                  <LogoutIcon sx={{ color: "red" }} />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </MenuItem>
            </Menu>
          </div>
        ) : (
          !loading && (
            <Button
              color="inherit"
              variant="outlined"
              sx={{ borderRadius: "50px" }}
            >
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "white" }}
              >
                Login
              </Link>
            </Button>
          )
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
