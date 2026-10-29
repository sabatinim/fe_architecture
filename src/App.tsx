import { useEffect, useState, type ChangeEvent } from "react";
import SearchRounded from "@mui/icons-material/SearchRounded";
import { Box, CircularProgress, InputAdornment, TextField } from "@mui/material";

export default function App() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim().length < 4) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const timeoutId = window.setTimeout(() => setLoading(false), 600);
    return () => window.clearTimeout(timeoutId);
  }, [query]);

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  return (
    <Box
      component="main"
      sx={{
        display: "grid",
        minHeight: "100vh",
        placeItems: "center",
        bgcolor: "#f7f8fa",
        px: 2,
      }}
    >
      <TextField
        fullWidth
        value={query}
        onChange={handleSearch}
        placeholder="Search..."
        error={query.length > 0 && query.trim().length < 4}
        helperText={
          query.length > 0 && query.trim().length < 4
            ? "Enter at least 4 characters to search."
            : ""
        }
        sx={{
          maxWidth: 640,
          "& .MuiOutlinedInput-root": {
            minHeight: 60,
            borderRadius: 3,
            bgcolor: "white",
            boxShadow: "0 6px 24px rgba(27, 47, 37, 0.06)",
            "& fieldset": { borderColor: "#e2e8e4" },
            "&:hover fieldset": { borderColor: "#9cb9a8" },
            "&.Mui-focused fieldset": {
              borderColor: "#397257",
              borderWidth: 1,
            },
          },
        }}
        slotProps={{
          htmlInput: { "aria-label": "Search" },
          input: {
            startAdornment: (
              <InputAdornment position="start">
                {loading ? (
                  <CircularProgress size={20} aria-label="Loading search" />
                ) : (
                  <SearchRounded sx={{ color: "#668072" }} />
                )}
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
}
