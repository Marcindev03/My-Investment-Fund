import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    setCredentialis: (state, action) => {
      const { user, jwt } = action.payload;
      state.user = user;
      state.token = jwt;
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentialis, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;

export const selectCurrentToken = (state: RootState) => state.auth.token;
