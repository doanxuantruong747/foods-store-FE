import { Button } from "@mui/material";
import React from "react";



function ActionButton({ status }) {

  const btncomplete = (
    <Button
      sx={{ fontSize: "0.6rem", }}
      size="small"
      variant="contained"
    >
      Complete
    </Button>
  );

  const btnShipping = (
    <Button
      sx={{ fontSize: "0.6rem", }}
      size="small"
      variant="contained"
    >
      Shipping to you
    </Button>
  );
  const btnPreparingGoods = (
    <Button
      sx={{ fontSize: "0.6rem", }}
      size="small"
      variant="contained"
      color="error"
    >
      Preparing goods
    </Button>
  );

  if (status === "preparing goods") { return btnPreparingGoods }
  if (status === "shipping to you") { return btnShipping }
  if (status === "complete") { return btncomplete }


}

export default ActionButton;
