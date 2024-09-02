import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Shape } from '@/types/Shape';
import Line from '@/types/Line';

interface ShapesState {
  undo: Shape[][];
  shapes: Shape[];
  redo: Shape[][];
}

const initialState: ShapesState = {
  undo: [],
  shapes: [],
  redo: [],
};

const shapesSlice = createSlice({
  name: 'shapes',
  initialState,
  reducers: {

    addShape: (state, action: PayloadAction<Shape>) => {
      state.undo.push([...state.shapes]);
      console.log(112);
      state.shapes.push(action.payload);
      state.redo = [];
    },

    addLine: (state, action: PayloadAction<Shape>) => {
      state.shapes.push(action.payload);
      state.redo = [];
    },

    updateLine: (state, action: PayloadAction<Line>) => {
      const index = state.shapes.findIndex(shape => shape.id === action.payload.id);
      if (index !== -1) {
        state.shapes[index] = action.payload;
        state.redo = [];
      }
    },

    updateShape: (state, action: PayloadAction<Shape>) => {
      const index = state.shapes.findIndex(shape => shape.id === action.payload.id);
      console.log(111);
      if (index !== -1) {
        state.undo.push([...state.shapes]);
        state.shapes[index] = action.payload;
        state.redo = [];
      }
    },

    eraseLine: (state, action: PayloadAction<{ x: number; y: number }>) => {
      const { x, y } = action.payload;
      
      state.shapes = state.shapes.filter(shape => {
        if (shape.type !== 'line') {
          return true;
        }
        const line = shape as Line;
        const points = line.points;

        for (let i = 0; i < points.length; i += 2) {
          if (points[i] >= x - 5 && points[i] <= x + 5 && points[i + 1] >= y - 5 && points[i + 1] <= y + 5) {
            state.undo.push([...state.shapes]);
            return false;
          }
        }

        return true;
      });
      state.redo = [];
    },

    undo: (state) => {
      if (state.undo.length > 0) {
        const previousState = state.undo.pop()!;
        state.redo.push([...state.shapes]);
        state.shapes = previousState;
      }
    },

    redo: (state) => {
      if (state.redo.length > 0) {
        const nextState = state.redo.pop()!;
        state.undo.push([...state.shapes]);
        state.shapes = nextState;
      }
    },

    removeShape: (state, action: PayloadAction<string>) => {
      const idToRemove = action.payload;
      state.shapes = state.shapes.filter(shape => shape.id !== idToRemove);
      state.undo.push([...state.shapes]);
      state.redo = [];
    },

    removeLine: (state, action: PayloadAction<string>) => {
      const idToRemove = action.payload;
      state.shapes = state.shapes.filter(shape => shape.id !== idToRemove);
      state.redo = [];
    },
  },
});

export const { addShape, updateShape, eraseLine, undo, redo, updateLine, removeShape, removeLine, addLine } = shapesSlice.actions;

export default shapesSlice.reducer;
