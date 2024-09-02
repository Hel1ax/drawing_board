import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setColor, setStrokeWidth } from '../store/features/drawingSettingsSlice';

const ToolSelector = ({ selectHandler }) => {
  const dispatch = useDispatch();
  const drawingSettings = useSelector((state: RootState) => state.drawingSettings);

  return (
    <div style={{ marginBottom: '10px' }}>
      <button onClick={() => selectHandler('rectangle')}>Create Rectangle</button>
      <button onClick={() => selectHandler('circle')}>Create Circle</button>
      <button onClick={() => selectHandler('line')}>Create Line</button>
      <button onClick={() => selectHandler('text')}>Create Text</button>
      <button onClick={() => selectHandler('eraser')}>Eraser</button>
      <label>
        Color:
        <input
          type="color"
          value={drawingSettings.color}
          onChange={(e) => dispatch(setColor(e.target.value))}
        />
      </label>
      <label>
        Stroke Width:
        <input
          type="number"
          value={drawingSettings.strokeWidth}
          onChange={(e) => dispatch(setStrokeWidth(Number(e.target.value)))}
        />
      </label>
    </div>
  );
};

export default ToolSelector;
