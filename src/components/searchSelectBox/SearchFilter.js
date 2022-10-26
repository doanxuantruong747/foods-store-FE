import React, { useState } from "react";

import { IconButton, InputAdornment, MenuItem, Select, TextField } from "@mui/material";

import { Box } from "@mui/system";
import FilterAltIcon from '@mui/icons-material/FilterAlt';


function SearchFilter({ handleSubmit }) {
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
                    variant="standard"
                    sx={{ width: 0 }}
                    value={searchQuery}
                    // placeholder="Search by Status"
                    onChange={(event) => setSearchQuery(event.target.value)}
                    size="small"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="center">
                                <IconButton
                                    type="submit"
                                    color="primary"
                                    aria-label="search by Status"
                                >
                                    <FilterAltIcon />
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

export default SearchFilter;
