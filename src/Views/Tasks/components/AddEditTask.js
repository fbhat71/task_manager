import React, { useCallback } from "react";
import { Form, Field } from "react-final-form";
import {
  Box,
  Stack,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { validateRequired } from "src/utils";
import { addTask, useTasks, updateTask } from "../actions";
import { useSnackbar } from "notistack";
import { useDialog } from "src/Providers/DialogProvider";

function CreateEditTask({ task }) {
  const { enqueueSnackbar } = useSnackbar();
  const { closeDialog } = useDialog();
  const { refetch } = useTasks();
  const handleSubmit = useCallback(
    (values) => {
      task
        ? updateTask(task.id, values).then(() => {
            enqueueSnackbar("Task updated successfully", {
              variant: "success",
            });
            refetch();
            closeDialog();
          })
        : addTask(values).then(() => {
            enqueueSnackbar("Task added successfully", {
              variant: "success",
            });
            refetch();
            closeDialog();
          });
    },
    [enqueueSnackbar, refetch, closeDialog, task]
  );
  return (
    <Box pt={1}>
      <Form
        initialValues={task}
        onSubmit={handleSubmit}
        render={(formProps) => {
          return (
            <form onSubmit={formProps.handleSubmit}>
              <Stack spacing={2}>
                <Field
                  name="title"
                  validate={validateRequired}
                  render={({ input, meta }) => (
                    <TextField
                      name={input.name}
                      label="Task Title"
                      value={input.value}
                      onChange={input.onChange}
                      fullWidth
                      error={meta?.touched && !!meta?.error}
                      helperText={meta?.touched && meta?.error}
                    />
                  )}
                />
                <Field
                  name="description"
                  render={({ input, meta }) => (
                    <TextField
                      name={input.name}
                      value={input.value}
                      onChange={input.onChange}
                      fullWidth
                      error={meta?.touched && !!meta?.error}
                      helperText={meta?.touched && meta?.error}
                      label="Description(optional)"
                      multiline
                      rows={2}
                    />
                  )}
                />

                <Field
                  name="status"
                  validate={validateRequired}
                  render={({ input, meta }) => (
                    <FormControl
                      fullWidth
                      error={meta?.touched && !!meta?.error}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Status
                      </InputLabel>
                      <Select
                        name={input.name}
                        value={input.value}
                        label="Status"
                        defaultValue="to_do"
                        onChange={input.onChange}
                      >
                        <MenuItem value="to_do">To Do</MenuItem>
                        <MenuItem value="in_progress">In Progress</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                      </Select>
                      <FormHelperText>
                        {meta?.touched && meta?.error}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
              </Stack>
              <Button
                sx={{ my: { md: 2 } }}
                type="submit"
                fullWidth
                size="large"
                disabled={!formProps.valid}
              >
                {!!task ? "Update task" : "Add task"}
              </Button>
            </form>
          );
        }}
      />
    </Box>
  );
}

export default CreateEditTask;
