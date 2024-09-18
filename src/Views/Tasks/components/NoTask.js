import React from "react";
import { Stack, Box, Typography, Button } from "@mui/material";
import AddEditTask from "./AddEditTask";
import { useDialog } from "src/Providers/DialogProvider";

function NoTask() {
  const { openDialog } = useDialog();
  return (
    <Stack
      mt={2}
      spacing={3}
      py={4}
      bgcolor={"#F1F5F9"}
      borderRadius="12px"
      alignItems="center"
    >
      <img src="/assets/images/noData.svg" alt="No data found" />
      <Box textAlign="center">
        <Typography variant="h5">Create your first task</Typography>
        <Typography variant="subtitle">
          There are no tasks to show yet. When you create them, they will appear
          here.
        </Typography>
      </Box>
      <Box>
        <Button
          onClick={() => {
            openDialog({
              title: (
                <Typography component="span" variant="h5">
                  Add task
                </Typography>
              ),
              content: <AddEditTask />,
              dialogProps: { maxWidth: "sm" },
            });
          }}
        >
          Create task
        </Button>
      </Box>
    </Stack>
  );
}

export default NoTask;
