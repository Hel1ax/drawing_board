import React from 'react';
import { Layer } from 'react-konva';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { updateShape } from '@/store/features/shapesSlice';
import Rectangle from './Rectangle';
import Circle from './Circle';
import Line from './Line';
import Text from './Text';

const DrawingLayer = ({ selectedId, selectShape }) => {
  const dispatch = useDispatch(); 
  const shapes = useSelector((state: RootState) => state.shapes.shapes);

  const fig = {
    "rectangle": Rectangle,
    "circle": Circle,
    "line": Line,
    "text": Text
  }

  const handleChange = (newAttrs) => {
    dispatch(updateShape(newAttrs)); 
  };

  return (
    <Layer>
      {shapes.map((shape) => {
        const ShapeComponent = fig[shape.type];
        return (
          <ShapeComponent
            key={shape.id}
            shapeProps={shape}
            isSelected={shape.id === selectedId}
            onSelect={() => selectShape(shape.id)}
            onChange={handleChange} 
          />
        );
      })}
    </Layer>
  );
};

export default DrawingLayer;
