import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Typography,
} from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import { useState } from "react";

import Layout from "./components/Layout";
import Router from "./components/Router";

function getLibrary() {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

  return provider;
}

const theme = createTheme({
  typography: {
    fontFamily: "'Space Grotesk', sans-serif",
  },
  palette: {
    primary: {
      main: "#9CF6FB",
    },
    secondary: {
      main: "#4A5FC1",
    },
    background: {
      paper: "white",
      default: "#E5B9A8",
    },
  },
});

const App = () => {
  const [provider, setProvider] = useState(null);

  console.log(provider?.getSigner().provider);

  const renderHelper = () => {
    if (!provider)
      return <Typography variant="h6">Please Connect The Metamask </Typography>;
    return (
      <BrowserRouter>
        <Router provider={provider} />
      </BrowserRouter>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Web3ReactProvider getLibrary={getLibrary}>
        <Layout provider={provider} setProvider={setProvider}>
          {renderHelper()}
        </Layout>
      </Web3ReactProvider>
    </ThemeProvider>
  );
};

export default App;
