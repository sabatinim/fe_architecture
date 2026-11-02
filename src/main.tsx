import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SearchInput from "./search/infrastructure/ui/searchInput.js";
import { createSearch } from "./search/factory.js";

const rootElement = document.getElementById("root");
const search = createSearch();


const theme = createTheme({
  palette: {
    primary: { main: "#183f31" },
    background: { default: "#f7f8fa", paper: "#ffffff" },
    text: { primary: "#17221d", secondary: "#64746b" },
  },
  typography: {
    fontFamily: 'Inter, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  shape: { borderRadius: 10 },
});

createRoot(rootElement!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SearchInput search={search} />
    </ThemeProvider>
  </StrictMode>,
);
