import React, { useCallback } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap, 
  useNodesState, 
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

const DependencyGraph = ({ data }) => {
  const initialNodes = [
    {
      id: 'main',
      type: 'input',
      data: { label: 'Custom Color Picker Node: #1A192B' },
      position: { x: 250, y: 0 },
      style: {
        background: '#1A192B',
        color: 'white',
        border: '1px solid #777',
        width: 250,
      },
    },
    {
      id: 'outputA',
      type: 'output',
      data: { label: 'Output A' },
      position: { x: 100, y: 100 },
    },
    {
      id: 'outputB',
      type: 'output',
      data: { label: 'Output B' },
      position: { x: 400, y: 100 },
    },
  ];

  const initialEdges = [
    { id: 'main-outputA', source: 'main', target: 'outputA', animated: true },
    { id: 'main-outputB', source: 'main', target: 'outputB', animated: true },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onInit = useCallback((reactFlowInstance) => {
    console.log('flow loaded:', reactFlowInstance);
  }, []);

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onInit={onInit}
        fitView
        attributionPosition="bottom-left"
      >
        <MiniMap />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default DependencyGraph;