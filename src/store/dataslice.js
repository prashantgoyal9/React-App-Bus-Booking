import { createSlice } from "@reduxjs/toolkit";

function getlogin(){
  return JSON.parse(localStorage.getItem("Login"))
}

const dataslice = createSlice({
  name: "dataslice",
  initialState: {
    loggedin: getlogin(),
    currentuser: {},
    openbookings: false,
  },
  reducers: {
    login(state) {
      localStorage.setItem("Login", JSON.stringify(true))
      state.loggedin = getlogin();
    },
    logout(state) {
      localStorage.setItem("Login", JSON.stringify(false))
      state.loggedin = getlogin();
      window.location.reload(false);
    },
    currentuser(state, actions) {
      state.currentuser = actions.payload;
    },
    openbookings(state) {
      state.openbookings = true;
    },
    closebookings(state) {
      state.openbookings = false;
    },
  },
});

export const datasliceactions = dataslice.actions;

export default dataslice;
