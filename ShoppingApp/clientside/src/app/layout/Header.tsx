import { Mail } from "@material-ui/icons";
import { BadgeUnstyled } from "@mui/base";
import { DarkMode, ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  styled,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useStoreContext } from "../context/StoreContext";
import { useAppSelector } from "../store/configureStore";
import LoggedInMenu from "./LoggedInMenu";

// interface Props {
//   darkMode: boolean;
//   themeChangeHandler: () => void;
// }

const midLinks = [
  // {title: 'Home', path: '/'},
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
  // { title: "checkout", path: "/checkout" },
];

const rightLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

const navStyles = {
  color: "inherit",
  textDecoration: "none",
  typography: "h6",
  "&:hover": {
    color: "grey.300"
  },
  "&.active": {
    color: "orange"
  }
};

export default function Header() {


  const {cart} = useStoreContext();
  const {user} = useAppSelector(state=>state.account);
  const itemCount = cart?.items.reduce((sum,item)=> sum+item.quantity,0);
  return (
    <>
    {/* sx={{ mb: 4, color: 'whitesmoke' ,bgcolor:'black' }} */}
      <AppBar position="static" sx={{bgcolor:'black'}} >

        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>

          <Box display='flex' alignItems='center'>
            <Typography
              exact
              variant="h6"
              component={NavLink}
              to="/"
              sx={navStyles}
            >
              Online E-Shopping
            </Typography>

            {/* <MaterialUISwitch checked={darkMode} onClick={themeChangeHandler} /> */}
          </Box>



          <List sx={{ display: "flex" }}>
            {midLinks.map(({ title, path }) => (
              <ListItem component={NavLink}
                to={path}
                key={path} sx={navStyles}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>

          {/* <IconButton >
          <Badge badgeContent={400} color="primary">
            <Mail color="action" />
          </Badge>
          </IconButton> */}
          <Box display='flex' alignItems='center'>
          <IconButton component={Link} to='/cart' aria-label="cart" size="large" sx={{ color: "inherit" }}>
            <Badge
              badgeContent={itemCount}
              color="secondary"
              variant="standard"
              overlap="rectangular"
            >
              <ShoppingCart />
            </Badge>
          </IconButton>
          {user ? (
            <LoggedInMenu />
          ):(
            <List sx={{ display: "flex" }}>
            {rightLinks.map(({ title, path }) => (
              <ListItem
                component={NavLink}
                to={path}
                key={path}
                sx={navStyles}
              >
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
          )}
          
          </Box>

        </Toolbar>
      </AppBar>
    </>
  );
}
