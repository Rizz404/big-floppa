import {
  AppBar,
  Box,
  Button,
  Icon,
  SxProps,
  Theme,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { FaCat } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import AuthModal from "./AuthModal";
import useAuth from "../hooks/useAuth";
import { useLogout } from "../hooks/authHooks";

const toolbarStyles: SxProps<Theme> = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const leftNavStyles: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  color: "inherit",
  textDecoration: "none",
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { mutate, isPending, isSuccess } = useLogout();

  const handleLogout = () => {
    mutate();
    if (isSuccess) {
      setOpen(true);
    }
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "gray" }}>
        {/* Intinya si toolbar ini berfungsi ngasih padding dan margin otmatis ke app bar atau drawer */}
        <Toolbar sx={toolbarStyles}>
          <Box sx={leftNavStyles} component={NavLink} to="/">
            <Icon color="inherit">
              <FaCat />
            </Icon>
            <Typography variant="h6">Big Floppa</Typography>
          </Box>
          <Box>
            {!user ? (
              <Button
                variant="contained"
                color="info"
                onClick={() => setOpen((prev) => !prev)}
              >
                Login
              </Button>
            ) : (
              <Button
                variant="contained"
                color="error"
                onClick={handleLogout}
                disabled={isPending}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <AuthModal open={open} handleClose={() => setOpen(false)} />
    </>
  );
};

export default Navbar;
