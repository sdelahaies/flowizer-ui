import React from 'react';
import { getBezierPath } from '@xyflow/react';

function adjustStyle(sourceY, targetY) {
  let style;
  if (sourceY <= targetY) {
    style = { stroke: 'url(#edgegradient1)' };
  }
  else {
    style = { stroke: 'url(#edgegradient2)' };
  }
  return style;
}

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  //markerEnd,
}) {

  const newstyle = adjustStyle(sourceY, targetY);

  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path
        id={id}
        style={newstyle}
        className="react-flow__edge-path"
        d={edgePath}
      // markerEnd={markerEnd}
      />
      {/* <text>
        <textPath
          href={`#${id}`}
          style={{ fontSize: '12px' }}
          startOffset="50%"
          textAnchor="middle"
        >
          {data.text}
        </textPath>
      </text> */}
    </>
  );
}

