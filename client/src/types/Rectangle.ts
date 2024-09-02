import Figure from "./Figure";

export default interface Rectangle extends Figure {
    x: number;
    y: number;
    width: number;
    height: number;
    fill: string;
}