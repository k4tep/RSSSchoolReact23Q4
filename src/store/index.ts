import { configureStore } from '@reduxjs/toolkit';
import charactersListSlice from './charactersListSlice';
import characterSlice from './characterSlice';

export const store = configureStore({
  reducer: {
    charactersList: charactersListSlice,
    character: characterSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
