import { Container, Grid, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "../SidebarAdmin";

const LayoutAdmin = () => {
  return (
    <Grid container>
      {/* Sidebar */}
      <Grid item xs={12} sm={3} md={2}>
        <SidebarAdmin />
      </Grid>

      {/* Main Content */}
      <Grid item xs={12} sm={9} md={10} sx={{ p: 4 }}>
        <Toolbar />
        <Container component="main">
          <Outlet />
        </Container>
      </Grid>
    </Grid>
  );
};

export default LayoutAdmin;
