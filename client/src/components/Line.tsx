// app/components/DraggableLine.tsx
import React, { useRef, useEffect } from 'react';
import { Line as KonvaLine, Transformer } from 'react-konva';

const Line = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef(null);
  const trRef = useRef(null);

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <KonvaLine
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          const node = shapeRef.current;
          const newPos = { x: node.x(), y: node.y() };
          node.position({ x: 0, y: 0 });
          const newPoints = shapeProps.points.map((p, i) =>
            p + (i % 2 === 0 ? newPos.x : newPos.y)
          );
          onChange({
            ...shapeProps,
            points: newPoints,
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);

          const newPoints = shapeProps.points.map((p, i) =>
            i % 2 === 0 ? p * scaleX : p * scaleY
          );

          onChange({
            ...shapeProps,
            points: newPoints,
            strokeWidth: shapeProps.strokeWidth * Math.max(scaleX, scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            const aspectRatio = oldBox.width / oldBox.height;

            if (newBox.width !== oldBox.width) {
              newBox.height = newBox.width / aspectRatio;
            } else if (newBox.height !== oldBox.height) {
              newBox.width = newBox.height * aspectRatio;
            }

            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default Line;
