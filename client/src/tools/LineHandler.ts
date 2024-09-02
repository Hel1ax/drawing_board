import ShapeHandler from './ShapeHandler';
import { addShape, updateLine } from '../store/features/shapesSlice';

class LineHandler extends ShapeHandler {
  constructor(dispatch, drawingSettings) {
    super(dispatch, drawingSettings);
    this.isDrawing = false;
    this.currentLine = null; 
  }

  handleMouseDown(pos) {
    super.handleMouseDown(pos);
    this.isDrawing = true;
    const newLine = {
      points: [pos.x, pos.y],
      id: `line${Date.now()}`,
      stroke: this.drawingSettings.color,
      strokeWidth: this.drawingSettings.strokeWidth,
      type: 'line',
      tension: 0.5,
      lineCap: 'round',
      lineJoin: 'round'
    };
    this.dispatch(addShape(newLine));
    this.currentLine = newLine; 
  }

  handleMouseMove(pos) {
    if (!this.isDrawing || !this.currentLine) return;
    const newPoints = this.currentLine.points.concat([pos.x, pos.y]);
    const updatedLine = { ...this.currentLine, points: newPoints };
    this.currentLine = updatedLine; 
    this.dispatch(updateLine(updatedLine));
  }

  handleMouseUp() {
    this.isDrawing = false;
    this.currentLine = null;
  }
}

export default LineHandler;
