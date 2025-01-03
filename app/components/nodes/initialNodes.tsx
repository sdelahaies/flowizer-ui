import inputNode from './inputNode';
import outputNode from './outputNode';
import standardNode from './standardNode';
import CustomEdge from './CustomEdge';

const edgeTypes = { 'custom-edge': CustomEdge };
const initialNodes = [
    { id: 'input', type: 'Input', position: { x: 0, y: -150}, data: { InputVal: 'Input', value: 'Input'}},
    { id: 'standard', type: 'Standard', position: { x: 1, y: 0}, data: { OutputVal: 'Output', value: 'Output'}},
    { id: 'output', type: 'Output', position: { x: 0, y: 150}, data: { OutputVal: 'Output', value: 'Output'}},
];

const initialEdges = [
    { id: 'e1-2', source: 'input', target: 'standard', 'type':'custom-edge'},
    { id: 'e2-3', source: 'standard', target: 'output', 'type':'custom-edge'},
];

const nodeTypes = {
    Input:inputNode,
    Output:outputNode,
    Standard:standardNode,
}


export {initialNodes, nodeTypes, initialEdges};