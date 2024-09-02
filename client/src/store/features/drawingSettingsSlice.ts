import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DrawingSettingsState {
  color: string;
  strokeWidth: number;
}

const initialState: DrawingSettingsState = {
  color: '#000000',
  strokeWidth: 2,
};

const drawingSettingsSlice = createSlice({
  name: 'drawingSettings',
  initialState,
  reducers: {
    setColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
    setStrokeWidth: (state, action: PayloadAction<number>) => {
      state.strokeWidth = action.payload;
    },
  },
});

export const { setColor, setStrokeWidth } = drawingSettingsSlice.actions;
export default drawingSettingsSlice.reducer;
