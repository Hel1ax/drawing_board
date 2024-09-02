class ShapeHandler {
    constructor(dispatch, drawingSettings) {
      this.dispatch = dispatch;
      this.drawingSettings = drawingSettings;
      this.startPos = { x: 0, y: 0 };
    }
  
    handleMouseDown(pos) {
      this.startPos = { x: pos.x, y: pos.y };
    }
  
    handleMouseMove(pos) {}
  
    handleMouseUp(pos) {}
  
    handleDbClick(pos) {}
  }
  
export default ShapeHandler;
  