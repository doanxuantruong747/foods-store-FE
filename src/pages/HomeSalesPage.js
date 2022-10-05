import React, { useState } from "react";
import useAuth from "../hooks/useAuth";

import { Box, Card, Container, Tab, Tabs } from "@mui/material";
import { styled } from "@mui/material/styles";
import StorefrontIcon from '@mui/icons-material/Storefront';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import AddCardIcon from '@mui/icons-material/AddCard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { capitalCase } from "change-case";

import ProductStore from "../features/product/ProductStore";
import OrderStore from "../features/order/OrderStore";
import SettingStore from "../features/user/SettingStore";
import CreateProduct from "../features/product/CreateProduct";
import ProfileCover from "../features/user/ProfileCover";


const TabsWrapperStyle = styled("div")(({ theme }) => ({
  zIndex: 2,
  bottom: 0,
  width: "100%",
  display: "flex",
  position: "absolute",
  backgroundColor: "#fff",
  [theme.breakpoints.up("sm")]: {
    justifyContent: "center",
  },
  [theme.breakpoints.up("md")]: {
    justifyContent: "flex-end",
    paddingRight: theme.spacing(3),
  },
}));

function HomeSalesPage() {
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState("store");

  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };

  const SALES_PROFILE_TABS = [
    {
      value: "store",
      icon: <StorefrontIcon sx={{ fontSize: { xs: 18, md: 24 } }} />,
      component: <ProductStore />,
    },
    {
      value: "add_product",
      icon: <AddCardIcon sx={{ fontSize: { xs: 18, md: 24 } }} />,
      component: <CreateProduct />,
    },
    {
      value: "order",
      icon: <ListAltIcon sx={{ fontSize: { xs: 18, md: 24 } }} />,
      component: <OrderStore />,
    },
    {
      value: "setting_store",
      icon: <SettingsSuggestIcon sx={{ fontSize: { xs: 18, md: 24 } }} />,
      component: <SettingStore user={user} />
    },
  ];

  return (
    <Container >
      <Card
        sx={{
          mb: 3,
          height: { xs: 150, md: 280 },
          position: "relative",
        }}
      >
        <ProfileCover />

        <TabsWrapperStyle>
          <Tabs sx={{ fontSize: { xs: 5 } }}
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={(e, value) => handleChangeTab(value)}
          >
            {SALES_PROFILE_TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                value={tab.value}
                icon={tab.icon}
                label={capitalCase(tab.value)}
              />
            ))}
          </Tabs>
        </TabsWrapperStyle>
      </Card>

      {SALES_PROFILE_TABS.map((tab) => {
        const isMatched = tab.value === currentTab;
        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
      })}
    </Container>
  );
}

export default HomeSalesPage;
