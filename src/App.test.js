import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";

test("Create a task", async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  const createTaskButton = await screen.findByText(
    /create task/i,
    {},
    { timeout: 5000 }
  );
  expect(createTaskButton).toBeInTheDocument();

  fireEvent.click(createTaskButton);

  const popUpTitle = screen.getByText(/Add task/i, { selector: "span" });
  expect(popUpTitle).toBeInTheDocument();

  const titleInput = screen.getByLabelText(/Task Title/i);
  const descriptionInput = document.querySelector(
    'textarea[name="description"]'
  );
  expect(descriptionInput).toBeInTheDocument();

  fireEvent.change(titleInput, { target: { value: "New Task" } });
  fireEvent.change(descriptionInput, {
    target: { value: "This is a new task description" },
  });

  const statusDropdown = document.querySelector('input[name="status"]');
  fireEvent.change(statusDropdown, { target: { value: "to_do" } });

  expect(titleInput.value).toBe("New Task");
  expect(descriptionInput.value).toBe("This is a new task description");
  expect(statusDropdown.value).toBe("to_do");

  const submitButton = screen.getByText(/Add task/i, { selector: "button" });
  fireEvent.click(submitButton);

  const newTaskTitle = await screen.findByText(/Task added successfully/i);
  expect(newTaskTitle).toBeInTheDocument();
});
