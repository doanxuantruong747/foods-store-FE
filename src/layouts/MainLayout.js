import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
import useAuth from "../hooks/useAuth";
import Header from "./Header";
import AlertMsg from "../components/alertMsg/AlertMsg";

const bgGreen = {
    bgColorLight: "#f1f8e9",
    bgColorDark: "#0a1929",
}

function MainLayout({ setThemes }) {
    const { user } = useAuth();
    return (
        <Stack sx={{ minHeight: "100vh", backgroundColor: bgGreen.bgColorLight }}>
            {user
                ? (<MainHeader setThemes={setThemes} />)
                : (<Header />)
            }
            <AlertMsg />
            <Outlet />
            <Box sx={{ flexGrow: 1 }} />

            <MainFooter />
        </Stack>
    );
}

export default MainLayout;