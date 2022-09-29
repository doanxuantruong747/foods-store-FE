import React from "react";
import { Container, Box, Typography } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AccountGeneral from "../features/user/AccountGeneral";


function AccountPage() {


    return (
        <Container sx={{ mt: 15, }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 5 }}>
                <AccountBoxIcon sx={{ size: 'lg', mr: 1 }} />
                <Typography variant="h6" >
                    Account Settings
                </Typography>


            </Box>

            <AccountGeneral />
            <Box sx={{ mb: 5 }} />

        </Container>
    );
}

export default AccountPage;
