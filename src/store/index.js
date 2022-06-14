import { configureStore } from "@reduxjs/toolkit";
import dataslice from "./dataslice";

const store = configureStore({
  reducer: { dataslice: dataslice.reducer },
});

export default store;
