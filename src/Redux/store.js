import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "./AuthSlice";
import { CrudSlice } from "./CrudSlice";

export const store = configureStore({
  reducer: {
    Auth: AuthSlice.reducer,
    Crud: CrudSlice.reducer,
  },
});
