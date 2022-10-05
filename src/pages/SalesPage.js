import { Box } from "@mui/material";
import { Stack } from "@mui/system";
import HeaderSales from "../layouts/HeaderSales"
import HomeSalesPage from "./HomeSalesPage";


function SalesPage() {

    return (

        <Stack sx={{ backgroundColor: "#f9fbe7" }}>
            <HeaderSales />
            <Box sx={{ mt: { xs: 10, md: 15 } }}>
                <HomeSalesPage />
            </Box>
        </Stack>

    )
}

export default SalesPage;