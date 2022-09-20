import React, { useState } from "react";

import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchInput({ handleSubmit }) {
    const [searchQuery, setSearchQuery] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(searchQuery);
        setSearchQuery("");
    };

    return (
        <form onSubmit={onSubmit}>
            <TextField
                value={searchQuery}
                placeholder="Search by name"
                onChange={(event) => setSearchQuery(event.target.value)}
                sx={{ minWidth: { sx: "auto", md: 600 } }}
                size="small"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                type="submit"
                                color="primary"
                                aria-label="search by name"
                            >
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </form>
    );
}

export default SearchInput;
