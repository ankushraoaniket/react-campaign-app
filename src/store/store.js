import { configureStore } from "@reduxjs/toolkit";
import userRedcure from "../feature/userSlice";

const store = configureStore({
  reducer: {
    user: userRedcure,
  },
});

export default store;
