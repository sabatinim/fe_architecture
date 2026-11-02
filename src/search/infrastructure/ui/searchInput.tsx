import { useEffect, useRef, useState, type ChangeEvent } from "react";
import SearchRounded from "@mui/icons-material/SearchRounded";
import {
  Alert,
  Box,
  CircularProgress,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import type { Product } from "../../domain/productSearchRepository.js";
import type { Search } from "../../service/search.js";

interface SearchInputProps {
  search: Search;
}

export default function SearchInput({ search }: SearchInputProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<readonly Product[] | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const latestRequest = useRef(0);

  useEffect(() => {
    const requestId = ++latestRequest.current;
    if (query.trim().length < 4) {
      setLoading(false);
      setResults(null);
      setSearchError(null);
      return;
    }

    setLoading(true);
    setResults(null);
    setSearchError(null);

    search.execute(query)
      .then((searchResults) => {
        if (requestId === latestRequest.current) {
          setResults(searchResults.items);
        }
      })
      .catch((error: unknown) => {
        if (requestId === latestRequest.current) {
          setSearchError(error instanceof Error ? error.message : "Search failed.");
        }
      })
      .finally(() => {
        if (requestId === latestRequest.current) {
          setLoading(false);
        }
      });

  }, [query, search]);

  useEffect(() => {
    const unsubscribe = search.subscribe((event) => {
      console.log("Search executed:", event.query, event.results);
    });

    return () => {
      unsubscribe();
    };
  }, [search]);

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "#f7f8fa",
        px: 2,
        py: 6,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 900, display: "flex", flexDirection: "column", gap: 3 }}>
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
            alignSelf: "center",
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
        {searchError !== null && (
          <Alert severity="error" role="alert">
            {searchError}
          </Alert>
        )}
        {results !== null && (
          results.length > 0 ? (
            <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: "0 6px 24px rgba(27, 47, 37, 0.06)" }}>
              <Table aria-label="Search results">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell align="right">{product.price.toFixed(2)}</TableCell>
                      <TableCell>{product.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography role="status" color="text.secondary" sx={{ textAlign: "center" }}>
              No products found.
            </Typography>
          )
        )}
      </Box>
    </Box>
  );
}
