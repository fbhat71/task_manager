import { Button, Stack, Typography, Box } from "@mui/material";
import React from "react";
import { useDialog } from "src/Providers/DialogProvider";

function ConfirmDelete({ onConfirm }) {
  const { closeDialog } = useDialog();
  return (
    <Box>
      <Typography>Are you sure you want to delete the task?</Typography>
      <Stack direction="row" spacing={1} justifyContent="flex-end">
        <Button onClick={onConfirm} color="error">
          yes
        </Button>
        <Button onClick={closeDialog}>No</Button>
      </Stack>
    </Box>
  );
}

export default ConfirmDelete;
