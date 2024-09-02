// TextHandler.ts
import ShapeHandler from './ShapeHandler';
import { addShape } from '../store/features/shapesSlice';

class TextHandler extends ShapeHandler {
  handleMouseDown(pos) {
    this.dispatch(addShape({
      x: pos.x,
      y: pos.y,
      text: 'New Text',
      fontSize: 20,
      fill: this.drawingSettings.color,
      type: 'text',
      id: `text${Date.now()}`
    }));
  }
}

export default TextHandler;
