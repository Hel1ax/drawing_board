import ShapeHandler from './ShapeHandler';
import {eraseLine} from '../store/features/shapesSlice';

class EraserHandler extends ShapeHandler {
  handleMouseDown(pos) {
    this.isActive = true;
    this.dispatch(eraseLine({ x: pos.x, y: pos.y }));
  }

  handleMouseMove(pos) {
    if (!this.isActive) return;
    this.dispatch(eraseLine({ x: pos.x, y: pos.y }));
  }

  handleMouseUp() {
    this.isActive = false;
  }
}

export default EraserHandler;
