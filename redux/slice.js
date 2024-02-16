import { createSlice } from "@reduxjs/toolkit";

//create slice - func, returns object with actions and reducer, automatically generates a reducer function based on the reducers defined in the slice
const todoSlice = createSlice({
  name: "todos", //name of slice
  initialState: {
    tasks: [],
    inputValue: "",
  },
  reducers: { //updates the state in response to actions sent to the store, takes current state and action
    addTask: (state, action) => {
      //payload - additional info describing changes to the state
      state.tasks.push(action.payload), (state.inputValue = "");
    },
    deleteTask: (state, action) => { //remove task with id
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
    },
    toggleComplete: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.isCompleted = !task.isCompleted;
      }
    },
    setInputValue: (state, action) => {
      state.inputValue = action.payload;
    },
  },
});
//export actions and reducer
export const { addTask, deleteTask, toggleComplete, setInputValue } =
  todoSlice.actions;
export default todoSlice.reducer;
