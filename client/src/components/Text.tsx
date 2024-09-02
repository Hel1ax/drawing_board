import React, { useRef, useEffect, useState } from 'react';
import { Text as KonvaText, Transformer } from 'react-konva';
import '../styles/text.css'; // Подключаем стили из отдельного файла

const Text = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef(null);
  const trRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const createTextarea = (textPosition, stage, shapeRef, shapeProps) => {
    const areaPosition = {
      x: stage.container().offsetLeft + textPosition.x,
      y: stage.container().offsetTop + textPosition.y,
    };

    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);

    textarea.value = shapeRef.current.text();
    textarea.className = 'konva-textarea'; 
    textarea.style.top = `${areaPosition.y}px`;
    textarea.style.left = `${areaPosition.x}px`;


    textarea.style.fontSize = `${shapeProps.fontSize}px`;
    textarea.style.lineHeight = shapeProps.lineHeight;
    textarea.style.fontFamily = shapeProps.fontFamily;
    textarea.style.textAlign = shapeProps.align;
    textarea.style.color = shapeProps.fill;

    const rotation = shapeRef.current.rotation();
    if (rotation) {
      textarea.style.transform = `rotateZ(${rotation}deg)`;
    }
    textarea.focus();

    return textarea;
  };

  const handleDblClick = (e) => {
    setIsEditing(true);
    
    const stage = shapeRef.current.getStage();
    const textPosition = shapeRef.current.absolutePosition();
    const textarea = createTextarea(textPosition, stage, shapeRef, shapeProps);

    const removeTextarea = () => {
      if (textarea.parentNode) {
        textarea.parentNode.removeChild(textarea);
        setIsEditing(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        shapeRef.current.text(textarea.value);
        onChange({
          ...shapeProps,
          text: textarea.value,
        });
        removeTextarea();
      }
      if (e.key === 'Escape') {
        removeTextarea();
      }
    };

    textarea.addEventListener('keydown', handleKeyDown);

    textarea.addEventListener('blur', () => {
      requestAnimationFrame(() => {
        shapeRef.current.text(textarea.value);
        onChange({
          ...shapeProps,
          text: textarea.value,
        });
        removeTextarea();
      });
    });
  };

  return (
    <>
      <KonvaText
        onClick={onSelect}
        onTap={onSelect}
        onDblClick={handleDblClick}
        ref={shapeRef}
        {...shapeProps}
        visible={!isEditing}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);

          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            fontSize: shapeProps.fontSize * scaleX,
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
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

export default Text;
