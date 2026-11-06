import { useRef, useState, type ReactNode } from "react";
import {
    Box,
    CircularProgress,
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
import type { Products } from "../../domain/productSearchRepository.js";
import { Search } from "../../service/search.js";
import { useSubscription } from "../../../shared/useSubscription.js";

interface SearchResultsProps {
    search: Search;
}

type SearchResultsState =
    | { status: "idle" }
    | { status: "loading" }
    | { status: "empty" }
    | { status: "success"; results: Products }
    | { status: "error"; message: string };

export default function SearchResults({ search }: SearchResultsProps) {
    const [state, setState] = useState<SearchResultsState>({ status: "idle" });
    const activeQuery = useRef<string | undefined>(undefined);

    useSubscription(() => {
        return search.subscribe("searchQueryChanged", (event) => {
            activeQuery.current = event.query;
            setState(event.query.trim().length >= 4 ? { status: "loading" } : { status: "idle" });
        });
    }, [search]);

    useSubscription(() => {
        return search.subscribe("searchExecuted", (event) => {
            if (event.query !== activeQuery.current) {
                return;
            }

            const products: Products = event.results;

            setState(products.isEmpty()
                ? { status: "empty" }
                : { status: "success", results: event.results });
        });
    }, [search]);

    useSubscription(() => {
        return search.subscribe("searchFailed", (event) => {
            if (event.query === activeQuery.current) {
                setState({ status: "error", message: event.error.message });
            }
        });
    }, [search]);

    let content: ReactNode;
    switch (state.status) {
        case "idle":
            content = null;
            break;
        case "loading":
            content = (
                <Box role="status" sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                    <CircularProgress aria-label="Loading search results" />
                </Box>
            );
            break;
        case "empty":
            content = (
                <Typography role="status" color="text.secondary" sx={{ textAlign: "center" }}>
                    No products found.
                </Typography>
            );
            break;
        case "success":
            content = (
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
                            {state.results.items.map((product) => (
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
            break;
        case "error":
            content = (
                <Alert severity="error" role="alert">
                    {state.message}
                </Alert>
            );
            break;
    }

    return (<>{content}</>);
}
