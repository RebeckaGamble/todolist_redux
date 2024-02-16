import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  deleteTask,
  setInputValue,
  toggleComplete as toggleTaskComplete,
} from "../redux/slice";
import TodoItem from "./TodoItem";

function Todo() {
  const dispatch = useDispatch(); //get access to dispatch func
  const tasks = useSelector((state) => state.todos.tasks); //extract data from store
  const inputValue = useSelector((state) => state.todos.inputValue);

  //add new task
  const handleAddTask = () => {
    if (!inputValue.trim()) {
      return;
    }
    const id = Date.now().toString();
    dispatch(addTask({ id, inputValue, isCompleted: false })); //updating the state
  };

  //add task pressing enter
  function handleEnterKey(e) {
    if (e.key === "Enter") {
      handleAddTask();
    }
  }

  const handleDelete = (taskId) => {
    dispatch(deleteTask({ id: taskId }));
  };

  const toggleComplete = (taskId) => {
    dispatch(toggleTaskComplete({ id: taskId }));
  };

  const handleInputChange = (e) => {
    dispatch(setInputValue(e.target.value));
  };

  const taskCount = tasks.length;
  const compTasks = tasks.filter((task) => task.isCompleted).length;

  return (
    <>
      <h1 className="custom-gradient-text flex justify-center font-bold text-3xl my-6 md:text-5xl md:my-10">
        My Todos
      </h1>
      <div className="flex flex-col justify-center my-6 mx-auto w-[90%] max-w-[540px] sm:text-[20px]">
        <div className="flex">
          <input
            type="text"
            placeholder="Add new task.."
            value={inputValue}
            onKeyDown={handleEnterKey}
            onChange={handleInputChange}
            className="flex-grow border border-white px-3 py-2 rounded-l-md focus:outline-none text-black placeholder:text-slate-400 focus:border-purple-500"
          />
          <button
            onClick={handleAddTask}
            className="border border-white tracking-wider px-6 py-2 rounded-r-md hover:border-purple-500"
          >
            Add
          </button>
        </div>
        <div className="flex justify-between font-semibold mt-6 mb-[-10px]">
          <h3 className="text-purple-500">Tasks: {taskCount} </h3>
          <h3 className="text-blue-300">
            Completed Tasks: {compTasks} of {taskCount}
          </h3>
        </div>
      </div>
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          text={task.inputValue}
          handleComplete={() => toggleComplete(task.id)}
          handleDelete={() => handleDelete(task.id)}
        />
      ))}
    </>
  );
}

export default Todo;
