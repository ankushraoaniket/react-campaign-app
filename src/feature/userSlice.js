import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  users: [],
  error: "",
};

export const fetchUsers = createAsyncThunk("user/fetchUsers", () => {
  return axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
    return res.data.map((item, index) => {
      let budget = Math.round(Math.random() * 10000);
      let randomStart = Math.random() * 10;
      let randomEnd = Math.random() * 10;
      let startDate = new Date(
        new Date().getTime() - Math.round(randomStart * 100000000)
      );
      let endDate = new Date(
        new Date().getTime() +
          (randomEnd < 3
            ? -Math.round(randomEnd * 100000000)
            : Math.round(randomEnd * 100000000))
      );
      let active = new Date(endDate) - new Date() > 0;
      return {
        ...item,
        campaignName: "Campaign " + (index + 1),
        budget:
          (budget < 1000 ? budget : `${Math.round(budget / 1000)}K`) + " USD",
        startDate: startDate,
        endDate: endDate,
        active: active,
      };
    });
  });
});

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
// module.exports.fetchUsers = fetchUsers
