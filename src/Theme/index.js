import { createTheme } from "@mui/material/styles";
import { Primary, Secondary } from "./constants";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: Primary,
    },
    secondary: {
      main: Secondary,
    },
  },
  typography: {
    fontFamily: "montserrat, sans-serif",
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
        disableRipple: true,
        disableFocusRipple: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
