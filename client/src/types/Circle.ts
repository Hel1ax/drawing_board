import Figure from "./Figure";

export default interface Circle extends Figure {
    x: number;
    y: number;
    radius: number;
    fill: string;
  }