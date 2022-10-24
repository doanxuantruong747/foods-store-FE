import { Menu, MenuItem } from '@mui/material';
import { useState } from 'react';


const PRIMARY = {
    lighter: "#a5d6a7",
    light: "#43a047",
    main: "#388e3c",
    dark: "#2e7d32",
    darker: "#1b5e20",
    contrastText: "#FFF",
};
const SECONDARY = {
    lighter: "#80deea",
    light: "#00acc1",
    main: "#0097a7",
    dark: "#00838f",
    darker: "#006064",
    contrastText: "#FFF",
};
const SUCCESS = {
    lighter: "#f48fb1",
    light: "#f06292",
    main: "#d81b60",
    dark: "#c2185b",
    darker: "#ad1457",
    contrastText: "#FFF",
};


function ThemeChanging({ anchorThemeChang, setThemes, handleMenuChangThemeClose, isMenuOpenChang }) {
    const [green, setGreen] = useState("")
    const [Blue, setBlue] = useState("#f5f5f5")
    const [Pink, setPink] = useState("")

    return (

        <Menu
            anchorEl={anchorThemeChang}
            open={isMenuOpenChang}
            onClose={handleMenuChangThemeClose}
            sx={{ mt: 5 }}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}

        >
            <MenuItem
                onClick={() => {
                    handleMenuChangThemeClose();
                    setThemes(SECONDARY);
                    setGreen("")
                    setBlue("#f5f5f5")
                    setPink("")
                }}
                sx={{ mx: 1, backgroundColor: Blue }}
            >
                Blue Sea
            </MenuItem>
            <MenuItem
                onClick={() => {
                    handleMenuChangThemeClose();
                    setThemes(PRIMARY)
                    setGreen("#f5f5f5")
                    setBlue("")
                    setPink("")
                }}
                sx={{ mx: 1, backgroundColor: green }}
            >
                Fresh Green
            </MenuItem>
            <MenuItem
                onClick={() => {
                    handleMenuChangThemeClose();
                    setThemes(SUCCESS);
                    setGreen("")
                    setBlue("")
                    setPink("#f5f5f5")
                }}
                sx={{ mx: 1, backgroundColor: Pink }}
            >
                Pink
            </MenuItem>

        </Menu>


    )
}

export default ThemeChanging