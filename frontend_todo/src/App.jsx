// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import TaskForm from "./components/TaskForm";
// import TaskList from "./components/TaskList";
// function App() {
//   return (
//     <>
//       <h1>To do list</h1>
//       <TaskForm />
//       <TaskList />
//     </>
//   );
// }

// export default App;
import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./services/taskService";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddOrUpdate = async (task) => {
    if (task._id) {
      await updateTask(task._id, task);
    } else {
      await createTask(task);
    }
    setSelectedTask(null);
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
  };

  return (
    <div className="App">
      <h2>To-Do List</h2>
      <TaskForm onSubmit={handleAddOrUpdate} selectedTask={selectedTask} />
      <TaskList tasks={tasks} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
};

export default App;
