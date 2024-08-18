import {
  Grid,
  Drawer,
  List,
  ListItemText,
  Toolbar,
  Container,
  Typography,
  ListItemButton,
  Box,
} from "@mui/material";
import Header from "../Header";
import { Outlet, NavLink } from "react-router-dom";

const drawerWidth = 240;
const NAV_LINKS = [
  "Users",
  "Cat",
  "Breeds",
  "Payments",
  "Shippings",
  "Orders",
  "Transactions",
];

const AdminLayout = () => {
  return (
    <Grid container>
      {/* Sidebar */}
      <Grid
        item
        xs={12}
        sm={3}
        md={2}
        sx={{
          width: { sm: drawerWidth }, // Mengatur lebar sidebar untuk layar kecil hingga besar
        }}
      >
        <Drawer
          variant="permanent"
          sx={{
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            },
          }}
        >
          <Box>
            <Toolbar
              sx={{ color: "inherit", textDecoration: "none" }}
              component={NavLink}
              to="/admin"
            >
              <Typography variant="h6">Logo Web</Typography>
            </Toolbar>
          </Box>
          <List>
            {NAV_LINKS.map((item, index) => (
              // * Cara pakai component lain begini tapi kaga ada autocomplete
              <ListItemButton
                key={index}
                component={NavLink}
                to={item.toLowerCase()}
                sx={{
                  "&.active": {
                    backgroundColor: "primary.main",
                    color: "white",
                  },
                }}
              >
                <ListItemText primary={item} />
              </ListItemButton>
            ))}
          </List>
          <Box>
            <List>
              <ListItemButton component={NavLink} to="/logout">
                <ListItemText primary="Logout" />
              </ListItemButton>
            </List>
          </Box>
        </Drawer>
      </Grid>

      {/* Main Content */}
      <Grid item xs={12} sm={9} md={10} component="main" sx={{ p: 4 }}>
        {/* Navbar */}
        <Header />
        <Toolbar />
        <Container>
          <Outlet />
        </Container>
      </Grid>
    </Grid>
  );
};

export default AdminLayout;
