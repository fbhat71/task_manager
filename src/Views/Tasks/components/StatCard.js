import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Stack, Typography, Box, useTheme } from "@mui/material";

export default function StatCard({ stat, value }) {
  const theme = useTheme();
  return (
    <Card
      sx={{
        backgroundColor:
          theme.palette?.[stat?.color || "primary"]?.main || stat?.color,
        color: "#ffffff",
        boxShadow: `0 1.1rem 1.71rem ${
          theme.palette?.[stat?.color || "primary"]?.main || stat?.color
        }4d`,
        minWidth: "15rem",
        width: "100%",
      }}
    >
      <CardContent sx={{ py: 1 }}>
        <Stack direction="row" justifyContent="space-between">
          <Box>
            <Typography color={"#ffffff"} variant="h4">
              {value}
            </Typography>
            <Typography component="div">{stat.title}</Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
