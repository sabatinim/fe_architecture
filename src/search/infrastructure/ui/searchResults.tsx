import { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Products } from "../../domain/productSearchRepository.js";
import { Search } from "../../service/search.js";

interface SearchResultsProps {
  search: Search;
}

export default function SearchResults({ search }: SearchResultsProps) {
  const [results, setResults] = useState<Products>(Products.empty());

  useEffect(() => {
    return search.subscribe("searchExecuted", (event) => {setResults(event.results)});
  }, [search]);


  if (results && results.isEmpty()) {
    return (
      <Typography role="status" color="text.secondary" sx={{ textAlign: "center" }}>
        No products found.
      </Typography>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{ borderRadius: 3, boxShadow: "0 6px 24px rgba(27, 47, 37, 0.06)" }}
    >
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
          {results.items.map((product) => (
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
  );
}
