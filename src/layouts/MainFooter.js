import React from "react";
import { Link, Typography } from "@mui/material";
import { Box } from "@mui/system";


function MainFooter() {
    return (
        <Box sx={{ height: 150, background: "white" }}>

            <Box sx={{
                mt: 2,
                display: 'flex',
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-around"
            }}>
                <Box p={1}>
                    <Typography>Payment Methods</Typography>
                    <Box >
                        <img style={{ width: 40, height: 40 }}
                            alt="" src="https://lzd-img-global.slatic.net/g/tps/tfs/O1CN0174CwSq2NjastWFX1u_!!19999999999999-2-tps.png" />
                        <img style={{ width: 40, height: 40 }}
                            alt="" src="https://lzd-img-global.slatic.net/g/tps/tfs/TB10rN4lnM11u4jSZPxXXahcXXa-1024-1024.png" />

                    </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" p={1} >
                    {"Copyright © "}
                    <Link color="inherit" href="https://cv-doanxuantruong.netlify.app/">
                        Doan Xuan truong
                    </Link>{" "}
                    {new Date().getFullYear()}
                    {"."}
                </Typography>
                <Box p={1}>
                    <Typography>Delivery Services</Typography>
                    <Box>
                        <img style={{ width: 96, height: 70 }}
                            alt="" src="https://lzd-img-global.slatic.net/g/tps/imgextra/i3/O1CN01RNizk522j2cPtaRjc_!!6000000007155-2-tps-96-70.png" />
                        <img style={{ width: 96, height: 70 }}
                            alt="" src="https://lzd-img-global.slatic.net/g/tps/imgextra/i3/O1CN01ahATKv21NE8iPiA0Q_!!6000000006972-2-tps-96-70.png" />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default MainFooter;