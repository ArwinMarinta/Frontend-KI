import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import rootReducer from "./reducers"; // Ini adalah kombinasi semua slice reducer

const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.VITE_MODE !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }),
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export type RootState = ReturnType<typeof store.getState>;
