import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export function useTasks() {
  const [searchParams] = useSearchParams(); // Get the search parameters from the URL

  // Function to get tasks from localStorage
  const getTasks = async () =>
    await new Promise((resolve) => {
      setTimeout(() => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        resolve(tasks);
      }, 500);
    });

  const {
    isLoading,
    isError,
    data: tasks,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tasks_list"],
    enabled: true,
    queryFn: getTasks,
  });

  // Filter the tasks based on searchParams
  const filteredTasks = tasks?.filter((task) => {
    const status = searchParams.get("status"); // Get status from URL query
    const search = searchParams.get("search"); // Get search term from URL query

    // Filter by status if status is present in query params
    const matchesStatus = !status || task?.status === status;

    // Filter by search term if search term is present in query params
    const matchesSearch =
      !search ||
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return {
    data: tasks, // All tasks
    tasks: filteredTasks, // Filtered tasks
    isLoading,
    error,
    isError,
    refetch,
  };
}

// };
const addTask = (task) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      let id = Date.now();
      localStorage.setItem(
        "tasks",
        JSON.stringify([...tasks, { ...task, id: id }])
      );
      resolve();
    }, 500);
  });
};

const updateTask = (id, updatedTask) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      );

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      resolve();
    }, 500);
  });
};

const deleteTask = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Get the current list of tasks from localStorage
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

      // Filter out the task with the matching id
      const updatedTasks = tasks.filter((task) => task.id !== id);

      // Save the updated tasks array back to localStorage
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      resolve();
    }, 500);
  });
};
export { addTask, updateTask, deleteTask };
