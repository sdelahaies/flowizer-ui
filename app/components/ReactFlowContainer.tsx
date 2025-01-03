'use client';

import { useCallback, useEffect, useState } from 'react';
import {
    ReactFlow,
    ReactFlowProvider,
    useReactFlow,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    Controls,
    Background,
    type ColorMode,
    type Node,
    type Edge,
    type OnNodesChange,
    type OnEdgesChange,
    type OnConnect
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { nodeTypes } from './nodes/initialNodes';
import CustomEdge from './nodes/CustomEdge';
import GradientEdge1 from './nodes/Gradient1';
import GradientEdge2 from './nodes/Gradient2';

import './index.css';

const edgeTypes = { 'custom-edge': CustomEdge };

interface ReactFlowContainerProps {
    jsonFlow?: any;
    setSelectedNodeCode: (code: string) => void;
}

function Flow({ jsonFlow, setSelectedNodeCode }: ReactFlowContainerProps) {
    const reactFlowInstance = useReactFlow();
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const { setViewport } = useReactFlow();

    const onNodesChange: OnNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes],
    );
    const onEdgesChange: OnEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges],
    );

    const onConnect: OnConnect = useCallback(
        (connection) => {
            const edge = { ...connection, type: 'custom-edge' };
            setEdges((eds) => addEdge(edge, eds));
        }, [setEdges]);

    useEffect(() => {
        console.log('jsonFlow:', jsonFlow);
        if (jsonFlow) {
            setNodes(jsonFlow.input.nodes || []);
            setEdges(jsonFlow.input.edges || []);
            // reactFlowInstance.fitView();
            reactFlowInstance.setViewport({ zoom: 0.8, x: 500, y: 500 } );
        } else {
            const storedJson = sessionStorage.getItem('workflowJson');
            if (storedJson) {
                try {
                    const flow = JSON.parse(storedJson);
                    if (flow) {
                        setNodes(flow.nodes || []);
                        setEdges(flow.edges || []);
                    }
                } catch (error) {
                    console.error('Error parsing JSON from session storage:', error);
                }
            }
        }
    }, [jsonFlow]);

    const addNode = () => {
        const newNode: Node = {
            id: `${nodes.length + 1}`,
            type: 'Standard',
            data: { label: `NewNode ${nodes.length + 1}`,code: `# NewNode ${nodes.length + 1} python script` },
            position: { x: Math.random() * 250, y: Math.random() * 250 },
        };
        setNodes((nds) => [...nds, newNode]);
    };

    const onNodeClick: any = useCallback(
        (_:any, node:any) => {
            const nodeCode = node.data?.code;
            if (nodeCode) {
                sessionStorage.setItem('nodeCode', nodeCode);
                setSelectedNodeCode(nodeCode);
            }
        }, [setSelectedNodeCode]);

    return (
        <div style={{ position: 'relative', height: '100%' }}>
            <ReactFlow
                nodes={nodes}
                nodeTypes={nodeTypes}
                edges={edges}
                edgeTypes={edgeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
            >
                <Background />
                <Controls />
                <GradientEdge1 />
                <GradientEdge2 />
            </ReactFlow>
            <button
                onClick={addNode}
                style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    zIndex: 10,
                    color: 'black',
                    backgroundColor: 'rgb(220, 72, 4)',
                    border: '1px solid #ddd',
                    borderColor: 'rgb(0, 0, 0)',     
                    borderRadius: '50%',
                    width: 30,
                    height: 30,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                    cursor: 'pointer',
                }}
            >
                <p style={{color: "black"}}><b>+</b></p>
            </button>
        </div>
    );
}

const ReactFlowContainer: React.FC<ReactFlowContainerProps> = ({ jsonFlow, setSelectedNodeCode }) => {
    return (
        <ReactFlowProvider>
            <Flow jsonFlow={jsonFlow} setSelectedNodeCode={setSelectedNodeCode}/>
        </ReactFlowProvider>
    );
}

export default ReactFlowContainer;