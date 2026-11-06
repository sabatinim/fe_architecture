import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import HomeRounded from "@mui/icons-material/HomeRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";
import { AppBar, Box, Button, Container, Paper, Toolbar, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  BrowserRouter,
  Link,
  Navigate,
  NavLink,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
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

function AppLayout() {
  const { pathname } = useLocation();

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <AppBar position="static" color="primary" component="nav" aria-label="Main navigation">
        <Toolbar sx={{ gap: 1 }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Product Finder
          </Typography>
          <Button
            component={NavLink}
            to="/"
            end
            color="inherit"
            startIcon={<HomeRounded />}
            className={pathname === "/" ? "active" : undefined}
            sx={{ "&.active": { bgcolor: "rgba(255, 255, 255, 0.16)" } }}
          >
            Home
          </Button>
          <Button
            component={NavLink}
            to="/search"
            color="inherit"
            startIcon={<SearchRounded />}
            className={pathname === "/search" ? "active" : undefined}
            sx={{ "&.active": { bgcolor: "rgba(255, 255, 255, 0.16)" } }}
          >
            Search
          </Button>
        </Toolbar>
      </AppBar>

      <Outlet />
    </Box>
  );
}

function HomePage() {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, sm: 10 } }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, sm: 7 },
          border: "1px solid",
          borderColor: "divider",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Welcome to Product Finder
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Find products in the catalog by name or description.
        </Typography>
        <Button
          component={Link}
          to="/search"
          variant="contained"
          startIcon={<SearchRounded />}
        >
          Search products
        </Button>
      </Paper>
    </Container>
  );
}

createRoot(rootElement!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="search" element={<SearchInput search={search} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
