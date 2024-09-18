import React from "react";
import {
  DialogContent,
  DialogTitle,
  IconButton,
  Dialog as MUIDialog,
  Box,
  DialogActions,
} from "@mui/material";
import { useDialog } from "src/Providers/DialogProvider";
import CancelIcon from "@mui/icons-material/Cancel";

const Dialog = () => {
  const { dialogState, closeDialog } = useDialog();
  const {
    isOpen,
    title = "",
    content,
    actions = "",
    showCloseIcon = true,
    titleProps = {},
    actionProps = {},
    dialogProps = {},
  } = dialogState;

  return (
    <>
      {isOpen && (
        <MUIDialog
          open={isOpen}
          onClose={closeDialog}
          maxWidth="md"
          fullWidth
          {...dialogProps}
        >
          {showCloseIcon && (
            <Box position="relative" onClick={closeDialog}>
              <IconButton
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  p: "2px",
                }}
              >
                <CancelIcon fontSize="large" color="black" />
              </IconButton>
            </Box>
          )}
          {title && (
            <DialogTitle sx={{ pr: "8px" }} {...titleProps}>
              {title}
            </DialogTitle>
          )}
          <DialogContent>{content}</DialogContent>
          {actions && <DialogActions {...actionProps}>{actions}</DialogActions>}
        </MUIDialog>
      )}
    </>
  );
};

export default Dialog;
