import { Box } from "@mui/material";
import HeaderSales from "../layouts/HeaderSales"
import HomeSalesPage from "./HomeSalesPage";


function SalesPage() {

    return (
        <>
            <HeaderSales />
            <Box sx={{ mt: { xs: 10, md: 15 } }}>
                <HomeSalesPage />
            </Box>

        </>
    )
}

export default SalesPage;