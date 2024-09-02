import React, { useState, useRef } from 'react';
import { Stage } from 'react-konva';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import ShapeHandler from '../tools/ShapeHandler';
import RectangleHandler from '../tools/RectangleHandler';
import CircleHandler from '../tools/CircleHandler';
import LineHandler from '../tools/LineHandler';
import TextHandler from '../tools/TextHandler';
import EraserHandler from '../tools/EraserHandler';
import ToolSelector from './ToolSelector';
import DrawingLayer from './DrawingLayer';
import TimeButtons from './TimeButtons';

const Canvas = () => {
  const dispatch = useDispatch();
  const drawingSettings = useSelector((state: RootState) => state.drawingSettings);

  const tools = {
    rectangle: new RectangleHandler(dispatch, drawingSettings),
    circle: new CircleHandler(dispatch, drawingSettings),
    line: new LineHandler(dispatch, drawingSettings),
    text: new TextHandler(dispatch, drawingSettings),
    eraser: new EraserHandler(dispatch, drawingSettings),
  };

  const [selectedId, selectShape] = useState<string | null>(null);
  const stageRef = useRef(null);

  const [shapeHandler, setShapeHandler] = useState(new ShapeHandler(dispatch, drawingSettings));

  const handleStageMouseDown = (e) => {
    const pos = e.target.getStage().getPointerPosition();
    shapeHandler.handleMouseDown(pos);
    if (e.target === e.target.getStage()) {
      selectShape(null);
    }
  };

  const handleStageMouseMove = (e) => {
    const pos = e.target.getStage().getPointerPosition();
    shapeHandler.handleMouseMove(pos);
  };

  const handleStageMouseUp = (e) => {
    const pos = e.target.getStage().getPointerPosition();
    shapeHandler.handleMouseUp(pos);
    setShapeHandler(new ShapeHandler(dispatch, drawingSettings));
  };

  const selectHandler = (type) => {
    setShapeHandler(tools[type] || new ShapeHandler(dispatch, drawingSettings));
  };


  return (
    <>
      <ToolSelector selectHandler={selectHandler} />
      <TimeButtons/>
      <Stage
        ref={stageRef}
        width={typeof window !== 'undefined' ? window.innerWidth : 800}
        height={typeof window !== 'undefined' ? window.innerHeight : 600}
        onMouseDown={handleStageMouseDown}
        onMouseMove={handleStageMouseMove}
        onMouseUp={handleStageMouseUp}
      >
        <DrawingLayer selectedId={selectedId} selectShape={selectShape} />
      </Stage>
    </>
  );
};

export default Canvas;
