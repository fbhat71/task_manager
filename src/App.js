import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "src/Theme";
import routes from "./routes";
import { useRoutes } from "react-router-dom";
import { DialogProvider } from "src/Providers/DialogProvider";
import CustomSnackbarProvider from "src/Providers/SnackbarProvider";
import ReactQueryProvider from "src/Providers/QueryClientProvider";

function App() {
  const content = useRoutes(routes);
  return (
    <ReactQueryProvider>
      <ThemeProvider theme={theme}>
        <CustomSnackbarProvider>
          <DialogProvider>
            <CssBaseline />
            {content}
          </DialogProvider>
        </CustomSnackbarProvider>
      </ThemeProvider>
    </ReactQueryProvider>
  );
}

export default App;
