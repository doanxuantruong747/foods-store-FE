
import { Avatar, Box, Typography } from "@mui/material";
import useAuth from "../../hooks/useAuth";

function ProfileCover() {
  const user = useAuth()

  const { shopName, logoUrl } = user.user;

  return (
    <Box sx={{ position: "absolute" }} >

      <Avatar
        src={logoUrl}
        alt={shopName}
        sx={{
          mx: "auto",
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: "common.white",
          width: { xs: 70, md: 115 },
          height: { xs: 70, md: 115 },
          position: "absolute",
          top: { xs: 130, md: 160 },
          left: 25,
          zIndex: 3,
        }}
      />
      <Box
        sx={{
          ml: { md: 3 },
          mt: { xs: 1, md: 0 },
          position: "absolute",
          zIndex: 4,
          top: { xs: 150, md: 230 },
          left: { xs: 110, md: 130 },
        }}
      >
        <Typography sx={{ fontSize: { xs: 16, md: 22 }, fontWeight: 600 }}
        >{shopName}</Typography>
      </Box>

      <Box sx={{ zIndex: 1 }}>
        <img
          src="https://img.freepik.com/free-vector/banner-online-offline-system_107791-2042.jpg?w=2000"
          alt=""
          width="100%"
          height="100%"
        />
      </Box>
    </Box>
  );
}

export default ProfileCover;
