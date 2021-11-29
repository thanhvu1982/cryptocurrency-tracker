import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './global/globalSlice';

const store = configureStore({
  reducer: {
    global: globalReducer,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
