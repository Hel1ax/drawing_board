import ShapeHandler from './ShapeHandler';
import { addShape } from '@/store/features/shapesSlice';
import { removeLine, updateLine } from '@/store/features/shapesSlice';

class RectangleHandler extends ShapeHandler {
  handleMouseDown(pos) {
    super.handleMouseDown(pos); 
    this.isDrawing = true;
    this.tempRect = {
      x: this.startPos.x,
      y: this.startPos.y,
      width: 0,
      height: 0,
      fill: 'transparent',
      stroke: this.drawingSettings.color,
      type: 'rectangle',
      strokeWidth: this.drawingSettings.strokeWidth,
      id: `tempRect${Date.now()}`, 
    };

    this.dispatch(addShape(this.tempRect)); 
  }


  handleMouseMove(pos) {
    if (this.isDrawing) {
      
      this.tempRect = {
        ...this.tempRect!,
        width: Math.abs(pos.x - this.startPos.x),
        height: Math.abs(pos.y - this.startPos.y),
      };

      this.dispatch(updateLine(this.tempRect)); 
    }
  }


  handleMouseUp(pos) {
    this.isDrawing = false;
    const newRect = {
      x: Math.min(this.startPos.x, pos.x),
      y: Math.min(this.startPos.y, pos.y),
      width: Math.abs(this.startPos.x - pos.x),
      height: Math.abs(this.startPos.y - pos.y),
      fill: 'transparent',
      stroke: this.drawingSettings.color,
      type: 'rectangle',
      strokeWidth: this.drawingSettings.strokeWidth,
      id: `rect${Date.now()}`,
    };
    this.dispatch(addShape(newRect));

    if (this.tempRect) {
      this.dispatch(removeLine(this.tempRect.id));
      this.tempRect = null;
    }
  }

}

  

export default RectangleHandler;
