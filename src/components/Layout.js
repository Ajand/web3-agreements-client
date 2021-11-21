/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as React from "react";
import { Button } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
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
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import FileIcon from "@mui/icons-material/FileCopy";
import { useWeb3React } from "@web3-react/core";
import { injected } from "./Connectors";
import { ethers } from 'ethers'

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
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
  })
);

const Header = styled(MuiAppBar, {
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

const Layout = ({ children, provider, setProvider }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(false);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  async function connect() {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    setProvider(provider)
  }

  const disconnect = async () => {

  }


  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header color="secondary" position="fixed" open={open}>
        <Toolbar>
          <Typography
            css={css`
              color: ${theme.palette.primary.main};
            `}
            variant="h6"
            noWrap
            component="div"
          >
            Web3 Works
          </Typography>
          {!provider ? (
            <Button onClick={() => connect()}>Activate</Button>
          ) : (
            <Button onClick={() => disconnect()}>Deactivate</Button>
          )}
        </Toolbar>
      </Header>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <div
          css={css`
            background: ${theme.palette.primary.main};
            color: ${theme.palette.secondary.main};
            height: 100vh;
          `}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon
                  css={css`
                    color: ${theme.palette.secondary.main};
                  `}
                />
              ) : (
                <ChevronRightIcon
                  css={css`
                    color: ${theme.palette.secondary.main};
                  `}
                />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon color="secondary">
                <InboxIcon
                  css={css`
                    color: ${theme.palette.secondary.main};
                  `}
                />
              </ListItemIcon>
              <ListItemText primary="inbox" />
            </ListItem>
            <ListItem button>
              <ListItemIcon color="secondary">
                <FileIcon
                  css={css`
                    color: ${theme.palette.secondary.main};
                  `}
                />
              </ListItemIcon>
              <ListItemText primary="Files" />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <div
          css={css`
            color: ${theme.palette.secondary.main};
          `}
        >
          {children}
        </div>
      </Main>
    </Box>
  );
};

export default Layout;
