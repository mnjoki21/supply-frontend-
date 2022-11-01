import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SearchIcon from "@mui/icons-material/Search";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import GroupIcon from "@mui/icons-material/Group";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function Navbar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("http://localhost:3000/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#F5F5F5",
          color: "black",
        }}
        open={open}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              mr: 2,
              ...(open && {
                display: "none",
              }),
            }}
          >
            <MenuIcon />
          </IconButton>
          {/* <SearchIcon/> */}
          {/* <Typography sx={{
            pl: 2
          }}>Search</Typography> */}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#29339B",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Link
            style={{
              padding: 20,
              fontWeight: "bold",
              textAlign: "center",
              color: "white",
              textDecoration: "none",
            }}
            to={"/"}
          >
            <DashboardIcon
              sx={{
                mr: 4,
              }}
            />
            Dashboard
          </Link>
          <Link
            style={{
              padding: 20,
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
              textDecoration: "none",
            }}
            to={"/categories"}
          >
            <CategoryIcon
              sx={{
                mr: 4,
              }}
            />
            Category
          </Link>
          <Link
            style={{
              padding: 20,
              fontWeight: "bold",
              textAlign: "center",
              color: "white",
              textDecoration: "none",
            }}
            to={"/products"}
          >
            <AddShoppingCartIcon
              sx={{
                mr: 4,
              }}
            />
            Products
          </Link>

          <Link
            style={{
              padding: 20,
              fontWeight: "bold",
              textAlign: "center",
              color: "white",
              textDecoration: "none",
            }}
            to={"/vendors"}
          >
            <LocalShippingIcon
              sx={{
                mr: 4,
              }}
            />
            Vendors
          </Link>

          <Link
            style={{
              padding: 20,
              fontWeight: "bold",
              textAlign: "center",
              color: "white",
              textDecoration: "none",
            }}
            to={"/purchaseorders"}
          >
            <FolderCopyIcon
              sx={{
                mr: 4,
              }}
            />
            Orders
          </Link>

          <Link
            style={{
              padding: 20,
              fontWeight: "bold",
              textAlign: "center",
              color: "white",
              textDecoration: "none",
            }}
            to={"/invoices"}
          >
            <RequestPageIcon
              sx={{
                mr: 5,
              }}
            />
            Invoice
          </Link>
          <Link
            style={{
              padding: 20,
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
              textDecoration: "none",
              ml: 6,
            }}
            to={"/purchaseitems"}
          >
            <StorefrontIcon
              sx={{
                mr: 6,
              }}
            />
            Items
          </Link>

          <Link
            style={{
              padding: 20,
              fontWeight: "bold",
              textAlign: "center",
              color: "white",
              textDecoration: "none",
            }}
            to={"/stocks"}
          >
            <InventoryIcon
              sx={{
                mr: 5,
              }}
            />
            Inventory
          </Link>
          <Link
            style={{
              padding: 20,
              fontWeight: "bold",
              textAlign: "center",
              textDecoration: "none",
              color: "white",
            }}
            to={"/users"}
          >
            <GroupIcon
              sx={{
                mr: 6,
              }}
            />
            Users
          </Link>

          <Link
            style={{
              fontWeight: "bold",
              textAlign: "center",
              textDecoration: "none",
              color: "white",
              mt: 100,
            }}
            onClick={handleLogoutClick}
          >
            <LogoutIcon
              sx={{
                mr: 6,
              }}
            />
            Logout
          </Link>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}

export default Navbar;
