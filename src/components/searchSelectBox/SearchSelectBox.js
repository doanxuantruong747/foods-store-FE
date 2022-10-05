import React, { useState } from "react";

import { IconButton, InputAdornment, MenuItem, Select, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/system";


function SearchInput({ handleSubmit }) {
    const [searchQuery, setSearchQuery] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(searchQuery);

    };

    return (
        <Box sx={{ display: 'flex', justifyContent: "space-around", }}>

            <Select
                sx={{ minWidth: { sx: "auto", md: 200 }, height: 40, mr: 1 }}
                value={searchQuery}
                label="Status"
                onChange={(event) => setSearchQuery(event.target.value)}

            >
                <MenuItem value=''>all</MenuItem>
                <MenuItem value='preparing goods'>preparing goods</MenuItem>
                <MenuItem value='shipping to you'>shipping to you</MenuItem>
                <MenuItem value='complete'>complete</MenuItem>
            </Select>

            <form onSubmit={onSubmit}>
                <TextField

                    value={searchQuery}
                    placeholder="Search by Status"
                    onChange={(event) => setSearchQuery(event.target.value)}
                    sx={{ width: 60 }}
                    size="small"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="center">
                                <IconButton
                                    type="submit"
                                    color="primary"
                                    aria-label="search by Status"
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                >
                </TextField>

            </form>
        </Box>
    );
}

export default SearchInput;
