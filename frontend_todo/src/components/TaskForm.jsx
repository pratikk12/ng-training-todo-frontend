import { useState, useEffect } from "react";

const TaskForm = ({ onSubmit, selectedTask }) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (selectedTask) setTitle(selectedTask.title);
  }, [selectedTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      completed: selectedTask?.completed || false,
      _id: selectedTask?._id,
    });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button type="submit">{selectedTask ? "Update" : "Add"}</button>
    </form>
  );
};

export default TaskForm;
