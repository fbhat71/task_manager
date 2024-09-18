import React from "react";
import TaskList from "./Views/Tasks";
const routes = [
  {
    path: "/",
    element: <TaskList />,
  },
  { path: "403", element: <div>Permission Denied</div> },
  { path: "*", element: <div>Not Found</div> },
];

export default routes;
