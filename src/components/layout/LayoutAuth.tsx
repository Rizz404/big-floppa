import { Container } from "@mui/material";
import Navbar from "../Navbar";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const LayoutAuth = () => {
  const { user, token } = useAuth();

  return user && token ? (
    <>
      <Navbar />
      <Container component="main">
        <Outlet />
      </Container>
    </>
  ) : (
    <Navigate to="/" />
  );
};
export default LayoutAuth;
