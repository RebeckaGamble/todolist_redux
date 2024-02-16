import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./redux/slice";

export default configureStore({
  reducer: {
    todos: todoReducer,
  },
});
