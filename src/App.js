import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";

import Layout from "./components/Layout";
import Router from "./components/Router";

function getLibrary() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Web3ReactProvider getLibrary={getLibrary}>
        <Layout>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </Layout>
      </Web3ReactProvider>
    </ThemeProvider>
  );
};

export default App;
