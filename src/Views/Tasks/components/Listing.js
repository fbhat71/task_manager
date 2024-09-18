import React, { useCallback } from "react";
import {
  Card,
  Stack,
  Typography,
  Box,
  IconButton,
  Tooltip,
  useTheme,
  Chip,
} from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { status_map, status_color_map } from "../constants";
import { useDialog } from "src/Providers/DialogProvider";
import AddEditTask from "./AddEditTask";
import ConfirmDelete from "./ConfirmDelete";
import { useTasks, deleteTask } from "../actions";
import { useSnackbar } from "notistack";

function Listing({ tasks }) {
  const theme = useTheme();
  const { openDialog } = useDialog();
  const { enqueueSnackbar } = useSnackbar();
  const { closeDialog } = useDialog();
  const { refetch } = useTasks();

  const handleDelete = useCallback(
    (id) => {
      deleteTask(id).then(() => {
        enqueueSnackbar("Task deleted successfully", {
          variant: "success",
        });
        refetch();
        closeDialog();
      });
    },
    [closeDialog, enqueueSnackbar, refetch]
  );
  return (
    <>
      {tasks?.length > 0 ? (
        <>
          {tasks?.map((task) => (
            <Card
              key={task?.id}
              elevation={0}
              sx={{ border: "1px solid  #E6E6E9", p: 2, mt: 2 }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="h6">{task?.title}</Typography>
                    <Chip
                      sx={{
                        height: "24px",
                      }}
                      label={status_map[task?.status]}
                      color={status_color_map[task?.status] || "primary"}
                    />
                  </Stack>
                  <Typography color={theme.palette.grey[600]} variant="text">
                    {task?.description}
                  </Typography>
                </Box>
                <Stack direction="row" alignItems="center">
                  <Tooltip title={"Edit task"} placement="top" arrow>
                    <span>
                      <IconButton
                        onClick={() => {
                          openDialog({
                            title: (
                              <Typography component="span" variant="h5">
                                Update task
                              </Typography>
                            ),
                            content: <AddEditTask task={task} />,
                            dialogProps: { maxWidth: "sm" },
                          });
                        }}
                      >
                        <CreateOutlinedIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                  <Tooltip title={"Delete task"} placement="top" arrow>
                    <span>
                      <IconButton
                        onClick={() => {
                          openDialog({
                            title: (
                              <Typography component="span" variant="h5">
                                Delete task
                              </Typography>
                            ),
                            content: (
                              <ConfirmDelete
                                onConfirm={() => handleDelete(task.id)}
                              />
                            ),
                            dialogProps: { maxWidth: "sm" },
                          });
                        }}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                </Stack>
              </Stack>
            </Card>
          ))}
        </>
      ) : (
        <Stack my={6} justifyContent="center" alignItems="center">
          <img src="/assets/images/noData.svg" alt="No data found" />
          <Typography textAlign="center">No records found</Typography>
        </Stack>
      )}
    </>
  );
}

export default Listing;
