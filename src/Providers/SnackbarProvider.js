import React from "react";
import { SnackbarProvider } from "notistack";

const CustomSnackbarProvider = ({ children }) => {
  return (
    <SnackbarProvider
      autoHideDuration={1200}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      maxSnack={1}
    >
      {children}
    </SnackbarProvider>
  );
};

export default CustomSnackbarProvider;
