import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
      user: {},
      authenticated:false,
    },
    reducers: {
      setUser(state,action){
        state.user=action.payload;
      },
      setLogin(state){
        state.authenticated=true;
      }
    },
  });
  
  export const userActions = userSlice.actions;
  
  export default userSlice;