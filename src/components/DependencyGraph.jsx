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
  const createNodes = (analysisData) => {
    const nodes = [];
    const edges = [];
    let xPosition = 0;
    const ySpacing = 100;

    // Add file path node
    nodes.push({
      id: 'file_path',
      data: { label: analysisData.file_path },
      position: { x: xPosition, y: 0 },
      style: {
        background: '#1A192B',
        color: 'white',
        border: '1px solid #777',
        width: 200,
      },
    });
    xPosition += 300;

    // Add analysis nodes
    Object.entries(analysisData.analysis).forEach(([key, value], index) => {
      const nodeId = `analysis_${key}`;
      nodes.push({
        id: nodeId,
        data: { label: key },
        position: { x: xPosition, y: index * ySpacing },
        style: {
          background: '#f0f0f0',
          border: '1px solid #999',
          width: 200,
        },
      });
      edges.push({
        id: `edge_${nodeId}`,
        source: 'file_path',
        target: nodeId,
        animated: true,
      });

      // Add value nodes
      if (Array.isArray(value)) {
        value.forEach((item, itemIndex) => {
          const valueNodeId = `${nodeId}_value_${itemIndex}`;
          nodes.push({
            id: valueNodeId,
            data: { label: item },
            position: { x: xPosition + 250, y: index * ySpacing + itemIndex * 50 },
            style: {
              background: '#e6f7ff',
              border: '1px solid #91d5ff',
              width: 200,
              fontSize: '10px',
            },
          });
          edges.push({
            id: `edge_${valueNodeId}`,
            source: nodeId,
            target: valueNodeId,
          });
        });
      } else if (typeof value === 'object') {
        Object.entries(value).forEach(([subKey, subValue], subIndex) => {
          const subNodeId = `${nodeId}_${subKey}`;
          nodes.push({
            id: subNodeId,
            data: { label: subKey },
            position: { x: xPosition + 250, y: index * ySpacing + subIndex * 50 },
            style: {
              background: '#fff1f0',
              border: '1px solid #ffa39e',
              width: 200,
              fontSize: '10px',
            },
          });
          edges.push({
            id: `edge_${subNodeId}`,
            source: nodeId,
            target: subNodeId,
          });

          if (Array.isArray(subValue)) {
            subValue.forEach((subItem, subItemIndex) => {
              const subValueNodeId = `${subNodeId}_value_${subItemIndex}`;
              nodes.push({
                id: subValueNodeId,
                data: { label: subItem },
                position: { x: xPosition + 500, y: index * ySpacing + subIndex * 50 + subItemIndex * 25 },
                style: {
                  background: '#f6ffed',
                  border: '1px solid #b7eb8f',
                  width: 200,
                  fontSize: '8px',
                },
              });
              edges.push({
                id: `edge_${subValueNodeId}`,
                source: subNodeId,
                target: subValueNodeId,
              });
            });
          }
        });
      }
    });

    return { nodes, edges };
  };

  const { nodes, edges } = createNodes(data);

  const [flowNodes, setNodes, onNodesChange] = useNodesState(nodes);
  const [flowEdges, setEdges, onEdgesChange] = useEdgesState(edges);

  const onInit = useCallback((reactFlowInstance) => {
    console.log('flow loaded:', reactFlowInstance);
    reactFlowInstance.fitView();
  }, []);

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
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
