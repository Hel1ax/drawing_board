import { configureStore } from '@reduxjs/toolkit';
import drawingSettingsReducer from './features/drawingSettingsSlice';
import shapesReducer from './features/shapesSlice';

export const store = configureStore({
  reducer: {
    drawingSettings: drawingSettingsReducer,
    shapes: shapesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
