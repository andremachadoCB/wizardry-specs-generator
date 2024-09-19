import React from 'react';
import { ForceGraph2D } from 'react-force-graph';

const ERDComponent = ({ data }) => {
  const graphData = React.useMemo(() => {
    const nodes = [];
    const links = [];

    // Create nodes for entities
    data.entities.forEach(entity => {
      nodes.push({
        id: entity.name,
        name: entity.name,
        attributes: entity.attributes.join('\n'),
      });
    });

    // Create links for relationships
    data.relationships.forEach(rel => {
      links.push({
        source: rel.from,
        target: rel.to,
        label: `${rel.type} (${rel.cardinality})${rel.optional ? ' (optional)' : ''}`,
      });
    });

    return { nodes, links };
  }, [data]);

  const nodeCanvasObject = React.useCallback((node, ctx, globalScale) => {
    const fontSize = 12 / globalScale;
    ctx.font = `${fontSize}px Sans-Serif`;
    
    // Draw entity name
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText(node.name, node.x, node.y);

    // Draw attributes
    const lines = node.attributes.split('\n');
    lines.forEach((line, index) => {
      ctx.fillText(line, node.x, node.y + fontSize * (index + 1.5));
    });

    // Draw node circle
    ctx.beginPath();
    ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#4CAF50';
    ctx.fill();
  }, []);

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <ForceGraph2D
        graphData={graphData}
        nodeCanvasObject={nodeCanvasObject}
        nodeCanvasObjectMode={() => 'replace'}
        linkLabel="label"
        linkColor={() => '#757575'}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        linkCurvature={0.25}
      />
    </div>
  );
};

export default ERDComponent;