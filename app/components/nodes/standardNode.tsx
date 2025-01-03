import { useCallback } from 'react';
import { Handle, Position, useReactFlow } from  '@xyflow/react';
import './node.css';

interface inputNodeProps {
  data: {
    label: string;
    InputVal: string;
    value: string;
  };
  isConnectable: boolean;
}

function standardNode({ data, isConnectable }: inputNodeProps) {
  

  return (
    <div className="node" style={{ background: '#201f21', color: '#ea580c' ,height: '20px', width: '120px', borderRadius: '10px', textAlign: 'center', padding: '10px', justifyContent:'center' }}> 
      <Handle className='target-handle'
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div style={{ background: '#201f21', color: '#ea580c' }}><strong>{data.label}</strong></div>
      <Handle className='source-handle'
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default standardNode;

