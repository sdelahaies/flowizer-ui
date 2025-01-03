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

function outputNode({ data, isConnectable }: inputNodeProps) {
  
//   const { setNodes } = useReactFlow();
// interface OnChangeEvent {
//     target: {
//         value: string;
//     };
// }

// const onChange = useCallback((evt: OnChangeEvent) => {
//     console.log(evt.target.value);

//     const inputVal = evt.target.value;
//     setNodes((nodes) =>
//         nodes.map((node) => {
//             if (node.type === 'Tesseract') {
//                 return { ...node, data: { ...node.data, inputVal } };
//             }
//             return node;
//         })
//     );
// }, []);

  return (
    <div className="node" style={{ background: '#201f21', color: '#ea580c' ,height: '20px', width: '100px', borderRadius: '10px', textAlign: 'center', padding: '10px' }}> 
      <Handle className='target-handle'
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div style={{ background: '#201f21', color: '#ea580c' }}><strong>Output</strong></div>
      {/* <Handle className='source-handle'
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      /> */}
    </div>
  );
}

export default outputNode;

