import React, { useCallback, memo } from 'react';
import ReactFlow, { 
  Background, 
  Controls,
  useNodesState, 
  useEdgesState,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';

const CustomNode = memo(({ data }) => {
  return (
    <div className="px-2 py-1 shadow-md rounded-md bg-white border border-gray-300">
      <Handle type="target" position={Position.Left} />
      <div className="flex items-center">
        <span className="text-xs font-medium">{data.label}</span>
        {data.count && (
          <span className="ml-1 px-1 bg-gray-200 rounded-full text-xs">{data.count}</span>
        )}
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
});

const DependencyGraph = ({ data }) => {
  const createNodes = useCallback((analysisData) => {
    if (!analysisData || typeof analysisData !== 'object' || !analysisData.analysis) {
      console.error('Invalid analysis data:', analysisData);
      return { nodes: [], edges: [] };
    }

    const nodes = [];
    const edges = [];
    let yPosition = 0;
    const xSpacing = 250;
    const ySpacing = 50;

    const addNode = (id, label, x, y, count = null) => {
      nodes.push({
        id,
        type: 'custom',
        position: { x, y },
        data: { label, count },
      });
    };

    const addEdge = (source, target) => {
      edges.push({
        id: `${source}-${target}`,
        source,
        target,
        type: 'smoothstep',
      });
    };

    // Add file path node
    const filePath = analysisData.file_path || 'Unknown File';
    addNode('file_path', filePath, 0, 0);

    // Process main categories
    Object.entries(analysisData.analysis).forEach(([category, items], index) => {
      if (items && typeof items === 'object') {
        const categoryId = `category_${index}`;
        addNode(categoryId, category, xSpacing, yPosition, Object.keys(items).length);
        addEdge('file_path', categoryId);

        // Process items within each category
        Object.entries(items).forEach(([item, subItems], itemIndex) => {
          const itemId = `${categoryId}_item_${itemIndex}`;
          addNode(itemId, item, xSpacing * 2, yPosition);
          addEdge(categoryId, itemId);

          if (Array.isArray(subItems)) {
            subItems.forEach((subItem, subIndex) => {
              const subItemId = `${itemId}_sub_${subIndex}`;
              addNode(subItemId, subItem, xSpacing * 3, yPosition);
              addEdge(itemId, subItemId);
              yPosition += ySpacing;
            });
          } else {
            yPosition += ySpacing;
          }
        });

        yPosition += ySpacing * 2;
      }
    });

    return { nodes, edges };
  }, []);

  const { nodes, edges } = createNodes(data);

  const [flowNodes, setNodes, onNodesChange] = useNodesState(nodes);
  const [flowEdges, setEdges, onEdgesChange] = useEdgesState(edges);

  const nodeTypes = {
    custom: CustomNode,
  };

  if (!data || typeof data !== 'object' || !data.analysis) {
    return <div>No valid data available for the dependency graph.</div>;
  }

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
      >
        <Controls />
        <Background color="#f0f0f0" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default DependencyGraph;
