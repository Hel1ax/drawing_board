import Figure from "./Figure";

export default interface Text extends Figure {
    x: number;
    y: number;
    text: string;
    fontSize?: number;
    fontFamily?: string;
    align?: string;
    fill?: string;
  }