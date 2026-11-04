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
    Alert
} from "@mui/material";
import { Products } from "../../domain/productSearchRepository.js";
import { Search } from "../../service/search.js";
import { useSubscription } from "../../../shared/useSubscription.js";

interface SearchResultsProps {
    search: Search;
}

export default function SearchResults({ search }: SearchResultsProps) {
    const [results, setResults] = useState<Products>(Products.empty());
    const [searchError, setSearchError] = useState<string | null>(null);

    useSubscription(() => {
        return search.subscribe("searchExecuted", (event) => {
            setSearchError(null);
            setResults(event.results);
        });
    }, [search]);

    useSubscription(() => {
        return search.subscribe("searchFailed", (event) => {
            setResults(Products.empty());
            setSearchError(event.error.message);
        });
    }, [search]);

    return (
        <>
            {searchError !== null && (
                <Alert severity="error" role="alert">
                    {searchError}
                </Alert>
            )}
            {results.isEmpty() ? (
                searchError === null && (
                    <Typography role="status" color="text.secondary" sx={{ textAlign: "center" }}>
                        No products found.
                    </Typography>
                )
            ) : (
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
            )}
        </>
    );
}
