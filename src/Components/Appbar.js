import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Stack py={1} direction="row" alignItems="center">
            <img
              width="80px"
              src="/assets/images/logo.png"
              alt="My Task Manager"
            />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My Task Manager
            </Typography>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
