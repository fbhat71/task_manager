import React, { useCallback } from "react";
import AppBar from "src/Components/Appbar";
import Grid from "@mui/material/Grid2";
import StatCard from "./components/StatCard";
import { statsData } from "./constants";
import NoTask from "./components/NoTask";
import { useDialog } from "src/Providers/DialogProvider";
import AddEditTask from "./components/AddEditTask";
import { useTasks } from "./actions";
import Listing from "./components/Listing";
import SkeletonLoader from "src/Components/SkeletonLoader";
import { debounce } from "@mui/material/utils";
import {
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Stack,
  Typography,
  Box,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchParams } from "react-router-dom";

function TaskList() {
  const { data: allTasks, tasks, isLoading } = useTasks();
  const { openDialog } = useDialog();
  const [searchParams, setSearchParams] = useSearchParams();

  const taskCounts = useCallback(
    (status) => {
      if (status === "total") {
        return allTasks?.length || 0;
      }
      return allTasks?.filter((task) => task?.status === status)?.length || 0;
    },
    [allTasks]
  );

  const handleFilter = useCallback(
    (e) => {
      const searchParamsObject = Object.fromEntries(searchParams.entries());
      setSearchParams({
        ...searchParamsObject,
        status: e.target.value,
      });
    },
    [searchParams, setSearchParams]
  );

  const handleSearch = useCallback(
    (e) => {
      const searchParamsObject = Object.fromEntries(searchParams.entries());
      setSearchParams({
        ...searchParamsObject,
        search: e.target.value,
      });
    },
    [searchParams, setSearchParams]
  );

  return (
    <>
      <AppBar />
      <Box py={{ xs: 1, md: 2 }} px={{ xs: 1, md: 6 }}>
        <Typography variant="h5">overview</Typography>
        <Grid mt={2} container spacing={2}>
          {statsData?.map((stat) => (
            <Grid key={stat.value} size={{ xs: 12, md: 2.5 }}>
              <StatCard stat={stat} value={taskCounts(stat.value)} />
            </Grid>
          ))}
        </Grid>
        <Stack
          mt={4}
          direction={{ md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          gap={1}
        >
          <Typography width="100%" variant="h5">
            My Tasks
          </Typography>
          {allTasks?.length > 0 && (
            <Stack
              direction={{ md: "row" }}
              spacing={1}
              gap={1}
              justifyContent="flex-end"
              width="100%"
            >
              <TextField
                sx={{ maxWidth: { md: "300px" } }}
                label="Search by name or description"
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                onChange={debounce(handleSearch, 300)}
              />
              <Stack
                direction="row"
                spacing={1}
                justifyContent="flex-end"
                width="100%"
              >
                <FormControl sx={{ maxWidth: { md: "300px" } }} fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Filter by Status
                  </InputLabel>
                  <Select
                    label="Filter by status"
                    defaultValue=""
                    onChange={handleFilter}
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="to_do">To Do</MenuItem>
                    <MenuItem value="in_progress">In Progress</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  sx={{
                    minWidth: { md: "120px" },
                    textWrap: "nowrap",
                  }}
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
                  Create Task
                </Button>
              </Stack>
            </Stack>
          )}
        </Stack>
        {isLoading ? (
          <SkeletonLoader
            size={6}
            variant="rectangular"
            width="100%"
            height={40}
            sx={{
              my: 2,
            }}
          />
        ) : allTasks?.length > 0 ? (
          <Listing tasks={tasks} />
        ) : (
          <NoTask />
        )}
      </Box>
    </>
  );
}

export default TaskList;
