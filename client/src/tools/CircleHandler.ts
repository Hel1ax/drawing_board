import ShapeHandler from './ShapeHandler';
import { addShape } from '@/store/features/shapesSlice';
import { removeLine, updateLine } from '@/store/features/shapesSlice';

class CircleHandler extends ShapeHandler {
  handleMouseDown(pos) {
    super.handleMouseDown(pos); 
    this.isDrawing = true;
    this.tempCircle = {
      x: this.startPos.x,
      y: this.startPos.y,
      radius: 0,
      stroke: this.drawingSettings.color,
      strokeWidth: this.drawingSettings.strokeWidth,
      id: `tempCircle${Date.now()}`,
      type: 'circle',
      fill: 'transparent',
    };

    this.dispatch(addShape(this.tempCircle)); 
  }

  handleMouseMove(pos) {
    if (this.isDrawing) {
      
      this.tempCircle = {
        ...this.tempCircle!,
        x: (pos.x + this.startPos.x) / 2,
        y: (pos.y + this.startPos.y) / 2,
        radius: Math.sqrt(Math.pow(pos.x - this.startPos.x, 2) + Math.pow(pos.y - this.startPos.y, 2)) / 2,
      };

      this.dispatch(updateLine(this.tempCircle)); 
    }
  }

  handleMouseUp(pos) {
    const radius = Math.sqrt(Math.pow(pos.x - this.startPos.x, 2) + Math.pow(pos.y - this.startPos.y, 2)) / 2;
    const newCircle = {
      x: (pos.x + this.startPos.x) / 2,
      y: (pos.y + this.startPos.y) / 2,
      radius,
      stroke: this.drawingSettings.color,
      strokeWidth: this.drawingSettings.strokeWidth,
      id: `circle${Date.now()}`,
      type: 'circle',
      fill: 'transparent',
    };
    this.dispatch(addShape(newCircle));

    if (this.tempCircle) {
      this.dispatch(removeLine(this.tempCircle.id));
      this.tempCircle = null;
    }
  }
}

export default CircleHandler;
