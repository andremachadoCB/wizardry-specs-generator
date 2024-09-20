import React, { useCallback } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap, 
  useNodesState, 
  useEdgesState,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';

const ERDComponent = ({ data }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onInit = useCallback((reactFlowInstance) => {
    reactFlowInstance.fitView();
  }, []);

  React.useEffect(() => {
    if (data && data.entities && data.relationships) {
      const newNodes = data.entities.map((entity, index) => ({
        id: entity.name,
        type: 'default',
        position: { x: index * 250, y: index * 100 },
        data: { label: (
          <div>
            <strong>{entity.name}</strong>
            <ul className="list-none pl-0">
              {entity.attributes.map((attr, i) => (
                <li key={i} className="text-sm">{attr}</li>
              ))}
            </ul>
          </div>
        )},
        style: {
          background: '#f0f0f0',
          border: '1px solid #999',
          borderRadius: '3px',
          padding: '10px',
          width: 180,
        },
      }));

      const newEdges = data.relationships.map((rel, index) => ({
        id: `e${index}`,
        source: rel.from,
        target: rel.to,
        label: `${rel.type} (${rel.cardinality})`,
        type: 'smoothstep',
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
        style: { stroke: '#999' },
      }));

      setNodes(newNodes);
      setEdges(newEdges);
    }
  }, [data, setNodes, setEdges]);

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onInit={onInit}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default ERDComponent;
