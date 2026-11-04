import { useEffect, useState, type ReactNode } from "react";
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
import type { Products } from "../../domain/productSearchRepository.js";
import { Search } from "../../service/search.js";
import { useSubscription } from "../../../shared/useSubscription.js";

interface SearchResultsProps {
    search: Search;
}

type SearchResultsState =
    | { status: "idle" }
    | { status: "empty" }
    | { status: "success"; results: Products }
    | { status: "error"; message: string };

export default function SearchResults({ search }: SearchResultsProps) {
    const [state, setState] = useState<SearchResultsState>({ status: "idle" });

    useSubscription(() => {
        return search.subscribe("searchExecuted", (event) => {
            const products: Products = event.results;

            setState(products.isEmpty()
                ? { status: "empty" }
                : { status: "success", results: event.results });
        });
    }, [search]);

    useSubscription(() => {
        return search.subscribe("searchFailed", (event) => {
            setState({ status: "error", message: event.error.message });
        });
    }, [search]);

    let content: ReactNode;
    switch (state.status) {
        case "idle":
            content = null;
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
