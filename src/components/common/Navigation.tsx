import React, { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";

import { MenuData } from "@base/config/menuData";

export function Navigation() {
  const [value, setValue] = useState(0);

  const menuItems = MenuData.filter((item) => item.showInNav);

  return (
    <Box sx={{ pb: 7 }}>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9,
          boxShadow: "0px 0px 10px -5px",
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          {menuItems?.map(function (menuItem: any) {
            return (
              <BottomNavigationAction
                key={menuItem.id}
                label={menuItem.label}
                component={Link}
                value={menuItem.path}
                to={menuItem.path}
                icon={menuItem.icon}
              />
            );
          })}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
