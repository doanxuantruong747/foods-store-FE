import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
import useAuth from "../hooks/useAuth";
import Header from "./Header";
import AlertMsg from "../components/alertMsg/AlertMsg";


function MainLayout() {
    const { user } = useAuth();
    return (
        <Stack sx={{ minHeight: "100vh" }}>
            {user
                ? (<MainHeader />)
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