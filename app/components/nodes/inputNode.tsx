import { useCallback } from 'react';
import { Handle, Position, useReactFlow } from  '@xyflow/react';
import './node.css';

interface inputNodeProps {
  data: {
    InputVal: string;
    value: string;
  };
  isConnectable: boolean;
}

function inputNode({ data, isConnectable }: inputNodeProps) {
  

  return (
    <div className="node" style={{ background: '#201f21', color: '#ea580c' ,height: '20px', width: '100px', borderRadius: '10px', textAlign: 'center', padding: '10px' }}> 
      <div style={{ background: '#201f21', color: '#ea580c' }}><strong>Input</strong></div>
      <Handle className='source-handle'
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default inputNode;

