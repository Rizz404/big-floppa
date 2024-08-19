import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  SxProps,
  Theme,
} from "@mui/material";
import { NavLink } from "react-router-dom";

const NAV_LINKS = [
  "Users",
  "Cat",
  "Breeds",
  "Payments",
  "Shippings",
  "Orders",
  "Transactions",
];

const drawerStyles: SxProps<Theme> = {
  [`& .MuiDrawer-paper`]: {
    width: 256,
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  },
};

const toolbarStyles: SxProps<Theme> = {
  color: "inherit",
  textDecoration: "none",
};

const listItemButtonStyles: SxProps<Theme> = {
  "&.active": {
    backgroundColor: "primary.main",
    color: "white",
  },
};

const SidebarAdmin = () => {
  return (
    <Drawer variant="permanent" sx={drawerStyles}>
      <Box>
        <Toolbar sx={toolbarStyles} component={NavLink} to="/admin">
          <Typography variant="h6">Logo Web</Typography>
        </Toolbar>
      </Box>
      <List>
        {NAV_LINKS.map((item, index) => (
          <ListItemButton
            key={index}
            component={NavLink}
            to={item.toLowerCase()}
            sx={listItemButtonStyles}
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
  );
};

export default SidebarAdmin;
