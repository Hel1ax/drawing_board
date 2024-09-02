import Figure from "./Figure";

export default interface Line extends Figure {
    points: number[];
    stroke: string;
    strokeWidth: number;
    tension: number;
    lineCap: string;
    lineJoin: string;
  }